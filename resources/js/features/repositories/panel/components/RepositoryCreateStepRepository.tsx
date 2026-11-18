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
            className="space-y-4"
            aria-hidden={!isActive}
            hidden={!isActive}
        >
            <div>
                <h2 className="text-lg font-semibold text-secondary">
                    Información del repositorio
                </h2>
                <p className="text-sm text-muted-foreground">
                    Define el nombre y la descripción del repositorio.
                </p>
            </div>

            <div className="space-y-1">
                <label htmlFor="title" className="text-sm font-medium">
                    Nombre del repositorio
                </label>
                <Input
                    id="title"
                    name="title"
                    required={isActive}
                    aria-invalid={Boolean(errors.title)}
                />
                {errors.title ? (
                    <p className="text-sm text-destructive">{errors.title}</p>
                ) : null}
            </div>

            <div className="space-y-1">
                <label htmlFor="description" className="text-sm font-medium">
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
                    <p className="text-sm text-destructive">
                        {errors.description}
                    </p>
                ) : null}
            </div>
        </section>
    );
};
