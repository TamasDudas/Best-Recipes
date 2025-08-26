<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Recipe;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Enums\PermissionEnum;
use App\Traits\HandlesImages;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class RecipeController extends Controller
{
    use HandlesImages;

    public function __construct()
    {
        // Csak bejelentkezettek férhetnek hozzá ezekhez a műveletekhez
        $this->middleware('auth')->except(['index', 'show']);

        // Permission ellenőrzések
        $this->middleware('permission:' . PermissionEnum::CREATE_RECIPE->value)->only(['create', 'store']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $getRecipes = Recipe::latest()->paginate(12); // Definiáljuk a $getRecipes változót

        $recipes = $getRecipes->getCollection()->map(function ($recipe) {
            // Ha az image már tartalmazza a directory-t (pl. "recipes/filename.jpg"), akkor nem kell újra hozzáadni
            $imagePath = $recipe->image;
            if ($imagePath && !str_starts_with($imagePath, 'recipes/')) {
                $imagePath = "recipes/{$imagePath}";
            }
            $imageUrl = $this->getImageUrl($imagePath);

            return [
                'id' => $recipe->id,
                'name' => $recipe->name,
                'description' => strtok($recipe->description, '.'),
                'image_url' => $imageUrl,
                // Add other fields as needed
            ];
        });

        // Visszaállítjuk a lapozási információkat
        $getRecipes->setCollection($recipes);

        return Inertia::render('Recipes/Index', array_merge(compact('getRecipes'), [
            'can_create_recipe' => Gate::allows(PermissionEnum::CREATE_RECIPE->value),
        ]));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return Inertia::render('Recipes/Create', [
            'categories' => Category::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validáció
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'ingredients' => 'required|array',
            'ingredients.*' => 'string',
            'instructions' => 'required|array',
            'instructions.*' => 'string',
            'categories' => 'required|array',
            'categories.*' => 'exists:categories,id',
        ]);

        // Kép feltöltés (ha van)
        $imagePath = null;
        if ($request->hasFile('image')) {
            $fullImagePath = $this->uploadImage(
                $request->file('image'),
                'recipes',
                null,
                $validated['name']
            );
            $imagePath = basename($fullImagePath);
        }

        // Recept létrehozása
        $recipe = Recipe::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'ingredients' => json_encode($validated['ingredients']),
            'instructions' => json_encode($validated['instructions']),
            'image' => $imagePath,
            'user_id' => Auth::id() // A bejelentkezett felhasználó ID-ja
        ]);

        // Kategóriák hozzácsatolása
        $recipe->categories()->attach($validated['categories']);

        return redirect()->route('recipes.show', $recipe)
            ->with('success', 'Recept sikeresen létrehozva!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Recipe $recipe)
    {
        //betöltjük a hozzá kapcsolódó categories és user adatokat
        $recipe->load(['categories', 'user']);


        //átalakítjuk az Eloquent objektumot egyszerű tömbbé, mert csak ezek kellenek (attributes + relations)
        $recipeArray = $recipe->toArray();

        // Betöltjük az approved kommenteket (moderálva, approved)
        $approvedComments = $recipe->comments()->where('status', 'approved')->with('user')->orderBy('approved_at', 'desc')->get()->map(function ($c) {
            return [
                'id' => $c->id,
                'content' => $c->content,
                'user' => [
                    'id' => $c->user->id,
                    'name' => $c->user->name,
                ],
                'approved_at' => $c->approved_at,
            ];
        });

        $recipeArray['approved_comments'] = $approvedComments;

        //megvizsgáljuk, hogy van-e kép és elkészítjük a teljes URL-t
        // Ha az image már tartalmazza a directory-t (pl. "recipes/filename.jpg"), akkor nem kell újra hozzáadni
        $imagePath = $recipe->image;
        if ($imagePath && !str_starts_with($imagePath, 'recipes/')) {
            $imagePath = "recipes/{$imagePath}";
        }
        $recipeArray['image_url'] = $this->getImageUrl($imagePath);

        return Inertia::render('Recipes/Show', [
            'recipe' => $recipeArray,
            // per-recipe permissions for the current user
            'can_edit' => Gate::allows(PermissionEnum::MANAGE_ALL_RECIPES->value) || (Gate::allows(PermissionEnum::EDIT_OWN_RECIPE->value) && $recipe->user_id === Auth::id()),
            'can_delete' => Gate::allows(PermissionEnum::MANAGE_ALL_RECIPES->value) || (Gate::allows(PermissionEnum::DELETE_OWN_RECIPE->value) && $recipe->user_id === Auth::id()),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Recipe $recipe)
    {
        $user = Auth::user();
        // Jogosultság ellenőrzés
        if (Gate::allows(PermissionEnum::MANAGE_ALL_RECIPES->value)) {
            // Admin mindent szerkeszthet
        } elseif (Gate::allows(PermissionEnum::EDIT_OWN_RECIPE->value) && $recipe->user_id === Auth::id()) {
            // Author csak a saját receptjeit szerkesztheti
        } else {
            abort(403, 'Nincs jogosultságod a recept szerkesztéséhez.');
        }

        // Betöltjük a recept kategóriáit (eager loading) - szükséges a selectedCategories-hez
        $recipe->load('categories');

        // Visszaadjuk a szerkesztő oldalt a szükséges adatokkal
        return Inertia::render('Recipes/Edit', [
            // A szerkesztendő recept adatai
            'recipe' => $recipe,

            // Összes elérhető kategória (checkbox-okhoz)
            'categories' => Category::all(),

            // A recept aktuális kategória ID-jai (előre kiválasztva),Tehát: A pluck() "kiszedi" a kategória objektumokból csak az ID-kat, és egy egyszerű tömböt csinál belőlük!

            'selectedCategories' => $recipe->categories->pluck('id'),

             // A recept jelenlegi képének URL-je (ha van)
            'imageUrl' => $this->getImageUrl($recipe->image)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Recipe $recipe)
    {
        // Jogosultság ellenőrzés
        if (Gate::allows(PermissionEnum::MANAGE_ALL_RECIPES->value)) {
            // Admin mindent frissíthet
        } elseif (Gate::allows(PermissionEnum::EDIT_OWN_RECIPE->value) && $recipe->user_id === Auth::id()) {
            // Author csak a saját receptjeit frissítheti
        } else {
            abort(403, 'Nincs jogosultságod a recept frissítéséhez.');
        }

        // Validációs szabályok
        $validationRules = [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'ingredients' => 'required|array',
            'ingredients.*' => 'string',
            'instructions' => 'required|array',
            'instructions.*' => 'string',
            'categories' => 'nullable|array',
            'categories.*' => 'exists:categories,id',
        ];

        // Csak akkor validáljuk a képet, ha új kép van feltöltve
        if ($request->hasFile('image')) {
            $validationRules = array_merge($validationRules, $this->getImageValidationRules());
        }

        $validated = $request->validate($validationRules);

        // Kép kezelés
        $imagePath = $recipe->image; // Megtartjuk a régit
        if ($request->hasFile('image')) {
            $imagePath = $this->uploadImage(
                $request->file('image'),
                'recipes',
                $recipe->image, // Régi kép törlése
                $validated['name']
            );
        }

        // Recept frissítése
        $recipe->update([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'ingredients' => json_encode($validated['ingredients']),
            'instructions' => json_encode($validated['instructions']),
            'image' => $imagePath,
        ]);

        // Kategóriák szinkronizálása
        $recipe->categories()->sync($validated['categories']);

        return redirect()->route('recipes.show', $recipe)
            ->with('success', 'Recept sikeresen frissítve!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Recipe $recipe)
    {
        // Jogosultság ellenőrzés
        if (Gate::allows(PermissionEnum::MANAGE_ALL_RECIPES->value)) {
            // Admin mindent törölhet
        } elseif (Gate::allows(PermissionEnum::DELETE_OWN_RECIPE->value) && $recipe->user_id === Auth::id()) {
            // Author csak a saját receptjeit törölheti
        } else {
            abort(403, 'Nincs jogosultságod a recept törléséhez.');
        }

        // Kép törlése (ha van)
        $this->deleteImage($recipe->image);

        // Recept törlése (kategória kapcsolatok automatikusan törlődnek)
        $recipe->delete();

        return redirect()->route('recipes.index')
            ->with('success', 'Recept sikeresen törölve!');
    }
}
