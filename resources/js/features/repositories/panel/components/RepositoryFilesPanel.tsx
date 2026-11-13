import { Form, Link } from "@inertiajs/react";
import {
  create,
  destroy,
  destroyImage,
  download,
  update,
} from "@/actions/App/Http/Controllers/FileController";
import { ConfirmDeleteButton } from "@/shared/components/ConfirmDeleteButton";
import { Button } from "@/shared/components/ui";
import type { RepositoryFileItem } from "../../shared/types";

type RepositoryFilesPanelProps = {
  slug: string;
  files: RepositoryFileItem[];
  imagenes: string[];
  imagenUrls?: string[];
};

export const RepositoryFilesPanel = ({
  slug,
  files,
  imagenes,
  imagenUrls = [],
}: RepositoryFilesPanelProps) => {
  const pdfFiles = files.filter((file) => file.file_type === "pdf" && file.url);

  return (
    <section className="space-y-6 rounded-xl border border-border bg-card p-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-primary">Archivos</h2>
        <Link href={create.url(slug)}>
          <Button type="button">Subir archivos</Button>
        </Link>
      </header>

      {pdfFiles.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-secondary">Documentación</h3>
          {pdfFiles.map((file) => (
            <div key={file.id} className="space-y-2">
              <iframe
                title={file.original_name}
                src={file.url}
                className="h-[600px] w-full rounded-lg border border-border bg-background"
                allowFullScreen
              />
              <p className="text-center text-sm text-muted-foreground">
                {file.original_name}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      {files.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No hay documentos cargados.
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {files.map((file) => (
            <li
              key={file.id}
              className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"
            >
              <div>
                <p className="font-medium">{file.original_name}</p>
                <p className="text-xs text-muted-foreground">
                  {file.file_type} · {file.is_public ? "Público" : "Privado"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a href={download.url(file.id)}>
                  <Button type="button" variant="outline">
                    Descargar
                  </Button>
                </a>
                <Form {...update.form([slug, file.id])}>
                  <input
                    type="hidden"
                    name="is_public"
                    value={file.is_public ? 0 : 1}
                  />
                  <Button type="submit" variant="ghost">
                    {file.is_public ? "Hacer privado" : "Hacer público"}
                  </Button>
                </Form>
                <ConfirmDeleteButton
                  form={destroy.form([slug, file.id])}
                  itemLabel={file.original_name}
                  triggerLabel="Eliminar"
                  triggerSize="default"
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      {imagenes.length > 0 ? (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-secondary">Imágenes</h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {imagenes.map((path, index) => (
              <li
                key={`${path}-${index}`}
                className="overflow-hidden rounded-lg border border-border"
              >
                <img
                  src={imagenUrls[index] || "/img/no-image.jpg"}
                  alt=""
                  className="h-48 w-full object-cover"
                />
                <div className="flex justify-end p-2">
                  <ConfirmDeleteButton
                    form={destroyImage.form([slug, index])}
                    itemLabel={`imagen ${index + 1}`}
                    triggerLabel="Quitar"
                    triggerSize="sm"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
};
