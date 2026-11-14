import { Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { store } from '@/actions/App/Http/Controllers/FileController';
import {
    mine,
    showByUser,
} from '@/actions/App/Http/Controllers/RepositoryController';
import { Button } from '@/shared/components/ui';
import { FileDropzoneField } from '../components/FileDropzoneField';
import type { RepositoryUploadTarget } from '../types';

type FileUploadContainerProps = {
    repository: RepositoryUploadTarget;
};

export const FileUploadContainer = ({
    repository,
}: FileUploadContainerProps) => {
    const { data, setData, post, processing, errors } = useForm<{
        files: File[];
        images: File[];
    }>({
        files: [],
        images: [],
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(store.url(repository.slug), {
            forceFormData: true,
        });
    };

    return (
        <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8">
            <header className="space-y-1">
                <h1 className="text-2xl font-semibold">Subir archivos</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Repositorio: {repository.title}
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
                    files={data.files}
                    error={errors.files}
                    onFilesChange={(nextFiles) => setData('files', nextFiles)}
                />

                <FileDropzoneField
                    label="Imágenes (opcional)"
                    accept={{
                        'image/*': ['.png', '.jpg', '.jpeg', '.svg', '.webp'],
                    }}
                    files={data.images}
                    error={errors.images}
                    onFilesChange={(nextFiles) => setData('images', nextFiles)}
                />

                <div className="flex justify-end gap-2">
                    <Link href={showByUser.url(repository.slug)}>
                        <Button type="button" variant="outline">
                            Cancelar
                        </Button>
                    </Link>
                    <Button
                        type="submit"
                        disabled={processing || data.files.length === 0}
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
