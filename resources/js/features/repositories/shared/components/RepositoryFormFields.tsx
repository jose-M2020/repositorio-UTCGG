import { Input } from '@/shared/components/ui';
import type {
    Repository,
    RepositoryFormErrors,
    RepositoryLookups,
} from '../types';

type RepositoryFormFieldsProps = {
    errors: RepositoryFormErrors;
    defaults?: Partial<Repository> & { visibility?: string };
    lookups: RepositoryLookups;
};

export const RepositoryFormFields = ({
    errors,
    defaults,
    lookups,
}: RepositoryFormFieldsProps) => {
    const careerOptions = lookups.careers;
    const typeOptions = lookups.project_types;
    const levelOptions = lookups.education_levels;

    return (
        <div className="space-y-4">
            <div className="space-y-1">
                <label htmlFor="title" className="text-sm font-medium">
                    Nombre del repositorio
                </label>
                <Input
                    id="title"
                    name="title"
                    required
                    defaultValue={defaults?.title}
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
                <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    defaultValue={defaults?.description}
                    className="w-full rounded-lg border border-input bg-card px-2.5 py-2 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    aria-invalid={Boolean(errors.description)}
                />
                {errors.description ? (
                    <p className="text-sm text-destructive">{errors.description}</p>
                ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                    <label htmlFor="project_type" className="text-sm font-medium">
                        Tipo de proyecto
                    </label>
                    <select
                        id="project_type"
                        name="project_type"
                        required
                        defaultValue={defaults?.project_type ?? ''}
                        className="h-8 w-full rounded-lg border border-input bg-card px-2.5 text-sm"
                    >
                        <option value="" disabled>
                            Selecciona
                        </option>
                        {Object.entries(typeOptions).map(([code, label]) => (
                            <option key={code} value={code}>
                                {label}
                            </option>
                        ))}
                    </select>
                    {errors.project_type ? (
                        <p className="text-sm text-destructive">
                            {errors.project_type}
                        </p>
                    ) : null}
                </div>

                <div className="space-y-1">
                    <label
                        htmlFor="academic_degree"
                        className="text-sm font-medium"
                    >
                        Nivel
                    </label>
                    <select
                        id="academic_degree"
                        name="academic_degree"
                        required
                        defaultValue={defaults?.academic_degree ?? ''}
                        className="h-8 w-full rounded-lg border border-input bg-card px-2.5 text-sm"
                    >
                        <option value="" disabled>
                            Selecciona
                        </option>
                        {Object.entries(levelOptions).map(([code, label]) => (
                            <option key={code} value={code}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                    <label htmlFor="career" className="text-sm font-medium">
                        Carrera
                    </label>
                    <select
                        id="career"
                        name="career"
                        required
                        defaultValue={defaults?.career ?? ''}
                        className="h-8 w-full rounded-lg border border-input bg-card px-2.5 text-sm"
                    >
                        <option value="" disabled>
                            Selecciona
                        </option>
                        {Object.entries(careerOptions).map(([code, label]) => (
                            <option key={code} value={code}>
                                {code} — {label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="space-y-1">
                    <label htmlFor="generation" className="text-sm font-medium">
                        Generación
                    </label>
                    <Input
                        id="generation"
                        name="generation"
                        required
                        defaultValue={defaults?.generation}
                    />
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                    <label htmlFor="company" className="text-sm font-medium">
                        Empresa
                    </label>
                    <Input
                        id="company"
                        name="company"
                        defaultValue={defaults?.company ?? ''}
                    />
                </div>
                <div className="space-y-1">
                    <label
                        htmlFor="external_advisor"
                        className="text-sm font-medium"
                    >
                        Asesor externo
                    </label>
                    <Input
                        id="external_advisor"
                        name="external_advisor"
                        defaultValue={defaults?.external_advisor ?? ''}
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label htmlFor="keywords" className="text-sm font-medium">
                    Palabras clave
                </label>
                <Input
                    id="keywords"
                    name="keywords"
                    required
                    defaultValue={defaults?.keywords}
                />
            </div>

            <div className="space-y-1">
                <label htmlFor="visibility" className="text-sm font-medium">
                    Visibilidad
                </label>
                <select
                    id="visibility"
                    name="visibility"
                    required
                    defaultValue={defaults?.visibility ?? 'private'}
                    className="h-8 w-full rounded-lg border border-input bg-card px-2.5 text-sm"
                >
                    <option value="private">Privado</option>
                    <option value="public">Público</option>
                </select>
            </div>
        </div>
    );
};
