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
import { Button } from '@/shared/components/ui';
import { formatUserName } from '@/shared/lib';
import type { Repository } from '../../shared/types';

type RepositorySettingsSectionProps = {
    repository: Repository;
};

export const RepositorySettingsSection = ({
    repositorio,
}: RepositorySettingsSectionProps) => {
    const [selected, setSelected] = useState<SearchableUser[]>([]);
    const visibility = repositorio.is_public ? 'public' : 'private';

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
                    <Link href={edit.url(repositorio.slug)}>
                        <Button type="button" variant="outline">
                            Editar datos
                        </Button>
                    </Link>
                </div>

                <Form {...update.form(repositorio.slug)} className="space-y-4">
                    {({ processing, errors }) => (
                        <>
                            <input
                                type="hidden"
                                name="title"
                                value={repositorio.title}
                            />
                            <input
                                type="hidden"
                                name="description"
                                value={repositorio.description}
                            />
                            <input
                                type="hidden"
                                name="project_type"
                                value={repositorio.project_type}
                            />
                            <input
                                type="hidden"
                                name="academic_degree"
                                value={repositorio.academic_degree}
                            />
                            <input
                                type="hidden"
                                name="keywords"
                                value={repositorio.keywords}
                            />
                            <input
                                type="hidden"
                                name="career"
                                value={repositorio.career}
                            />
                            <input
                                type="hidden"
                                name="company"
                                value={repositorio.empresa}
                            />
                            <input
                                type="hidden"
                                name="external_advisor"
                                value={repositorio.external_advisor ?? ''}
                            />
                            <input
                                type="hidden"
                                name="generation"
                                value={repositorio.generation}
                            />

                            <div className="space-y-1">
                                <label
                                    htmlFor="visibility"
                                    className="text-sm font-medium"
                                >
                                    Estado actual
                                </label>
                                <select
                                    id="visibility"
                                    name="visibility"
                                    required
                                    defaultValue={visibility}
                                    className="h-8 w-full max-w-xs rounded-lg border border-input bg-card px-2.5 text-sm"
                                    aria-label="Cambiar visibilidad del repositorio"
                                >
                                    <option value="private">Privado</option>
                                    <option value="public">Público</option>
                                </select>
                                {errors.visibility ? (
                                    <p className="text-sm text-destructive">
                                        {errors.visibility}
                                    </p>
                                ) : null}
                            </div>

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
                        Integrantes
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Agrega o quita personas con acceso al repositorio.
                    </p>
                </div>

                <Form
                    {...storeMember.form(repositorio.slug)}
                    className="space-y-4"
                >
                    {({ errors, processing }) => (
                        <>
                            <UserSearchPicker
                                mode="id"
                                selected={selected}
                                onChange={setSelected}
                                max={8}
                                label="Buscar por nombre o correo"
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
                    {repositorio.users.map((user) => (
                        <li
                            key={user.id}
                            className="flex items-center justify-between gap-3 py-3 text-sm"
                        >
                            <span>
                                {formatUserName(user)} ({user.email})
                            </span>
                            <ConfirmDeleteButton
                                form={destroyMember.form([
                                    repositorio.slug,
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
                    form={destroyRepo.form(repositorio.slug)}
                    itemLabel={repositorio.title}
                    triggerLabel="Eliminar"
                />
            </section>
        </div>
    );
};
