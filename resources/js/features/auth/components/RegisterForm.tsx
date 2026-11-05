import { Link } from '@inertiajs/react';
import { Button } from '@/shared/components/ui';
import type { AuthFormErrors } from '../types';
import { AuthField } from './AuthField';

type RegisterFormProps = {
    errors: AuthFormErrors;
    processing: boolean;
    loginUrl: string;
};

export const RegisterForm = ({
    errors,
    processing,
    loginUrl,
}: RegisterFormProps) => {
    return (
        <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
                <AuthField
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    required
                    autoComplete="given-name"
                    error={errors.nombre}
                />
                <AuthField
                    id="apellido"
                    name="apellido"
                    label="Apellido"
                    required
                    autoComplete="family-name"
                    error={errors.apellido}
                />
            </div>

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
                id="carrera"
                name="carrera"
                label="Carrera (opcional)"
                maxLength={20}
                error={errors.carrera}
            />

            <div className="grid gap-4 sm:grid-cols-2">
                <AuthField
                    id="password"
                    name="password"
                    label="Contraseña"
                    type="password"
                    required
                    autoComplete="new-password"
                    error={errors.password}
                />
                <AuthField
                    id="password_confirmation"
                    name="password_confirmation"
                    label="Confirmar contraseña"
                    type="password"
                    required
                    autoComplete="new-password"
                />
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
                <Link
                    href={loginUrl}
                    className="text-sm text-slate-600 underline underline-offset-4 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                    Ya tengo cuenta
                </Link>
                <Button type="submit" disabled={processing}>
                    {processing ? 'Registrando...' : 'Registrarme'}
                </Button>
            </div>
        </div>
    );
};
