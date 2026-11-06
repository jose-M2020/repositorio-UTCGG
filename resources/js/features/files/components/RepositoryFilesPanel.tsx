import { Form, Link } from '@inertiajs/react';
import {
    create,
    destroy,
    destroyImage,
    download,
    update,
} from '@/actions/App/Http/Controllers/FileController';
import { Button } from '@/shared/components/ui';
import type { RepositoryFile } from '../types';

type RepositoryFilesPanelProps = {
    slug: string;
    files: RepositoryFile[];
    imagenes: string[];
    canManage?: boolean;
};

export const RepositoryFilesPanel = ({
    slug,
    files,
    imagenes,
    canManage = false,
}: RepositoryFilesPanelProps) => {
    return (
        <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <header className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">Archivos</h2>
                {canManage ? (
                    <Link href={create.url(slug)}>
                        <Button type="button">Subir archivos</Button>
                    </Link>
                ) : null}
            </header>

            {files.length === 0 ? (
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    No hay documentos cargados.
                </p>
            ) : (
                <ul className="divide-y divide-slate-200 dark:divide-slate-800">
                    {files.map((file) => (
                        <li
                            key={file.id}
                            className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"
                        >
                            <div>
                                <p className="font-medium">
                                    {file.original_name}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {file.file_type} ·{' '}
                                    {file.is_public ? 'Público' : 'Privado'}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <a href={download.url(file.id)}>
                                    <Button type="button" variant="outline">
                                        Descargar
                                    </Button>
                                </a>
                                {canManage ? (
                                    <>
                                        <Form
                                            {...update.form([slug, file.id])}
                                        >
                                            <input
                                                type="hidden"
                                                name="is_public"
                                                value={file.is_public ? 0 : 1}
                                            />
                                            <Button type="submit" variant="ghost">
                                                {file.is_public
                                                    ? 'Hacer privado'
                                                    : 'Hacer público'}
                                            </Button>
                                        </Form>
                                        <Form
                                            {...destroy.form([slug, file.id])}
                                        >
                                            {({ processing }) => (
                                                <Button
                                                    type="submit"
                                                    variant="destructive"
                                                    disabled={processing}
                                                >
                                                    Eliminar
                                                </Button>
                                            )}
                                        </Form>
                                    </>
                                ) : null}
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {imagenes.length > 0 ? (
                <div className="space-y-2">
                    <h3 className="text-sm font-medium">Imágenes</h3>
                    <ul className="space-y-2">
                        {imagenes.map((path, index) => (
                            <li
                                key={`${path}-${index}`}
                                className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2 text-xs dark:border-slate-800"
                            >
                                <span className="truncate">{path}</span>
                                {canManage ? (
                                    <Form
                                        {...destroyImage.form([slug, index])}
                                    >
                                        {({ processing }) => (
                                            <Button
                                                type="submit"
                                                variant="destructive"
                                                size="sm"
                                                disabled={processing}
                                            >
                                                Quitar
                                            </Button>
                                        )}
                                    </Form>
                                ) : null}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}
        </section>
    );
};
