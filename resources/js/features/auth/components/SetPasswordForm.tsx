import { Button } from '@/shared/components/ui';
import type { AuthFormErrors } from '../types';
import { AuthField } from './AuthField';

type SetPasswordFormProps = {
    email: string;
    token: string;
    errors: AuthFormErrors;
    processing: boolean;
    submitLabel: string;
};

export const SetPasswordForm = ({
    email,
    token,
    errors,
    processing,
    submitLabel,
}: SetPasswordFormProps) => {
    return (
        <div className="space-y-4">
            <input type="hidden" name="token" value={token} />

            <AuthField
                id="email"
                name="email"
                label="Correo"
                type="email"
                required
                autoComplete="username"
                defaultValue={email}
                readOnly
                error={errors.email}
            />

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

            <div className="flex justify-end pt-2">
                <Button type="submit" disabled={processing}>
                    {processing ? 'Guardando...' : submitLabel}
                </Button>
            </div>
        </div>
    );
};
