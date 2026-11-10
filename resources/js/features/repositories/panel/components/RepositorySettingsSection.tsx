import { Form, Link } from '@inertiajs/react';
import { useState } from 'react';
import {
    destroy as destroyRepo,
    edit,
    update,
} from '@/actions/App/Http/Controllers/RepositorioController';
import {
    destroy as destroyMember,
    store as storeMember,
} from '@/actions/App/Http/Controllers/RepositorioUsuarioController';
import {
    UserSearchPicker,
    type SearchableUser,
} from '@/shared/components';
import { Button } from '@/shared/components/ui';
import type { Repository } from '../../shared/types';

type RepositorySettingsSectionProps = {
    repositorio: Repository;
};

export const RepositorySettingsSection = ({
    repositorio,
}: RepositorySettingsSectionProps) => {
    const [selected, setSelected] = useState<SearchableUser[]>([]);
    const visibility = repositorio.publico ? 'publico' : 'privado';

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
                                name="nombre_rep"
                                value={repositorio.nombre_rep}
                            />
                            <input
                                type="hidden"
                                name="descripcion"
                                value={repositorio.descripcion}
                            />
                            <input
                                type="hidden"
                                name="tipo_proyecto"
                                value={repositorio.tipo_proyecto}
                            />
                            <input
                                type="hidden"
                                name="nivel_proyecto"
                                value={repositorio.nivel_proyecto}
                            />
                            <input
                                type="hidden"
                                name="palabras_clave"
                                value={repositorio.palabras_clave}
                            />
                            <input
                                type="hidden"
                                name="carrera"
                                value={repositorio.carrera}
                            />
                            <input
                                type="hidden"
                                name="empresa"
                                value={repositorio.empresa}
                            />
                            <input
                                type="hidden"
                                name="asesor_externo"
                                value={repositorio.asesor_externo ?? ''}
                            />
                            <input
                                type="hidden"
                                name="generacion"
                                value={repositorio.generacion}
                            />

                            <div className="space-y-1">
                                <label
                                    htmlFor="visibilidad"
                                    className="text-sm font-medium"
                                >
                                    Estado actual
                                </label>
                                <select
                                    id="visibilidad"
                                    name="visibilidad"
                                    required
                                    defaultValue={visibility}
                                    className="h-8 w-full max-w-xs rounded-lg border border-input bg-card px-2.5 text-sm"
                                    aria-label="Cambiar visibilidad del repositorio"
                                >
                                    <option value="privado">Privado</option>
                                    <option value="publico">Público</option>
                                </select>
                                {errors.visibilidad ? (
                                    <p className="text-sm text-destructive">
                                        {errors.visibilidad}
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
                                {user.nombre} {user.apellido} ({user.email})
                            </span>
                            <Form
                                {...destroyMember.form([
                                    repositorio.slug,
                                    user.id,
                                ])}
                            >
                                {({ processing }) => (
                                    <Button
                                        type="submit"
                                        variant="destructive"
                                        size="sm"
                                        disabled={processing}
                                        aria-label={`Quitar a ${user.nombre} ${user.apellido}`}
                                    >
                                        Quitar
                                    </Button>
                                )}
                            </Form>
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
                <Form {...destroyRepo.form(repositorio.slug)}>
                    {({ processing }) => (
                        <Button
                            type="submit"
                            variant="destructive"
                            disabled={processing}
                            aria-label="Eliminar repositorio"
                        >
                            {processing ? 'Eliminando...' : 'Eliminar'}
                        </Button>
                    )}
                </Form>
            </section>
        </div>
    );
};
