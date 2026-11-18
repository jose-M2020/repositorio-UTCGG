import type { RepositoryFormErrors } from '../../shared/types';
import { RepositoryKeywordsPicker } from './RepositoryKeywordsPicker';

type RepositoryCreateStepSettingsProps = {
    errors: RepositoryFormErrors;
    isActive: boolean;
};

export const RepositoryCreateStepSettings = ({
    errors,
    isActive,
}: RepositoryCreateStepSettingsProps) => {
    return (
        <section
            className="space-y-4"
            aria-hidden={!isActive}
            hidden={!isActive}
        >
            <div>
                <h2 className="text-lg font-semibold text-secondary">
                    Configuración
                </h2>
                <p className="text-sm text-muted-foreground">
                    Ajusta la visibilidad y las palabras clave de búsqueda.
                </p>
            </div>

            <fieldset className="space-y-3">
                <legend className="text-sm font-medium">Visibilidad</legend>

                <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <input
                        type="radio"
                        name="visibility"
                        value="private"
                        defaultChecked
                        className="mt-1 accent-primary"
                    />
                    <span>
                        Privado
                        <small className="block text-muted-foreground">
                            El acceso al repositorio será restringido
                        </small>
                    </span>
                </label>

                <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <input
                        type="radio"
                        name="visibility"
                        value="public"
                        className="mt-1 accent-primary"
                    />
                    <span>
                        Público
                        <small className="block text-muted-foreground">
                            El repositorio será visible para todo el público
                        </small>
                    </span>
                </label>
            </fieldset>

            {errors.visibility ? (
                <p className="text-sm text-destructive">{errors.visibility}</p>
            ) : null}

            <RepositoryKeywordsPicker
                error={errors.keywords}
                required={isActive}
            />
        </section>
    );
};
