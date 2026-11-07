import { Form, Link } from '@inertiajs/react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/UserController';
import { Button } from '@/shared/components/ui';
import { UserFormFields } from '../components/UserFormFields';

type UserCreateContainerProps = {
    roles: string[];
    careers: Record<string, string>;
};

export const UserCreateContainer = ({
    roles,
    careers,
}: UserCreateContainerProps) => {
    return (
        <main className="mx-auto w-full max-w-2xl space-y-6 px-4 py-8">
            <header className="space-y-1">
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                    Nuevo usuario
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Completa los datos para registrar una cuenta.
                </p>
            </header>

            <Form
                {...store.form()}
                className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
                {({ errors, processing }) => (
                    <>
                        <UserFormFields
                            errors={errors}
                            roles={roles}
                            careers={careers}
                            requirePassword
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
