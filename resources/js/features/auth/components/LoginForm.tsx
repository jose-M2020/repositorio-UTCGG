import { Link } from '@inertiajs/react';
import { Button } from '@/shared/components/ui';
import type { AuthFormErrors } from '../types';
import { AuthField } from './AuthField';

type LoginFormProps = {
    errors: AuthFormErrors;
    processing: boolean;
    registerUrl: string;
};

export const LoginForm = ({
    errors,
    processing,
    registerUrl,
}: LoginFormProps) => {
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

            <AuthField
                id="password"
                name="password"
                label="Contraseña"
                type="password"
                required
                autoComplete="current-password"
                error={errors.password}
            />

            <div className="flex items-center justify-between gap-3 pt-2">
                <Link
                    href={registerUrl}
                    className="text-sm text-slate-600 underline underline-offset-4 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                    Crear cuenta
                </Link>
                <Button type="submit" disabled={processing}>
                    {processing ? 'Ingresando...' : 'Entrar'}
                </Button>
            </div>
        </div>
    );
};
