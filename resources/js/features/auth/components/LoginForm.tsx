import { Button } from '@/shared/components/ui';
import type { AuthFormErrors } from '../types';
import { AuthField } from './AuthField';

type LoginFormProps = {
    errors: AuthFormErrors;
    processing: boolean;
};

export const LoginForm = ({ errors, processing }: LoginFormProps) => {
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

            <div className="flex justify-end pt-2">
                <Button type="submit" disabled={processing}>
                    {processing ? 'Ingresando...' : 'Entrar'}
                </Button>
            </div>
        </div>
    );
};
