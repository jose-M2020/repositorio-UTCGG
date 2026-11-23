<?php

namespace App\Services\BusinessAdvisors;

use App\Enums\BusinessAdvisorAcceptanceStatus;
use App\Enums\BusinessAdvisorConfirmedVia;
use App\Mail\BusinessAdvisorConfirmationMail;
use App\Models\RepositoryBusinessAdvisor;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class SendAdvisorConfirmation
{
    public function send(RepositoryBusinessAdvisor $assignment): string
    {
        $email = NameNormalizer::normalizeEmail(
            is_array($assignment->snapshot) ? ($assignment->snapshot['email'] ?? null) : $assignment->email,
        );

        if ($email === null) {
            throw ValidationException::withMessages([
                'email' => 'No hay correo para enviar la confirmacion.',
            ]);
        }

        $this->assertRateLimits($assignment, $email);

        $token = Str::random(48);
        $assignment->update([
            'confirmation_token_hash' => hash('sha256', $token),
            'confirmation_sent_at' => now(),
            'confirmation_expires_at' => now()->addDays(14),
            'acceptance_status' => BusinessAdvisorAcceptanceStatus::Pending->value,
            'confirmed_at' => null,
            'confirmed_via' => null,
        ]);

        $confirmUrl = URL::temporarySignedRoute(
            'business-advisors.confirm',
            now()->addDays(14),
            ['pivot' => $assignment->id, 'token' => $token, 'decision' => 'confirm'],
        );

        $rejectUrl = URL::temporarySignedRoute(
            'business-advisors.confirm',
            now()->addDays(14),
            ['pivot' => $assignment->id, 'token' => $token, 'decision' => 'reject'],
        );

        Mail::to($email)->send(new BusinessAdvisorConfirmationMail(
            $assignment->fresh(['repository']) ?? $assignment,
            $confirmUrl,
            $rejectUrl,
        ));

        $this->bumpRateLimits($assignment, $email);

        return $token;
    }

    public function confirmWithToken(RepositoryBusinessAdvisor $assignment, string $token): void
    {
        $this->assertValidToken($assignment, $token);

        $assignment->update([
            'acceptance_status' => BusinessAdvisorAcceptanceStatus::Confirmed->value,
            'confirmed_at' => now(),
            'confirmed_via' => BusinessAdvisorConfirmedVia::EmailLink->value,
            'confirmation_token_hash' => null,
        ]);
    }

    public function rejectWithToken(RepositoryBusinessAdvisor $assignment, string $token): void
    {
        $this->assertValidToken($assignment, $token);

        $assignment->update([
            'acceptance_status' => BusinessAdvisorAcceptanceStatus::Rejected->value,
            'confirmed_at' => null,
            'confirmed_via' => null,
            'confirmation_token_hash' => null,
        ]);
    }

    public function confirmByAcademicAdvisor(RepositoryBusinessAdvisor $assignment): void
    {
        $assignment->update([
            'acceptance_status' => BusinessAdvisorAcceptanceStatus::Confirmed->value,
            'confirmed_at' => now(),
            'confirmed_via' => BusinessAdvisorConfirmedVia::AcademicAdvisor->value,
            'confirmation_token_hash' => null,
        ]);
    }

    private function assertValidToken(RepositoryBusinessAdvisor $assignment, string $token): void
    {
        if ($assignment->confirmation_token_hash === null) {
            throw ValidationException::withMessages([
                'token' => 'El enlace ya fue usado o no es valido.',
            ]);
        }

        if ($assignment->confirmation_expires_at !== null && $assignment->confirmation_expires_at->isPast()) {
            throw ValidationException::withMessages([
                'token' => 'El enlace de confirmacion ha expirado.',
            ]);
        }

        if (! hash_equals($assignment->confirmation_token_hash, hash('sha256', $token))) {
            throw ValidationException::withMessages([
                'token' => 'El enlace de confirmacion no es valido.',
            ]);
        }
    }

    private function assertRateLimits(RepositoryBusinessAdvisor $assignment, string $email): void
    {
        $emailKey = 'ba-confirm-email:'.hash('sha256', $email).':'.now()->toDateString();
        $repoKey = 'ba-confirm-repo:'.$assignment->repository_id;

        if ((int) Cache::get($emailKey, 0) >= 3) {
            throw ValidationException::withMessages([
                'email' => 'Se alcanzo el limite de correos de confirmacion para este destinatario hoy.',
            ]);
        }

        if ((int) Cache::get($repoKey, 0) >= 5) {
            throw ValidationException::withMessages([
                'business_advisor' => 'Se alcanzo el limite de reenvios de confirmacion para este repositorio.',
            ]);
        }
    }

    private function bumpRateLimits(RepositoryBusinessAdvisor $assignment, string $email): void
    {
        $emailKey = 'ba-confirm-email:'.hash('sha256', $email).':'.now()->toDateString();
        $repoKey = 'ba-confirm-repo:'.$assignment->repository_id;

        Cache::add($emailKey, 0, now()->endOfDay());
        Cache::increment($emailKey);

        Cache::add($repoKey, 0, now()->addDays(30));
        Cache::increment($repoKey);
    }
}
