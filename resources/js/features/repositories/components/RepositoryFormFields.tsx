import { Input } from '@/shared/components/ui';
import type { Repository, RepositoryFormErrors } from '../types';

type RepositoryFormFieldsProps = {
    errors: RepositoryFormErrors;
    defaults?: Partial<Repository> & { visibilidad?: string };
};

export const RepositoryFormFields = ({
    errors,
    defaults,
}: RepositoryFormFieldsProps) => {
    return (
        <div className="space-y-4">
            <div className="space-y-1">
                <label htmlFor="nombre_rep" className="text-sm font-medium">
                    Nombre del repositorio
                </label>
                <Input
                    id="nombre_rep"
                    name="nombre_rep"
                    required
                    defaultValue={defaults?.nombre_rep}
                    aria-invalid={Boolean(errors.nombre_rep)}
                />
                {errors.nombre_rep ? (
                    <p className="text-sm text-red-600">{errors.nombre_rep}</p>
                ) : null}
            </div>

            <div className="space-y-1">
                <label htmlFor="descripcion" className="text-sm font-medium">
                    Descripción
                </label>
                <textarea
                    id="descripcion"
                    name="descripcion"
                    required
                    rows={4}
                    defaultValue={defaults?.descripcion}
                    className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
                    aria-invalid={Boolean(errors.descripcion)}
                />
                {errors.descripcion ? (
                    <p className="text-sm text-red-600">{errors.descripcion}</p>
                ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                    <label htmlFor="tipo_proyecto" className="text-sm font-medium">
                        Tipo de proyecto
                    </label>
                    <select
                        id="tipo_proyecto"
                        name="tipo_proyecto"
                        required
                        defaultValue={defaults?.tipo_proyecto ?? ''}
                        className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm dark:bg-input/30"
                    >
                        <option value="" disabled>
                            Selecciona
                        </option>
                        <option value="Estadía">Estadía</option>
                        <option value="Proyecto">Proyecto</option>
                        <option value="Investigación">Investigación</option>
                    </select>
                    {errors.tipo_proyecto ? (
                        <p className="text-sm text-red-600">
                            {errors.tipo_proyecto}
                        </p>
                    ) : null}
                </div>

                <div className="space-y-1">
                    <label
                        htmlFor="nivel_proyecto"
                        className="text-sm font-medium"
                    >
                        Nivel
                    </label>
                    <select
                        id="nivel_proyecto"
                        name="nivel_proyecto"
                        required
                        defaultValue={defaults?.nivel_proyecto ?? ''}
                        className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm dark:bg-input/30"
                    >
                        <option value="" disabled>
                            Selecciona
                        </option>
                        <option value="TSU">TSU</option>
                        <option value="Ingeniería">Ingeniería</option>
                    </select>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                    <label htmlFor="carrera" className="text-sm font-medium">
                        Carrera
                    </label>
                    <Input
                        id="carrera"
                        name="carrera"
                        required
                        defaultValue={defaults?.carrera}
                    />
                </div>
                <div className="space-y-1">
                    <label htmlFor="generacion" className="text-sm font-medium">
                        Generación
                    </label>
                    <Input
                        id="generacion"
                        name="generacion"
                        required
                        defaultValue={defaults?.generacion}
                    />
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                    <label htmlFor="empresa" className="text-sm font-medium">
                        Empresa
                    </label>
                    <Input
                        id="empresa"
                        name="empresa"
                        required
                        defaultValue={defaults?.empresa}
                    />
                </div>
                <div className="space-y-1">
                    <label
                        htmlFor="asesor_externo"
                        className="text-sm font-medium"
                    >
                        Asesor externo
                    </label>
                    <Input
                        id="asesor_externo"
                        name="asesor_externo"
                        defaultValue={defaults?.asesor_externo ?? ''}
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label htmlFor="palabras_clave" className="text-sm font-medium">
                    Palabras clave
                </label>
                <Input
                    id="palabras_clave"
                    name="palabras_clave"
                    required
                    defaultValue={defaults?.palabras_clave}
                />
            </div>

            <div className="space-y-1">
                <label htmlFor="visibilidad" className="text-sm font-medium">
                    Visibilidad
                </label>
                <select
                    id="visibilidad"
                    name="visibilidad"
                    required
                    defaultValue={defaults?.visibilidad ?? 'privado'}
                    className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm dark:bg-input/30"
                >
                    <option value="privado">Privado</option>
                    <option value="publico">Público</option>
                </select>
            </div>

        </div>
    );
};
