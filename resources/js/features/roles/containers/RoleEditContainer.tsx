import { Form, Link } from '@inertiajs/react';
import {
    index,
    update,
} from '@/actions/App/Http/Controllers/RoleController';
import { Button } from '@/shared/components/ui';
import { RoleFormFields } from '../components/RoleFormFields';
import type { PermissionGroups, RoleFormValues } from '../types';

type RoleEditContainerProps = {
    role: RoleFormValues;
    permissionGroups: PermissionGroups;
};

export const RoleEditContainer = ({
    role,
    permissionGroups,
}: RoleEditContainerProps) => {
    return (
        <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-8">
            <header className="space-y-1">
                <h1 className="text-2xl font-semibold text-foreground">
                    Editar rol
                </h1>
                <p className="text-sm text-muted-foreground">
                    Actualiza el nombre y permisos de {role.name}.
                </p>
            </header>

            <Form
                {...update.form(role.id!)}
                className="space-y-6 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm"
            >
                {({ errors, processing }) => (
                    <>
                        <RoleFormFields
                            errors={errors}
                            permissionGroups={permissionGroups}
                            defaults={role}
                        />
                        <div className="flex justify-end gap-2">
                            <Link href={index.url()}>
                                <Button type="button" variant="outline">
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Guardando...' : 'Actualizar'}
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </main>
    );
};
