import { useState } from 'react';
import { Form } from '@inertiajs/react';
import { update } from '@/actions/App/Http/Controllers/Auth/PasswordController';
import {
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/shared/components/ui';
import { passwordMeetsRequirements } from '../utils/passwordRequirements';
import { AuthField } from './AuthField';
import { PasswordRequirements } from './PasswordRequirements';

type ChangePasswordDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export const ChangePasswordDialog = ({
    open,
    onOpenChange,
}: ChangePasswordDialogProps) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const confirmationError =
        passwordConfirmation.length > 0 && password !== passwordConfirmation
            ? 'Las contraseñas no coinciden.'
            : undefined;
    const canSubmit =
        currentPassword.length > 0 &&
        passwordMeetsRequirements(password) &&
        password === passwordConfirmation &&
        passwordConfirmation.length > 0;

    const handleOpenChange = (nextOpen: boolean) => {
        if (!nextOpen) {
            setCurrentPassword('');
            setPassword('');
            setPasswordConfirmation('');
        }
        onOpenChange(nextOpen);
    };

    const handleSuccess = () => {
        handleOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Cambiar contraseña</DialogTitle>
                    <DialogDescription>
                        Ingresa tu contraseña actual y elige una nueva.
                    </DialogDescription>
                </DialogHeader>

                <Form
                    {...update.form()}
                    className="space-y-4"
                    onSuccess={handleSuccess}
                    options={{ preserveScroll: true }}
                >
                    {({ errors, processing }) => (
                        <>
                            <AuthField
                                id="current_password"
                                name="current_password"
                                label="Contraseña actual"
                                type="password"
                                required
                                autoComplete="current-password"
                                value={currentPassword}
                                onChange={(event) =>
                                    setCurrentPassword(event.target.value)
                                }
                                error={errors.current_password}
                            />

                            <div className="space-y-2">
                                <AuthField
                                    id="password"
                                    name="password"
                                    label="Nueva contraseña"
                                    type="password"
                                    required
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    error={errors.password}
                                />
                                <PasswordRequirements password={password} />
                            </div>

                            <AuthField
                                id="password_confirmation"
                                name="password_confirmation"
                                label="Confirmar nueva contraseña"
                                type="password"
                                required
                                autoComplete="new-password"
                                value={passwordConfirmation}
                                onChange={(event) =>
                                    setPasswordConfirmation(event.target.value)
                                }
                                error={confirmationError}
                            />

                            <DialogFooter>
                                <DialogClose
                                    render={
                                        <Button
                                            type="button"
                                            variant="outline"
                                        />
                                    }
                                >
                                    Cancelar
                                </DialogClose>
                                <Button
                                    type="submit"
                                    disabled={processing || !canSubmit}
                                >
                                    {processing
                                        ? 'Guardando...'
                                        : 'Guardar contraseña'}
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
};
