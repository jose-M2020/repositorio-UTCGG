import { Input } from '@/shared/components/ui';
import type { RepositoryFormErrors } from '../../shared/types';

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
                <div className="space-y-2">
                    <label
                        htmlFor="company"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Nombre de la Empresa/Negocio/Establecimiento
                    </label>
                    <Input
                        id="company"
                        name="company"
                        aria-invalid={Boolean(errors.company)}
                    />
                    {errors.company ? (
                        <p className="text-[0.8rem] font-medium text-destructive">
                            {errors.company}
                        </p>
                    ) : null}
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="external_advisor"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Nombre del asesor empresarial/externo
                    </label>
                    <Input
                        id="external_advisor"
                        name="external_advisor"
                        aria-invalid={Boolean(errors.external_advisor)}
                    />
                    {errors.external_advisor ? (
                        <p className="text-[0.8rem] font-medium text-destructive">
                            {errors.external_advisor}
                        </p>
                    ) : null}
                </div>
            </div>
        </section>
    );
};
