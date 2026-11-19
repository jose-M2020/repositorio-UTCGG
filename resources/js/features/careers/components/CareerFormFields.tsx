import { useState } from "react";
import {
    FileUploadField,
    FormField,
    InputField,
    SelectField,
    TextareaField,
    fieldDescribedBy,
} from "@/shared/components/form";
import { Input } from "@/shared/components/ui";
import type { CareerFormErrors, CareerFormValues } from "../types";

type CareerFormFieldsProps = {
    errors: CareerFormErrors;
    defaults?: CareerFormValues;
    isEdit?: boolean;
};

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

    const codeHint = isEdit
        ? "El codigo no se puede cambiar despues de crear la carrera."
        : undefined;

    return (
        <div className="grid gap-4 sm:grid-cols-2">
            <FormField
                id="code"
                label="Codigo"
                error={errors.code}
                hint={codeHint}
            >
                {isEdit ? (
                    <Input
                        id="code"
                        readOnly
                        value={defaults?.code ?? ""}
                        className="bg-muted"
                        aria-describedby={fieldDescribedBy("code", {
                            error: errors.code,
                            hint: codeHint,
                        })}
                    />
                ) : (
                    <Input
                        id="code"
                        name="code"
                        required
                        defaultValue={defaults?.code}
                        aria-invalid={Boolean(errors.code) || undefined}
                        aria-describedby={fieldDescribedBy("code", {
                            error: errors.code,
                        })}
                    />
                )}
            </FormField>

            <InputField
                id="name"
                name="name"
                label="Nombre"
                required
                defaultValue={defaults?.name}
                error={errors.name}
            />

            <TextareaField
                id="description"
                name="description"
                label="Descripcion"
                rows={3}
                defaultValue={defaults?.description}
                error={errors.description}
                fieldClassName="sm:col-span-2"
            />

            <InputField
                id="sort_order"
                name="sort_order"
                label="Orden"
                type="number"
                min={0}
                required
                defaultValue={defaults?.sort_order ?? 0}
                error={errors.sort_order}
            />

            <SelectField
                id="show_on_home"
                name="show_on_home"
                label="Mostrar en inicio"
                defaultValue={defaults?.show_on_home ? "1" : "0"}
                error={errors.show_on_home}
                options={[
                    { value: "1", label: "Si" },
                    { value: "0", label: "No" },
                ]}
            />

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
