import { LockIcon, GlobeIcon } from 'lucide-react';
import type { RepositoryFormErrors } from '../../../shared/types';
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
      className="animate-in space-y-6 duration-300 fade-in slide-in-from-right-2"
      aria-hidden={!isActive}
      hidden={!isActive}
    >
      <div>
        <h2 className="text-lg font-semibold text-foreground">Configuración</h2>
        <p className="text-[0.8rem] text-muted-foreground">
          Ajusta la visibilidad y las palabras clave de búsqueda.
        </p>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Visibilidad
        </legend>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 text-sm transition-colors hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
            <input
              type="radio"
              name="visibility"
              value="private"
              defaultChecked
              className="mt-1 accent-primary"
            />
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-2 font-medium text-foreground">
                <LockIcon className="size-4 text-muted-foreground" />
                Privado
              </span>
              <span className="text-[0.8rem] text-muted-foreground">
                El acceso al repositorio será restringido
              </span>
            </div>
          </label>

          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 text-sm transition-colors hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
            <input
              type="radio"
              name="visibility"
              value="public"
              className="mt-1 accent-primary"
            />
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-2 font-medium text-foreground">
                <GlobeIcon className="size-4 text-muted-foreground" />
                Público
              </span>
              <span className="text-[0.8rem] text-muted-foreground">
                El repositorio será visible para todo el público
              </span>
            </div>
          </label>
        </div>
      </fieldset>

      {errors.visibility ? (
        <p className="text-[0.8rem] font-medium text-destructive">
          {errors.visibility}
        </p>
      ) : null}

      <RepositoryKeywordsPicker error={errors.keywords} required={isActive} />
    </section>
  );
};
