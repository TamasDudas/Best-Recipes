<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Főételek',
                'color' => '#FF6B6B',
                'is_featured' => true,
                'featured_image' => 'foetelek.jpg'
            ],
            [
                'name' => 'Levesek',
                'color' => '#4ECDC4',
                'is_featured' => false,
                'featured_image' => 'levesek.jpg'
            ],
            [
                'name' => 'Desszertek',
                'color' => '#FFE66D',
                'is_featured' => true,
                'featured_image' => 'desszertek.jpg'
            ],
            [
                'name' => 'Saláták',
                'color' => '#A8E6CF',
                'is_featured' => true,
                'featured_image' => 'salatok.jpg'
            ],
            [
                'name' => 'Reggeli',
                'color' => '#FFB347',
                'is_featured' => false,
                'featured_image' => 'reggelik.jpg'
            ],
            [
                'name' => 'Snackek',
                'color' => '#B19CD9',
                'is_featured' => false,
                'featured_image' => 'snackek.jpg'
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
