import { Link } from '@inertiajs/react';
import { create as login } from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import { Button } from '@/shared/components/ui';
import type { AuthFormErrors } from '../types';
import { AuthField } from './AuthField';

type ForgotPasswordFormProps = {
    errors: AuthFormErrors;
    processing: boolean;
};

export const ForgotPasswordForm = ({
    errors,
    processing,
}: ForgotPasswordFormProps) => {
    return (
        <div className="space-y-4">
            <AuthField
                id="email"
                name="email"
                label="Correo"
                type="email"
                required
                autoComplete="email"
                error={errors.email}
            />

            <div className="flex items-center justify-between gap-3 pt-2">
                <Link
                    href={login.url()}
                    className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                    Volver al inicio de sesión
                </Link>
                <Button type="submit" disabled={processing}>
                    {processing ? 'Enviando...' : 'Enviar enlace'}
                </Button>
            </div>
        </div>
    );
};
