import { Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { store } from '@/actions/App/Http/Controllers/FileController';
import {
    mine,
    showByUser,
} from '@/actions/App/Http/Controllers/RepositorioController';
import { Button } from '@/shared/components/ui';
import { FileDropzoneField } from '../components/FileDropzoneField';
import type { RepositoryUploadTarget } from '../types';

type FileUploadContainerProps = {
    repositorio: RepositoryUploadTarget;
};

export const FileUploadContainer = ({
    repositorio,
}: FileUploadContainerProps) => {
    const { data, setData, post, processing, errors } = useForm<{
        archivos: File[];
        imagenes: File[];
    }>({
        archivos: [],
        imagenes: [],
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(store.url(repositorio.slug), {
            forceFormData: true,
        });
    };

    return (
        <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8">
            <header className="space-y-1">
                <h1 className="text-2xl font-semibold">Subir archivos</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Repositorio: {repositorio.nombre_rep}
                </p>
            </header>

            <form
                onSubmit={handleSubmit}
                className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
                <FileDropzoneField
                    label="Documentos (pdf, doc, zip, rar)"
                    accept={{
                        'application/pdf': ['.pdf'],
                        'application/msword': ['.doc', '.docx'],
                        'application/zip': ['.zip', '.rar'],
                    }}
                    files={data.archivos}
                    error={errors.archivos}
                    onFilesChange={(files) => setData('archivos', files)}
                />

                <FileDropzoneField
                    label="Imágenes (opcional)"
                    accept={{
                        'image/*': ['.png', '.jpg', '.jpeg', '.svg', '.webp'],
                    }}
                    files={data.imagenes}
                    error={errors.imagenes}
                    onFilesChange={(files) => setData('imagenes', files)}
                />

                <div className="flex justify-end gap-2">
                    <Link href={showByUser.url(repositorio.slug)}>
                        <Button type="button" variant="outline">
                            Cancelar
                        </Button>
                    </Link>
                    <Button
                        type="submit"
                        disabled={processing || data.archivos.length === 0}
                    >
                        {processing ? 'Subiendo...' : 'Subir'}
                    </Button>
                </div>
            </form>

            <p className="text-xs text-slate-500">
                También puedes volver a{' '}
                <Link href={mine.url()} className="underline underline-offset-2">
                    mis repositorios
                </Link>
                .
            </p>
        </main>
    );
};
