<?php

// boots the Laravel application and creates a pending comment for testing
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Recipe;
use App\Models\User;
use App\Models\Comment;

$recipe = Recipe::first();
$user = User::first();

if (! $recipe || ! $user) {
    echo "No recipe or user found\n";
    exit(1);
}

$comment = new Comment(['content' => 'Automatikus teszt komment - pending']);
$comment->user()->associate($user);
$comment->recipe()->associate($recipe);
$comment->save();

echo "Created comment id: {$comment->id}\n";
return 0;
