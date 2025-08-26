<?php

namespace App\Policies;

use App\Models\Comment;
use App\Models\User;

class CommentPolicy
{
    public function create(User $user)
    {
        // any authenticated user can create
        return (bool) $user;
    }

    public function update(User $user, Comment $comment)
    {
        // owners can update their own comments (if not approved), admins can always
        if ($user->id === $comment->user_id) {
            return $comment->status !== 'approved';
        }

        return $user->hasRole('admin');
    }

    public function delete(User $user, Comment $comment)
    {
        return $user->id === $comment->user_id || $user->hasRole('admin');
    }

    /**
     * Determine if the user can moderate comments.
     * Accepts either the Comment instance or the class name when called via authorize with a class.
     */
    public function moderate(User $user, $comment = null)
    {
        return $user->hasRole('admin');
    }
}
