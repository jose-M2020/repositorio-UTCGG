import { RepositoryOrganizationFields } from "../../../shared/components/RepositoryOrganizationFields";
import type {
    RepositoryFormErrors,
    RepositoryLookups,
} from "../../../shared/types";

type RepositoryCreateStepOrganizationProps = {
    errors: RepositoryFormErrors;
    isActive: boolean;
    lookups: RepositoryLookups;
    projectTypeCode?: string;
};

export const RepositoryCreateStepOrganization = ({
    errors,
    isActive,
    lookups,
    projectTypeCode = "",
}: RepositoryCreateStepOrganizationProps) => {
    const requiredAdvisor = Boolean(
        lookups.project_types_meta?.find((meta) => meta.code === projectTypeCode)
            ?.requires_business_advisor,
    );

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
                    Datos de la empresa y del asesor empresarial. Puedes
                    completarlos después si aún no los tienes
                    {requiredAdvisor
                        ? ", excepto el asesor (obligatorio para este tipo)."
                        : "."}
                </p>
            </div>

            <RepositoryOrganizationFields
                errors={errors}
                requiredAdvisor={requiredAdvisor && isActive}
            />
        </section>
    );
};
