<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Recipe;
use App\Models\User;
use App\Models\Comment;

class SeedPendingComment extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:seed-pending-comment';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a single pending comment for testing admin moderation';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $recipe = Recipe::first();
        $user = User::first();

        if (! $recipe || ! $user) {
            $this->error('No recipe or user found in database.');
            return 1;
        }

        $comment = new Comment(['content' => 'Automatikus teszt komment - pending']);
        $comment->user()->associate($user);
        $recipe->comments()->save($comment);

        $this->info('Pending comment created with id: ' . $comment->id);
        return 0;
    }
}
