<?php

namespace App\Notifications;

use App\Enums\SetPasswordPurpose;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SetPasswordNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public string $token,
        public SetPasswordPurpose $purpose,
    ) {
        $this->afterCommit();
    }

    /**
     * @return list<string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $url = url(route('password.set', [
            'token' => $this->token,
            'email' => $notifiable->getEmailForPasswordReset(),
            'purpose' => $this->purpose->value,
        ], false));

        $expireMinutes = (int) config('auth.passwords.users.expire', 60);

        if ($this->purpose === SetPasswordPurpose::Activation) {
            return (new MailMessage)
                ->subject('Activa tu cuenta')
                ->greeting('Hola '.$notifiable->first_name)
                ->line('Se creó una cuenta para ti en el repositorio. Elige tu contraseña para activarla.')
                ->action('Activar cuenta', $url)
                ->line("Este enlace expira en {$expireMinutes} minutos.")
                ->line('Si no esperabas este correo, puedes ignorarlo.');
        }

        return (new MailMessage)
            ->subject('Restablecer contraseña')
            ->greeting('Hola '.$notifiable->first_name)
            ->line('Recibimos una solicitud para restablecer la contraseña de tu cuenta.')
            ->action('Restablecer contraseña', $url)
            ->line("Este enlace expira en {$expireMinutes} minutos.")
            ->line('Si no solicitaste este cambio, puedes ignorar este correo.');
    }
}
