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
        <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8">
            <header className="space-y-1">
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                    Editar rol
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Actualiza el nombre y permisos de {role.name}.
                </p>
            </header>

            <Form
                {...update.form(role.id!)}
                className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
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
