import { Input } from '@/shared/components/ui';
import type {
    CatalogFormErrors,
    CatalogFormValues,
    CatalogTypesMap,
} from '../types';

type CatalogFormFieldsProps = {
    errors: CatalogFormErrors;
    catalogTypes: CatalogTypesMap;
    defaults?: CatalogFormValues;
};

export const CatalogFormFields = ({
    errors,
    catalogTypes,
    defaults,
}: CatalogFormFieldsProps) => {
    const selectedType = defaults?.type ?? 'career';
    const showCareerMeta = selectedType === 'career';

    return (
        <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                    <label htmlFor="type" className="text-sm font-medium">
                        Tipo
                    </label>
                    <select
                        id="type"
                        name="type"
                        defaultValue={selectedType}
                        className="h-8 w-full rounded-lg border border-input bg-card px-2.5 text-sm"
                        aria-invalid={Boolean(errors.type)}
                    >
                        {Object.entries(catalogTypes).map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                    {errors.type ? (
                        <p className="text-sm text-destructive">{errors.type}</p>
                    ) : null}
                </div>

                <div className="space-y-1">
                    <label htmlFor="code" className="text-sm font-medium">
                        Codigo
                    </label>
                    <Input
                        id="code"
                        name="code"
                        required
                        defaultValue={defaults?.code}
                        aria-invalid={Boolean(errors.code)}
                    />
                    {errors.code ? (
                        <p className="text-sm text-destructive">{errors.code}</p>
                    ) : null}
                </div>
            </div>

            <div className="space-y-1">
                <label htmlFor="name" className="text-sm font-medium">
                    Nombre
                </label>
                <Input
                    id="name"
                    name="name"
                    required
                    defaultValue={defaults?.name}
                    aria-invalid={Boolean(errors.name)}
                />
                {errors.name ? (
                    <p className="text-sm text-destructive">{errors.name}</p>
                ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                    <label htmlFor="sort_order" className="text-sm font-medium">
                        Orden
                    </label>
                    <Input
                        id="sort_order"
                        name="sort_order"
                        type="number"
                        min={0}
                        required
                        defaultValue={defaults?.sort_order ?? 0}
                        aria-invalid={Boolean(errors.sort_order)}
                    />
                    {errors.sort_order ? (
                        <p className="text-sm text-destructive">
                            {errors.sort_order}
                        </p>
                    ) : null}
                </div>

                <div className="space-y-1">
                    <label htmlFor="is_active" className="text-sm font-medium">
                        Estado
                    </label>
                    <select
                        id="is_active"
                        name="is_active"
                        defaultValue={(defaults?.is_active ?? true) ? '1' : '0'}
                        className="h-8 w-full rounded-lg border border-input bg-card px-2.5 text-sm"
                        aria-invalid={Boolean(errors.is_active)}
                    >
                        <option value="1">Activo</option>
                        <option value="0">Inactivo</option>
                    </select>
                </div>
            </div>

            {showCareerMeta ? (
                <>
                    <div className="space-y-1">
                        <label htmlFor="meta_image" className="text-sm font-medium">
                            Imagen Home
                        </label>
                        <Input
                            id="meta_image"
                            name="meta_image"
                            defaultValue={defaults?.meta.image}
                            placeholder="/img/carrerasBG/TI.jpg"
                            aria-invalid={Boolean(errors.meta_image)}
                        />
                        {errors.meta_image ? (
                            <p className="text-sm text-destructive">
                                {errors.meta_image}
                            </p>
                        ) : null}
                    </div>

                    <div className="space-y-1">
                        <label
                            htmlFor="meta_show_on_home"
                            className="text-sm font-medium"
                        >
                            Mostrar en Home
                        </label>
                        <select
                            id="meta_show_on_home"
                            name="meta_show_on_home"
                            defaultValue={
                                defaults?.meta.show_on_home ? '1' : '0'
                            }
                            className="h-8 w-full rounded-lg border border-input bg-card px-2.5 text-sm"
                        >
                            <option value="1">Si</option>
                            <option value="0">No</option>
                        </select>
                    </div>
                </>
            ) : null}
        </div>
    );
};
