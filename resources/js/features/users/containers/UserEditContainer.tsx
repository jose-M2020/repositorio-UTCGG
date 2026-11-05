import { Form, Link } from '@inertiajs/react';
import {
    index,
    update,
} from '@/actions/App/Http/Controllers/UserController';
import { Button } from '@/shared/components/ui';
import { UserFormFields } from '../components/UserFormFields';
import type { UserFormValues } from '../types';

type UserEditContainerProps = {
    user: UserFormValues;
    roles: string[];
};

export const UserEditContainer = ({
    user,
    roles,
}: UserEditContainerProps) => {
    return (
        <main className="mx-auto w-full max-w-2xl space-y-6 px-4 py-8">
            <header className="space-y-1">
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                    Editar usuario
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Actualiza los datos de {user.nombre} {user.apellido}.
                </p>
            </header>

            <Form
                {...update.form(user.id!)}
                className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
                {({ errors, processing }) => (
                    <>
                        <UserFormFields
                            errors={errors}
                            roles={roles}
                            defaults={user}
                            requirePassword={false}
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
