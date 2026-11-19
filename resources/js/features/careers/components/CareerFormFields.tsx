import { useRef, useState, type ChangeEvent } from "react";
import { cn } from "cn";
import { Input } from "@/shared/components/ui";
import type { CareerFormErrors, CareerFormValues } from "../types";

type CareerFormFieldsProps = {
    errors: CareerFormErrors;
    defaults?: CareerFormValues;
    isEdit?: boolean;
};

const textareaClassName = cn(
    "w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30",
);

export const CareerFormFields = ({
    errors,
    defaults,
    isEdit = false,
}: CareerFormFieldsProps) => {
    const imageInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [removeImage, setRemoveImage] = useState(false);
    const currentImageUrl =
        !removeImage && !previewUrl && defaults?.image_url
            ? defaults.image_url
            : null;
    const displayUrl = previewUrl ?? currentImageUrl;

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;

        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }

        if (!file) {
            setPreviewUrl(null);
            return;
        }

        setRemoveImage(false);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleRemoveImage = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(null);
        setRemoveImage(true);
        if (imageInputRef.current) {
            imageInputRef.current.value = "";
        }
    };

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

            <div className="space-y-2 sm:col-span-2">
                <label htmlFor="image" className="text-sm font-medium">
                    Logo de la carrera
                </label>
                <Input
                    ref={imageInputRef}
                    id="image"
                    name="image"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
                    onChange={handleImageChange}
                    aria-invalid={Boolean(errors.image)}
                />
                <p className="text-xs text-muted-foreground">
                    PNG, JPG, SVG o WebP. Maximo 5 MB.
                </p>
                {displayUrl ? (
                    <div className="flex items-start gap-3">
                        <img
                            src={displayUrl}
                            alt="Vista previa del logo"
                            className="h-20 w-32 rounded-md border border-border object-cover"
                        />
                        {isEdit && !previewUrl ? (
                            <button
                                type="button"
                                className="text-sm text-destructive underline-offset-2 hover:underline"
                                onClick={handleRemoveImage}
                            >
                                Quitar imagen
                            </button>
                        ) : null}
                    </div>
                ) : null}
                {removeImage ? (
                    <input type="hidden" name="remove_image" value="1" />
                ) : null}
                {errors.image ? (
                    <p className="text-sm text-destructive">{errors.image}</p>
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
        </div>
    );
};
