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
        <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-8">
            <header className="space-y-1">
                <h1 className="text-2xl font-semibold text-foreground">
                    Nuevo rol
                </h1>
                <p className="text-sm text-muted-foreground">
                    Crea un rol y selecciona sus permisos.
                </p>
            </header>

            <Form
                {...store.form()}
                className="space-y-6 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm"
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
