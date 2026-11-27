<?php

namespace App\Enums;

enum StudentTermChangeReason: string
{
    case CohortAdvance = 'cohort_advance';
    case Confirm = 'confirm';
    case Manual = 'manual';
    case Import = 'import';
    case Resume = 'resume';
    case CareerChange = 'career_change';

    public function label(): string
    {
        return match ($this) {
            self::CohortAdvance => 'Avance de cohorte',
            self::Confirm => 'Confirmación',
            self::Manual => 'Manual',
            self::Import => 'Importación',
            self::Resume => 'Reanudación',
            self::CareerChange => 'Cambio de carrera',
        };
    }
}