<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Enums\PermissionEnum;
use App\Traits\HandlesImages;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    use HandlesImages;

    // Middleware eltávolítva - manuális jogosultság ellenőrzést használunk

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();

        // Minden kategóriához hozzáadjuk a teljes kép URL-t
        $catWithImages = $categories->map(function ($category) {
            // Ha a featured_image már tartalmazza a directory-t (pl. "categories/filename.jpg"), akkor nem kell újra hozzáadni
            $imagePath = $category->featured_image;
            if ($imagePath && !str_starts_with($imagePath, 'categories/')) {
                $imagePath = "categories/{$imagePath}";
            }
            $imageUrl = $this->getImageUrl($imagePath);

            // Return category data with image_url
            return [
                'id' => $category->id,
                'name' => $category->name,
                'featured_image' => $category->featured_image,
                'image_url' => $imageUrl,
                // Add other fields as needed
            ];
        });

        // Ha a főoldalra navigálunk ('/') akkor Home.jsx-et rendereljük
        // Ha a '/categories' útvonalra navigálunk, akkor Categories/Index.jsx-et
        $viewName = request()->is('/') ? 'Home' : 'Categories/Index';

        return Inertia::render($viewName, array_merge(compact('catWithImages'), [
            'can_manage_categories' => Gate::allows(PermissionEnum::MANAGE_CATEGORIES->value),
        ]));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Jogosultság ellenőrzés
        if (!Auth::check() || !Gate::allows(PermissionEnum::MANAGE_CATEGORIES->value)) {
            abort(403, 'Nincs jogosultságod kategóriák létrehozásához.');
        }

        return Inertia::render('Categories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Jogosultság ellenőrzés
        if (!Auth::check() || !Gate::allows(PermissionEnum::MANAGE_CATEGORIES->value)) {
            abort(403, 'Nincs jogosultságod kategóriák létrehozásához.');
        }
        $validated = $request->validate([
            'name' => 'required|min:2|max:30',
            'color' => ['required', 'regex:/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/'],
            'is_featured' => 'boolean',
            'featured_image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
        ]);

        // Kép feltöltése (ha van)
        $imagePath = null;
        if ($request->hasFile('featured_image')) {
            $imagePath = $this->uploadImage($request->file('featured_image'), 'categories');
        }

        // Kategória létrehozása
        Category::create([
            'name' => $validated['name'],
            'color' => $validated['color'],
            'is_featured' => $validated['is_featured'] ?? false,
            'featured_image' => $imagePath ? basename($imagePath) : null,
        ]);

        return redirect()->route('categories.index')->with('success', 'Kategória sikeresen létrehozva!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        $recipes = $category->recipes()
            ->with(['categories', 'user'])
            ->latest()
            ->paginate(12);

        // Minden recepthez hozzáadjuk a teljes kép URL-t
        $recipes->getCollection()->transform(function ($recipe) {
            // Ha az image már tartalmazza a directory-t (pl. "recipes/filename.jpg"), akkor nem kell újra hozzáadni
            $imagePath = $recipe->image;
            if ($imagePath && !str_starts_with($imagePath, 'recipes/')) {
                $imagePath = "recipes/{$imagePath}";
            }
            $recipe->image_url = $this->getImageUrl($imagePath);
            return $recipe;
        });

        return Inertia::render('Categories/Show', [
            'category' => $category,
            'recipes' => $recipes,
            'can_manage_categories' => Gate::allows(PermissionEnum::MANAGE_CATEGORIES->value),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        // Jogosultság ellenőrzés
        if (!Auth::check() || !Gate::allows(PermissionEnum::MANAGE_CATEGORIES->value)) {
            abort(403, 'Nincs jogosultságod kategóriák szerkesztéséhez.');
        }

        return Inertia::render('Categories/Edit', compact('category'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        // Jogosultság ellenőrzés
        if (!Auth::check() || !Gate::allows(PermissionEnum::MANAGE_CATEGORIES->value)) {
            abort(403, 'Nincs jogosultságod kategóriák frissítéséhez.');
        }
        $validationRules = [
            'name' => 'required|min:2|max:30',
            'color' => ['required', 'regex:/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/'],
            'is_featured' => 'boolean',
        ];

        // Csak akkor validáljuk a képet, ha új kép van feltöltve
        if ($request->hasFile('featured_image')) {
            $validationRules['featured_image'] = 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048';
        }

        $validated = $request->validate($validationRules);

        // Kép feltöltése (ha van új kép)
        $imagePath = $category->featured_image; // Alapértelmezett a régi kép
        if ($request->hasFile('featured_image')) {
            $imagePath = $this->uploadImage($request->file('featured_image'), 'categories', $category->featured_image);
        }

        // Kategória frissítése
        $category->update([
            'name' => $validated['name'],
            'color' => $validated['color'],
            'is_featured' => $validated['is_featured'] ?? false,
            'featured_image' => basename($imagePath), // Csak a fájlnév tárolása
        ]);

        return redirect()->route('categories.index')->with('success', 'Kategória sikeresen frissítve!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        // Jogosultság ellenőrzés
        if (!Auth::check() || !Gate::allows(PermissionEnum::MANAGE_CATEGORIES->value)) {
            abort(403, 'Nincs jogosultságod kategóriák törléséhez.');
        }
        // Kép törlése (ha van)
        $this->deleteImage($category->featured_image);

        // Kategória törlése (recept kapcsolatok automatikusan törlődnek)
        $category->delete();

        return redirect()->route('categories.index')
            ->with('success', 'Kategória sikeresen törölve!');
    }
}
