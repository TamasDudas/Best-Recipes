<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Comment;

$comments = Comment::orderBy('id', 'desc')->take(10)->get(['id','recipe_id','user_id','status','approved_at','moderated_by','created_at','content']);

foreach ($comments as $c) {
    echo "ID: {$c->id} | recipe_id: {$c->recipe_id} | user_id: {$c->user_id} | status: {$c->status} | approved_at: {$c->approved_at} | moderated_by: {$c->moderated_by}\n";
    echo "Content: " . (strlen($c->content) > 120 ? substr($c->content, 0, 120).'...' : $c->content) . "\n\n";
}
