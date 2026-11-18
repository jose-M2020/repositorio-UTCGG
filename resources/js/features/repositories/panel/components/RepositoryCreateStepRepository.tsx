import { Input, Textarea } from '@/shared/components/ui';
import type { RepositoryFormErrors } from '../../shared/types';

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

            <div className="space-y-2">
                <label
                    htmlFor="title"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Nombre del repositorio
                </label>
                <Input
                    id="title"
                    name="title"
                    required={isActive}
                    aria-invalid={Boolean(errors.title)}
                />
                {errors.title ? (
                    <p className="text-[0.8rem] font-medium text-destructive">
                        {errors.title}
                    </p>
                ) : null}
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="description"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Descripción
                </label>
                <Textarea
                    id="description"
                    name="description"
                    required={isActive}
                    rows={4}
                    aria-invalid={Boolean(errors.description)}
                />
                {errors.description ? (
                    <p className="text-[0.8rem] font-medium text-destructive">
                        {errors.description}
                    </p>
                ) : null}
            </div>
        </section>
    );
};
