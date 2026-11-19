import { InputField } from "@/shared/components/form";
import type { RepositoryFormErrors } from "../../shared/types";

type RepositoryCreateStepOrganizationProps = {
    errors: RepositoryFormErrors;
    isActive: boolean;
};

export const RepositoryCreateStepOrganization = ({
    errors,
    isActive,
}: RepositoryCreateStepOrganizationProps) => {
    return (
        <section
            className="animate-in fade-in slide-in-from-right-2 space-y-6 duration-300"
            aria-hidden={!isActive}
            hidden={!isActive}
        >
            <div>
                <h2 className="text-lg font-semibold text-foreground">
                    Organización
                </h2>
                <p className="text-[0.8rem] text-muted-foreground">
                    Opcional — datos de la empresa o asesor externo. Puedes
                    completarlos después si aún no los tienes.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                <InputField
                    id="company"
                    name="company"
                    label="Nombre de la Empresa/Negocio/Establecimiento"
                    error={errors.company}
                />

                <InputField
                    id="external_advisor"
                    name="external_advisor"
                    label="Nombre del asesor empresarial/externo"
                    error={errors.external_advisor}
                />
            </div>
        </section>
    );
};
