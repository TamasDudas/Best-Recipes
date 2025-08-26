<?php

namespace App\Enums;

enum RoleEnum: string
{
    case ADMIN = 'admin';
    case AUTHOR = 'author';
    case USER = 'user';

    public function label(): string
    {
        return match($this) {
            static::ADMIN => 'Adminisztrátor',
            static::AUTHOR => 'Szerző',
            static::USER => 'Felhasználó',
        };
    }
}
