<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommentAdminController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('moderate', Comment::class);

        $comments = Comment::pending()->with(['user', 'recipe'])->orderBy('created_at', 'desc')->paginate(20)->withQueryString();

        return Inertia::render('Admin/Comments', [
            'comments' => $comments,
        ]);
    }
}
