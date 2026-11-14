import { useState } from 'react';
import { Button } from '@/shared/components/ui';
import type { AuthFormErrors, SetPasswordPurpose } from '../types';
import { passwordMeetsRequirements } from '../utils/passwordRequirements';
import { AuthField } from './AuthField';
import { PasswordRequirements } from './PasswordRequirements';

type SetPasswordFormProps = {
    email: string;
    token: string;
    purpose: SetPasswordPurpose;
    errors: AuthFormErrors;
    processing: boolean;
    submitLabel: string;
};

export const SetPasswordForm = ({
    email,
    token,
    purpose,
    errors,
    processing,
    submitLabel,
}: SetPasswordFormProps) => {
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const confirmationError =
        passwordConfirmation.length > 0 && password !== passwordConfirmation
            ? 'Las contraseñas no coinciden.'
            : undefined;
    const canSubmit =
        passwordMeetsRequirements(password) &&
        password === passwordConfirmation &&
        passwordConfirmation.length > 0;

    return (
        <div className="space-y-4">
            <input type="hidden" name="token" value={token} />
            <input type="hidden" name="email" value={email} />
            <input type="hidden" name="purpose" value={purpose} />

            {errors.email ? (
                <p className="text-sm text-destructive" role="alert">
                    {errors.email}
                </p>
            ) : null}

            <div className="space-y-2">
                <AuthField
                    id="password"
                    name="password"
                    label="Contraseña"
                    type="password"
                    required
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    error={errors.password}
                />
                <PasswordRequirements password={password} />
            </div>

            <AuthField
                id="password_confirmation"
                name="password_confirmation"
                label="Confirmar contraseña"
                type="password"
                required
                autoComplete="new-password"
                value={passwordConfirmation}
                onChange={(event) =>
                    setPasswordConfirmation(event.target.value)
                }
                error={confirmationError}
            />

            <div className="flex justify-end pt-2">
                <Button type="submit" disabled={processing || !canSubmit}>
                    {processing ? 'Guardando...' : submitLabel}
                </Button>
            </div>
        </div>
    );
};
