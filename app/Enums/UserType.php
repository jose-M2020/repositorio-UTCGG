<?php

namespace App\Enums;

enum UserType: string
{
    case Academic = 'academic';
    case Workforce = 'workforce';
    case Staff = 'staff';

    public function label(): string
    {
        return match ($this) {
            self::Academic => 'Académico',
            self::Workforce => 'Laboral',
            self::Staff => 'Personal',
        };
    }
}
