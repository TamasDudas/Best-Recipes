<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CommentController extends Controller
{
    public function store(Request $request, Recipe $recipe)
    {
        $this->authorize('create', Comment::class);

        $data = $request->validate([
            'content' => 'required|string|max:2000',
            'parent_id' => 'nullable|exists:comments,id',
        ]);

        $comment = new Comment($data);
        $comment->user()->associate($request->user());
        $recipe->comments()->save($comment);

        // return inertia partial refresh or redirect back with notice
        return back()->with('success', 'A komment sikeresen elküldve. Moderálás után megjelenik');
    }

    public function approve(Request $request, Comment $comment)
    {
        Log::info('CommentController@approve called', ['id' => $comment->id, 'user' => $request->user()?->id]);
        $this->authorize('moderate', Comment::class);

        $comment->status = 'approved';
        $comment->approved_at = now();
        $comment->moderated_by = $request->user()->id;
        $comment->save();

        // If this was an Inertia request (X-Inertia header), return a redirect/back
        // so the Inertia client receives a proper Inertia response.
        if ($request->header('X-Inertia')) {
            return back()->with('success', 'Komment jóváhagyva.');
        }

        // For standard AJAX/JSON requests return JSON.
        if ($request->wantsJson() || $request->ajax()) {
            return response()->json(['success' => true]);
        }

        return back()->with('success', 'Komment jóváhagyva.');
    }

    public function reject(Request $request, Comment $comment)
    {
        Log::info('CommentController@reject called', ['id' => $comment->id, 'user' => $request->user()?->id]);
        $this->authorize('moderate', Comment::class);

        $data = $request->validate(['rejected_reason' => 'nullable|string|max:1000']);

        $comment->status = 'rejected';
        $comment->rejected_reason = $data['rejected_reason'] ?? null;
        $comment->moderated_by = $request->user()->id;
        $comment->save();

        // If this was an Inertia request (X-Inertia header), return a redirect/back
        // so the Inertia client receives a proper Inertia response.
        if ($request->header('X-Inertia')) {
            return back()->with('success', 'Komment elutasítva.');
        }

        // For standard AJAX/JSON requests return JSON.
        if ($request->wantsJson() || $request->ajax()) {
            return response()->json(['success' => true]);
        }

        return back()->with('success', 'Komment elutasítva.');
    }
}
