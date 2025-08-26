<?php

namespace Database\Seeders;

use App\Enums\PermissionEnum;
use App\Enums\RoleEnum;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Spatie\Permission\Contracts\Permission as ContractsPermission;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    // Permission létrehozása
    public function run(): void
    {
        // 1) Create permissions from enum (idempotent)
        foreach (PermissionEnum::cases() as $perm) {
            Permission::firstOrCreate(['name' => $perm->value]);
        }

        // 2) Roles létrehozása
        $adminRole = Role::firstOrCreate(['name' => RoleEnum::ADMIN->value]);
        $authorRole = Role::firstOrCreate(['name' => RoleEnum::AUTHOR->value]);
        $userRole = Role::firstOrCreate(['name' => RoleEnum::USER->value]);

        // 3) Assign permissions
        $adminRole->givePermissionTo(Permission::all());

        $authorRole->givePermissionTo([
            PermissionEnum::CREATE_RECIPE->value,
            PermissionEnum::EDIT_OWN_RECIPE->value,
            PermissionEnum::DELETE_OWN_RECIPE->value,
            PermissionEnum::PUBLISH_RECIPE->value,
        ]);

        $userRole->givePermissionTo([
            PermissionEnum::COMMENT_ON_RECIPES->value,
        ]);
    }
}
