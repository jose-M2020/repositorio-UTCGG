import { useState } from "react";
import { Form } from "@inertiajs/react";
import { update as updatePassword } from "@/actions/App/Http/Controllers/Auth/PasswordController";
import {
    PasswordRequirements,
    passwordMeetsRequirements,
} from "@/features/auth";
import { InputField } from "@/shared/components/form";
import { Button } from "@/shared/components/ui";

export const AccountSecuritySection = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const confirmationError =
        passwordConfirmation.length > 0 && password !== passwordConfirmation
            ? "Las contraseñas no coinciden."
            : undefined;
    const canSubmit =
        currentPassword.length > 0 &&
        passwordMeetsRequirements(password) &&
        password === passwordConfirmation &&
        passwordConfirmation.length > 0;

    return (
        <section className="space-y-4 rounded-xl border border-border bg-background p-5">
            <header className="space-y-1">
                <h2 className="text-lg font-semibold text-foreground">
                    Seguridad
                </h2>
                <p className="text-sm text-muted-foreground">
                    Cambia tu contraseña. Se cerrarán las demás sesiones activas.
                </p>
            </header>

            <Form
                {...updatePassword.form()}
                className="space-y-4"
                options={{ preserveScroll: true }}
                onSuccess={() => {
                    setCurrentPassword("");
                    setPassword("");
                    setPasswordConfirmation("");
                }}
            >
                {({ errors, processing }) => (
                    <>
                        <InputField
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
                            <InputField
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

                        <InputField
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

                        <div className="flex justify-end pt-2">
                            <Button
                                type="submit"
                                disabled={processing || !canSubmit}
                            >
                                {processing
                                    ? "Guardando..."
                                    : "Actualizar contraseña"}
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </section>
    );
};
