import { Form, Link } from '@inertiajs/react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/RoleController';
import { Button } from '@/shared/components/ui';
import { RoleFormFields } from '../components/RoleFormFields';
import type { PermissionGroups } from '../types';

type RoleCreateContainerProps = {
    permissionGroups: PermissionGroups;
};

export const RoleCreateContainer = ({
    permissionGroups,
}: RoleCreateContainerProps) => {
    return (
        <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8">
            <header className="space-y-1">
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                    Nuevo rol
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Crea un rol y selecciona sus permisos.
                </p>
            </header>

            <Form
                {...store.form()}
                className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
                {({ errors, processing }) => (
                    <>
                        <RoleFormFields
                            errors={errors}
                            permissionGroups={permissionGroups}
                        />
                        <div className="flex justify-end gap-2">
                            <Link href={index.url()}>
                                <Button type="button" variant="outline">
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Guardando...' : 'Guardar'}
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </main>
    );
};
