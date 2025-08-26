<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            ['name' => 'Főételek', 'color' => '#FF6B6B'],
            ['name' => 'Levesek', 'color' => '#4ECDC4'],
            ['name' => 'Desszertek', 'color' => '#FFE66D'],
            ['name' => 'Saláták', 'color' => '#A8E6CF'],
            ['name' => 'Reggeli', 'color' => '#FFB347'],
            ['name' => 'Snackek', 'color' => '#B19CD9'],
        ];

        $category = $this->faker->randomElement($categories);

        return [
            'name' => $category['name'],
            'color' => $category['color'],
            // slug automatikusan generálódik a boot() metódusban
        ];
    }
}
