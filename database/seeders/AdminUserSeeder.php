<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin felhasználó létrehozása
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
            ]
        );

        // Admin role hozzárendelése
        $admin->assignRole('admin');

        // Teszt szerző létrehozása
        $author = User::firstOrCreate(
            ['email' => 'author@example.com'],
            [
                'name' => 'Test Author',
                'password' => Hash::make('password'),
            ]
        );

        // Author role hozzárendelése
        $author->assignRole('author');

        // Teszt felhasználó létrehozása
        $user = User::firstOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('password'),
            ]
        );

        // User role hozzárendelése
        $user->assignRole('user');
    }
}
