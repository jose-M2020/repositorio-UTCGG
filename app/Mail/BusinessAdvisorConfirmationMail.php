<?php

namespace App\Mail;

use App\Models\RepositoryBusinessAdvisor;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BusinessAdvisorConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public RepositoryBusinessAdvisor $assignment,
        public string $confirmUrl,
        public string $rejectUrl,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Confirmacion de asesor empresarial',
        );
    }

    public function content(): Content
    {
        $snapshot = $this->assignment->displaySnapshot();

        return new Content(
            markdown: 'mail.business-advisor-confirmation',
            with: [
                'projectTitle' => $this->assignment->repository?->title ?? 'Proyecto',
                'advisorName' => trim(($snapshot['first_name'] ?? '').' '.($snapshot['last_name'] ?? '')),
                'companyName' => is_array($snapshot['company'] ?? null)
                    ? ($snapshot['company']['name'] ?? null)
                    : null,
                'confirmUrl' => $this->confirmUrl,
                'rejectUrl' => $this->rejectUrl,
            ],
        );
    }
}
