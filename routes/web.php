<?php

use Inertia\Inertia;
use App\Enums\PermissionEnum;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;

Route::get('/', [CategoryController::class, 'index'])->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Publikus route-ok (nem kell bejelentkezés)
Route::get('/recipes', [RecipeController::class, 'index'])->name('recipes.index');
Route::get('/recipes/create', [RecipeController::class, 'create'])->name('recipes.create');
Route::get('/recipes/{recipe}', [RecipeController::class, 'show'])->name('recipes.show');
Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');

// Kategóriák CRUD route-ok (middleware nélkül teszteléshez) - specifikus route-ok először!
Route::get('/categories/create', [CategoryController::class, 'create'])->name('categories.create');
Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
Route::get('/categories/{category}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
Route::patch('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');

// Általános category show route - ez legyen a legvégén!
Route::get('/categories/{category}', [CategoryController::class, 'show'])->name('categories.show');

// Autentikált felhasználók route-jai

Route::post('/recipes', [RecipeController::class, 'store'])->name('recipes.store');
Route::get('/recipes/{recipe}/edit', [RecipeController::class, 'edit'])->name('recipes.edit');
Route::patch('/recipes/{recipe}', [RecipeController::class, 'update'])->name('recipes.update');
Route::delete('/recipes/{recipe}', [RecipeController::class, 'destroy'])->name('recipes.destroy');

// Comments (authenticated users)
Route::post('/recipes/{recipe}/comments', [CommentController::class, 'store'])->name('recipes.comments.store');

// Admin moderation routes (require admin role/permission)
// Admin moderation routes protected by policy
Route::post('/admin/comments/{comment}/approve', [CommentController::class, 'approve'])
    ->name('admin.comments.approve')
    ->middleware(['auth', 'can:moderate,comment']);

Route::post('/admin/comments/{comment}/reject', [CommentController::class, 'reject'])
    ->name('admin.comments.reject')
    ->middleware(['auth', 'can:moderate,comment']);

// Contact route-ok
Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

// Teszt route a permission-ökhöz
Route::get('/test-permissions', function () {
    $user = \Illuminate\Support\Facades\Auth::user();
    if (!$user) {
        return 'Nincs bejelentkezve';
    }

    return [
        'user' => $user->name,
        'roles' => $user->getRoleNames(),
        'permissions' => $user->getAllPermissions()->pluck('name'),
        PermissionEnum::MANAGE_CATEGORIES->value,
        'can_create_recipe' => $user->can(PermissionEnum::CREATE_RECIPE->value),
    ];
})->middleware('auth');

// Teszt route a permission middleware működésének ellenőrzésére
Route::get('/test-middleware', function () {
    return 'Permission middleware működik!';
})->middleware(['auth', 'permission:' . PermissionEnum::MANAGE_CATEGORIES->value]);

require __DIR__.'/auth.php';

// Admin panel - pending comments list
Route::get('/admin/comments', [\App\Http\Controllers\Admin\CommentAdminController::class, 'index'])
    ->name('admin.comments.index')
    ->middleware(['auth', 'can:moderate,App\\Models\\Comment']);
