<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Test user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Szerzők létrehozása
        User::factory()->create([
            'name' => 'Nagy Péter',
            'email' => 'peter@example.com',
        ]);

        User::factory()->create([
            'name' => 'Kovács Anna',
            'email' => 'anna@example.com',
        ]);

        User::factory()->create([
            'name' => 'Szabó Márton',
            'email' => 'marton@example.com',
        ]);

        // Kategóriák létrehozása
        $this->call(CategorySeeder::class);
        // Receptek létrehozása
        $this->call(RecipeSeeder::class);
    }
}
