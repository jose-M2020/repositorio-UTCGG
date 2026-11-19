import { InputField, TextareaField } from "@/shared/components/form";
import type { RepositoryFormErrors } from "../../../shared/types";

type RepositoryCreateStepRepositoryProps = {
    errors: RepositoryFormErrors;
    isActive: boolean;
};

export const RepositoryCreateStepRepository = ({
    errors,
    isActive,
}: RepositoryCreateStepRepositoryProps) => {
    return (
        <section
            className="animate-in fade-in slide-in-from-right-2 space-y-6 duration-300"
            aria-hidden={!isActive}
            hidden={!isActive}
        >
            <div>
                <h2 className="text-lg font-semibold text-foreground">
                    Información del repositorio
                </h2>
                <p className="text-[0.8rem] text-muted-foreground">
                    Define el nombre y la descripción del repositorio.
                </p>
            </div>

            <InputField
                id="title"
                name="title"
                label="Nombre del repositorio"
                required={isActive}
                error={errors.title}
            />

            <TextareaField
                id="description"
                name="description"
                label="Descripción"
                required={isActive}
                rows={4}
                error={errors.description}
            />
        </section>
    );
};
