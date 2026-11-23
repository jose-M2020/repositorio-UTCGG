import { Form, Link } from '@inertiajs/react';
import { useState } from 'react';
import {
    destroy as destroyRepo,
    edit,
    update,
} from '@/actions/App/Http/Controllers/RepositoryController';
import {
    destroy as destroyMember,
    store as storeMember,
} from '@/actions/App/Http/Controllers/RepositoryMemberController';
import {
    UserSearchPicker,
    type SearchableUser,
} from '@/shared/components';
import { ConfirmDeleteButton } from '@/shared/components/ConfirmDeleteButton';
import { SelectField } from '@/shared/components/form';
import { Button } from '@/shared/components/ui';
import { formatUserName } from '@/shared/lib';
import type { Repository } from '../../../shared/types';

type RepositorySettingsSectionProps = {
    repository: Repository;
};

export const RepositorySettingsSection = ({
    repository,
}: RepositorySettingsSectionProps) => {
    const [selected, setSelected] = useState<SearchableUser[]>([]);
    const visibility = repository.is_public ? 'public' : 'private';

    return (
        <div className="space-y-6">
            <section className="space-y-4 rounded-xl border border-border bg-card p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-semibold text-secondary">
                            Visibilidad
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Define si el repositorio aparece en el catálogo
                            público.
                        </p>
                    </div>
                    <Link href={edit.url(repository.slug)}>
                        <Button type="button" variant="outline">
                            Editar datos
                        </Button>
                    </Link>
                </div>

                <Form {...update.form(repository.slug)} className="space-y-4">
                    {({ processing, errors }) => (
                        <>
                            <input
                                type="hidden"
                                name="title"
                                value={repository.title}
                            />
                            <input
                                type="hidden"
                                name="description"
                                value={repository.description}
                            />
                            <input
                                type="hidden"
                                name="project_type"
                                value={repository.project_type}
                            />
                            <input
                                type="hidden"
                                name="academic_degree"
                                value={repository.academic_degree}
                            />
                            <input
                                type="hidden"
                                name="keywords"
                                value={repository.keywords}
                            />
                            <input
                                type="hidden"
                                name="career"
                                value={repository.career}
                            />
                            <input
                                type="hidden"
                                name="generation"
                                value={repository.generation}
                            />
                            {repository.project_period_id ? (
                                <input
                                    type="hidden"
                                    name="project_period_id"
                                    value={repository.project_period_id}
                                />
                            ) : null}

                            <SelectField
                                id="visibility"
                                name="visibility"
                                label="Estado actual"
                                required
                                defaultValue={visibility}
                                error={errors.visibility}
                                triggerClassName="max-w-xs"
                                aria-label="Cambiar visibilidad del repositorio"
                                options={[
                                    { value: "private", label: "Privado" },
                                    { value: "public", label: "Público" },
                                ]}
                            />

                            <Button type="submit" disabled={processing}>
                                {processing
                                    ? 'Guardando...'
                                    : 'Guardar visibilidad'}
                            </Button>
                        </>
                    )}
                </Form>
            </section>

            <section className="space-y-4 rounded-xl border border-border bg-card p-6">
                <div>
                    <h2 className="text-lg font-semibold text-secondary">
                        Colaboradores
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Solo alumnos. Los asesores se gestionan en la sección de
                        asesores, no como miembros.
                    </p>
                </div>

                <Form
                    {...storeMember.form(repository.slug)}
                    className="space-y-4"
                >
                    {({ errors, processing }) => (
                        <>
                            <UserSearchPicker
                                mode="id"
                                role="student"
                                selected={selected}
                                onChange={setSelected}
                                max={8}
                                label="Buscar alumnos"
                                description="Escribe al menos 2 caracteres para buscar por nombre o correo."
                            />
                            {errors.user_ids ? (
                                <p className="text-sm text-destructive">
                                    {errors.user_ids}
                                </p>
                            ) : null}
                            <Button
                                type="submit"
                                disabled={processing || selected.length === 0}
                            >
                                Agregar
                            </Button>
                        </>
                    )}
                </Form>

                <ul className="divide-y divide-border">
                    {repository.users.map((user) => (
                        <li
                            key={user.id}
                            className="flex items-center justify-between gap-3 py-3 text-sm"
                        >
                            <span>
                                {formatUserName(user)} ({user.email})
                            </span>
                            <ConfirmDeleteButton
                                form={destroyMember.form([
                                    repository.slug,
                                    user.id,
                                ])}
                                itemLabel={formatUserName(user)}
                                triggerLabel="Quitar"
                                triggerSize="sm"
                            />
                        </li>
                    ))}
                </ul>
            </section>

            <section className="space-y-4 rounded-xl border border-destructive/30 bg-card p-6">
                <div>
                    <h2 className="text-lg font-semibold text-destructive">
                        Eliminar repositorio
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Esta acción no se puede deshacer. Se eliminará el
                        repositorio y su contenido asociado.
                    </p>
                </div>
                <ConfirmDeleteButton
                    form={destroyRepo.form(repository.slug)}
                    itemLabel={repository.title}
                    triggerLabel="Eliminar"
                />
            </section>
        </div>
    );
};
