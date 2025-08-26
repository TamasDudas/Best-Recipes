<?php

namespace Database\Seeders;

use App\Models\Recipe;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RecipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Töröljük a meglévő recepteket
        Recipe::query()->delete();

        // Receptek adatai kategóriákkal együtt
        $recipesData = [
            [
                'name' => 'Gulyásleves',
                'slug' => 'gulyasleves',
                'description' => 'Hagyományos magyar gulyásleves.',
                'ingredients' => 'Hús, burgonya, paprika, hagyma, fűszerek',
                'instructions' => 'Főzd meg a húst, add hozzá a zöldségeket és fűszereket.',
                'image' => 'gulyasleves.jpg',
                'user_id' => 1,
                'categories' => ['Levesek', 'Főételek'],
            ],
            [
                'name' => 'Túrós csusza',
                'slug' => 'turos-csusza',
                'description' => 'Finom túrós tészta étel.',
                'ingredients' => 'Tészta, túró, szalonna, tejföl',
                'instructions' => 'Főzd meg a tésztát, keverd össze a túróval és a szalonnával.',
                'image' => 'turos_csusza.jpg',
                'user_id' => 2,
                'categories' => ['Főételek'],
            ],
            [
                'name' => 'Palacsinta',
                'slug' => 'palacsinta',
                'description' => 'Édes desszert, amit mindenki szeret.',
                'ingredients' => 'Liszt, tojás, tej, cukor, olaj',
                'instructions' => 'Keverd össze az alapanyagokat, süsd ki serpenyőben.',
                'image' => 'palacsinta.jpg',
                'user_id' => 1,
                'categories' => ['Desszertek'],
            ],
            [
                'name' => 'Lecsó',
                'slug' => 'lecso',
                'description' => 'Hagyományos magyar étel, paprika és paradicsom alapú.',
                'ingredients' => 'Paprika, paradicsom, hagyma, szalonna',
                'instructions' => 'Pirítsd meg a szalonnát, add hozzá a zöldségeket és párold meg.',
                'image' => 'lecso.jpg',
                'user_id' => 2,
                'categories' => ['Főételek'],
            ],
        ];

        foreach ($recipesData as $recipeData) {
            // Kategóriák külön kezelése
            $categoryNames = $recipeData['categories'];
            unset($recipeData['categories']);

            // Recept létrehozása
            $recipe = Recipe::create($recipeData);

            // Kategóriák hozzácsatolása
            foreach ($categoryNames as $categoryName) {
                $category = Category::where('name', $categoryName)->first();
                if ($category) {
                    $recipe->categories()->attach($category->id);
                }
            }
        }
    }
}
