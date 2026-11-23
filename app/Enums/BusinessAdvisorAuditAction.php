<?php

namespace App\Enums;

enum BusinessAdvisorAuditAction: string
{
    case Attached = 'attached';
    case Released = 'released';
    case ViewedContact = 'viewed_contact';
    case Verified = 'verified';
    case Rejected = 'rejected';
    case Merged = 'merged';
    case Exported = 'exported';
    case ChangeAffiliation = 'change_affiliation';
    case PrivacyRequest = 'privacy_request';

    public function label(): string
    {
        return match ($this) {
            self::Attached => 'Adjuntado',
            self::Released => 'Liberado',
            self::ViewedContact => 'Contacto visto',
            self::Verified => 'Verificado',
            self::Rejected => 'Rechazado',
            self::Merged => 'Fusionado',
            self::Exported => 'Exportado',
            self::ChangeAffiliation => 'Cambio de afiliacion',
            self::PrivacyRequest => 'Solicitud de privacidad',
        };
    }
}
