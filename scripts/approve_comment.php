<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Comment;

// pick admin user
$admin = User::where('email', 'admin@example.com')->first() ?? User::first();
Auth::login($admin);

$comment = Comment::find($argv[1] ?? 4);
if (! $comment) {
    echo "Comment not found\n";
    exit(1);
}

$comment->status = 'approved';
$comment->approved_at = now();
$comment->moderated_by = $admin->id;
$comment->save();

echo "Approved comment {$comment->id}\n";
