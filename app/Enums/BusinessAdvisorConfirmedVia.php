<?php

namespace App\Enums;

enum BusinessAdvisorConfirmedVia: string
{
    case EmailLink = 'email_link';
    case AcademicAdvisor = 'academic_advisor';

    public function label(): string
    {
        return match ($this) {
            self::EmailLink => 'Enlace de correo',
            self::AcademicAdvisor => 'Asesor academico',
        };
    }
}
