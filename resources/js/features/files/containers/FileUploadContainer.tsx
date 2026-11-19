import { Link, useForm } from "@inertiajs/react";
import type { FormEvent } from "react";
import { store } from "@/actions/App/Http/Controllers/FileController";
import {
    mine,
    showByUser,
} from "@/actions/App/Http/Controllers/RepositoryController";
import { Button } from "@/shared/components/ui";
import { FileUploadField } from "@/shared/components/form";
import type { RepositoryUploadTarget } from "../types";

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
        <main className="page-container space-y-6 py-8">
            <header className="space-y-1">
                <h1 className="text-2xl font-semibold">Subir archivos</h1>
                <p className="text-sm text-muted-foreground">
                    Repositorio: {repository.title}
                </p>
            </header>

            <form
                onSubmit={handleSubmit}
                className="space-y-6 rounded-xl border border-border bg-card p-6"
            >
                <FileUploadField
                    label="Documentos"
                    accept={{
                        "application/pdf": [".pdf"],
                        "application/msword": [".doc"],
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                            [".docx"],
                        "application/zip": [".zip"],
                        "application/vnd.rar": [".rar"],
                        "application/x-rar-compressed": [".rar"],
                    }}
                    maxFiles={5}
                    maxSize={20 * 1024 * 1024}
                    files={data.files}
                    error={errors.files}
                    onFilesChange={(nextFiles) => setData("files", nextFiles)}
                    hint="PDF, DOC, DOCX, ZIP o RAR. Maximo 5 archivos · 20 MB c/u."
                />

                <FileUploadField
                    label="Imagenes (opcional)"
                    accept={{
                        "image/png": [".png"],
                        "image/jpeg": [".jpg", ".jpeg"],
                        "image/svg+xml": [".svg"],
                        "image/webp": [".webp"],
                    }}
                    maxFiles={5}
                    maxSize={5 * 1024 * 1024}
                    files={data.images}
                    error={errors.images}
                    onFilesChange={(nextFiles) => setData("images", nextFiles)}
                    hint="PNG, JPG, SVG o WebP. Maximo 5 imagenes · 5 MB c/u."
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
                        {processing ? "Subiendo..." : "Subir"}
                    </Button>
                </div>
            </form>

            <p className="text-xs text-muted-foreground">
                Tambien puedes volver a{" "}
                <Link href={mine.url()} className="underline underline-offset-2">
                    mis repositorios
                </Link>
                .
            </p>
        </main>
    );
};
