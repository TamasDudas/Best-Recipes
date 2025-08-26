<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Vite;
use App\Enums\RoleEnum;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use App\Models\Comment;
use App\Policies\CommentPolicy;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // register comment policy
        Gate::policy(Comment::class, CommentPolicy::class);

        Vite::prefetch(concurrency: 3);

        Inertia::share([
            'auth' => function () {
                $user = Auth::user();

                if (! $user) {
                    return ['user' => null];
                }

                $roleNames = method_exists($user, 'getRoleNames') ? $user->getRoleNames()->toArray() : [];
                $roleLabels = array_map(fn ($r) => RoleEnum::tryFrom($r)?->label() ?? $r, $roleNames);

                return [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'roles' => $roleNames,
                        'role_labels' => $roleLabels,
                    ],
                ];
            },
        ]);
    }
}
