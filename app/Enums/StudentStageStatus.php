<?php

namespace App\Enums;

enum StudentStageStatus: string
{
    case InProgress = 'in_progress';
    case Graduated = 'graduated';
    case Titled = 'titled';
    case Interrupted = 'interrupted';

    public function label(): string
    {
        return match ($this) {
            self::InProgress => 'En curso',
            self::Graduated => 'Egresado',
            self::Titled => 'Titulado',
            self::Interrupted => 'Interrumpido',
        };
    }
}