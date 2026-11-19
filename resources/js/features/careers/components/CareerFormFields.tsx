import { useState } from "react";
import { cn } from "cn";
import { Input } from "@/shared/components/ui";
import { FileUploadField } from "@/shared/components/form/FileUploadField";
import type { CareerFormErrors, CareerFormValues } from "../types";

type CareerFormFieldsProps = {
    errors: CareerFormErrors;
    defaults?: CareerFormValues;
    isEdit?: boolean;
};

const textareaClassName = cn(
    "w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30",
);

const IMAGE_ACCEPT = {
    "image/png": [".png"],
    "image/jpeg": [".jpg", ".jpeg"],
    "image/svg+xml": [".svg"],
    "image/webp": [".webp"],
};

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export const CareerFormFields = ({
    errors,
    defaults,
    isEdit = false,
}: CareerFormFieldsProps) => {
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [removeImage, setRemoveImage] = useState(false);

    const handleFilesChange = (nextFiles: File[]) => {
        setImageFiles(nextFiles);
        if (nextFiles.length > 0) {
            setRemoveImage(false);
        }
    };

    const handleExistingRemove = () => {
        setRemoveImage(true);
        setImageFiles([]);
    };

    const existingImage =
        !removeImage && imageFiles.length === 0 && defaults?.image_url
            ? [
                  {
                      id: "current-logo",
                      name: "Logo actual",
                      description: "Imagen guardada",
                      url: defaults.image_url,
                  },
              ]
            : [];

    return (
        <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
                <label htmlFor="code" className="text-sm font-medium">
                    Codigo
                </label>
                {isEdit ? (
                    <Input
                        id="code"
                        readOnly
                        value={defaults?.code ?? ""}
                        className="bg-muted"
                        aria-describedby="career-code-locked-hint"
                    />
                ) : (
                    <Input
                        id="code"
                        name="code"
                        required
                        defaultValue={defaults?.code}
                        aria-invalid={Boolean(errors.code)}
                    />
                )}
                {isEdit ? (
                    <p
                        id="career-code-locked-hint"
                        className="text-xs text-muted-foreground"
                    >
                        El codigo no se puede cambiar despues de crear la carrera.
                    </p>
                ) : null}
                {errors.code ? (
                    <p className="text-sm text-destructive">{errors.code}</p>
                ) : null}
            </div>

            <div className="space-y-1">
                <label htmlFor="name" className="text-sm font-medium">
                    Nombre
                </label>
                <Input
                    id="name"
                    name="name"
                    required
                    defaultValue={defaults?.name}
                    aria-invalid={Boolean(errors.name)}
                />
                {errors.name ? (
                    <p className="text-sm text-destructive">{errors.name}</p>
                ) : null}
            </div>

            <div className="space-y-1 sm:col-span-2">
                <label htmlFor="description" className="text-sm font-medium">
                    Descripcion
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows={3}
                    defaultValue={defaults?.description}
                    aria-invalid={Boolean(errors.description)}
                    className={textareaClassName}
                />
                {errors.description ? (
                    <p className="text-sm text-destructive">{errors.description}</p>
                ) : null}
            </div>

            <div className="space-y-1">
                <label htmlFor="sort_order" className="text-sm font-medium">
                    Orden
                </label>
                <Input
                    id="sort_order"
                    name="sort_order"
                    type="number"
                    min={0}
                    required
                    defaultValue={defaults?.sort_order ?? 0}
                    aria-invalid={Boolean(errors.sort_order)}
                />
                {errors.sort_order ? (
                    <p className="text-sm text-destructive">{errors.sort_order}</p>
                ) : null}
            </div>

            <div className="space-y-1">
                <label htmlFor="show_on_home" className="text-sm font-medium">
                    Mostrar en inicio
                </label>
                <select
                    id="show_on_home"
                    name="show_on_home"
                    defaultValue={defaults?.show_on_home ? "1" : "0"}
                    className="h-8 w-full rounded-lg border border-input bg-card px-2.5 text-sm"
                >
                    <option value="1">Si</option>
                    <option value="0">No</option>
                </select>
                {errors.show_on_home ? (
                    <p className="text-sm text-destructive">{errors.show_on_home}</p>
                ) : null}
            </div>

            <div className="sm:col-span-2">
                <FileUploadField
                    label="Logo de la carrera"
                    name="image"
                    accept={IMAGE_ACCEPT}
                    maxFiles={1}
                    maxSize={MAX_IMAGE_SIZE}
                    files={imageFiles}
                    onFilesChange={handleFilesChange}
                    existing={existingImage}
                    onExistingRemove={
                        isEdit ? handleExistingRemove : undefined
                    }
                    error={errors.image}
                    hint="PNG, JPG, SVG o WebP. Maximo 5 MB."
                    attachmentOrientation="horizontal"
                />
                {removeImage ? (
                    <input type="hidden" name="remove_image" value="1" />
                ) : null}
            </div>
        </div>
    );
};
