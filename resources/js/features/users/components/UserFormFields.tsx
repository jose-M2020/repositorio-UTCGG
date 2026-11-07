import { Input } from '@/shared/components/ui';
import type {
    CareerFormPolicy,
    RoleOption,
    UserFormErrors,
} from '../types';

type UserFormFieldsProps = {
    errors: UserFormErrors;
    roles: RoleOption[];
    careers: Record<string, string>;
    careerPolicy: CareerFormPolicy;
    defaults?: {
        nombre?: string;
        apellido?: string;
        email?: string;
        carrera?: string;
        rol?: string | null;
    };
    requirePassword: boolean;
};

export const UserFormFields = ({
    errors,
    roles,
    careers,
    careerPolicy,
    defaults,
    requirePassword,
}: UserFormFieldsProps) => {
    const lockedCareer =
        careerPolicy.locked_career ?? defaults?.carrera ?? '';
    const careerValue = careerPolicy.can_select_career
        ? (defaults?.carrera ?? '')
        : lockedCareer;

    return (
        <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                    <label
                        htmlFor="nombre"
                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                        Nombre
                    </label>
                    <Input
                        id="nombre"
                        name="nombre"
                        required
                        defaultValue={defaults?.nombre}
                        aria-invalid={Boolean(errors.nombre)}
                    />
                    {errors.nombre ? (
                        <p className="text-sm text-red-600">{errors.nombre}</p>
                    ) : null}
                </div>

                <div className="space-y-1">
                    <label
                        htmlFor="apellido"
                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                        Apellido
                    </label>
                    <Input
                        id="apellido"
                        name="apellido"
                        required
                        defaultValue={defaults?.apellido}
                        aria-invalid={Boolean(errors.apellido)}
                    />
                    {errors.apellido ? (
                        <p className="text-sm text-red-600">{errors.apellido}</p>
                    ) : null}
                </div>
            </div>

            <div className="space-y-1">
                <label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                    Correo
                </label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    defaultValue={defaults?.email}
                    aria-invalid={Boolean(errors.email)}
                />
                {errors.email ? (
                    <p className="text-sm text-red-600">{errors.email}</p>
                ) : null}
            </div>

            <div className="space-y-1">
                <label
                    htmlFor="carrera"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                    Carrera
                </label>
                {careerPolicy.can_select_career ? (
                    <select
                        id="carrera"
                        name="carrera"
                        required
                        defaultValue={careerValue}
                        className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
                        aria-invalid={Boolean(errors.carrera)}
                    >
                        <option value="" disabled>
                            Selecciona una carrera
                        </option>
                        {Object.entries(careers).map(([code, label]) => (
                            <option key={code} value={code}>
                                {code} — {label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <>
                        <input type="hidden" name="carrera" value={lockedCareer} />
                        <Input
                            id="carrera"
                            value={
                                careerPolicy.locked_career_label ??
                                lockedCareer ??
                                'Sin carrera asignada'
                            }
                            readOnly
                            aria-readonly="true"
                            aria-invalid={Boolean(errors.carrera)}
                        />
                        <p className="text-xs text-muted-foreground">
                            La carrera se asigna automáticamente según tu rol.
                        </p>
                    </>
                )}
                {errors.carrera ? (
                    <p className="text-sm text-red-600">{errors.carrera}</p>
                ) : null}
            </div>

            <div className="space-y-1">
                <label
                    htmlFor="rol"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                    Rol
                </label>
                <select
                    id="rol"
                    name="rol"
                    required
                    defaultValue={defaults?.rol ?? ''}
                    className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
                    aria-invalid={Boolean(errors.rol)}
                >
                    <option value="" disabled>
                        Selecciona un rol
                    </option>
                    {roles.map((role) => (
                        <option key={role.value} value={role.value}>
                            {role.label}
                        </option>
                    ))}
                </select>
                {errors.rol ? (
                    <p className="text-sm text-red-600">{errors.rol}</p>
                ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                    <label
                        htmlFor="password"
                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                        {requirePassword
                            ? 'Contraseña'
                            : 'Contraseña (opcional)'}
                    </label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        required={requirePassword}
                        autoComplete="new-password"
                        aria-invalid={Boolean(errors.password)}
                    />
                    {errors.password ? (
                        <p className="text-sm text-red-600">{errors.password}</p>
                    ) : null}
                </div>

                <div className="space-y-1">
                    <label
                        htmlFor="password_confirmation"
                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                        Confirmar contraseña
                    </label>
                    <Input
                        id="password_confirmation"
                        name="password_confirmation"
                        type="password"
                        required={requirePassword}
                        autoComplete="new-password"
                    />
                </div>
            </div>
        </div>
    );
};
