import { useState, type ChangeEvent } from "react";
import { Input } from "@/shared/components/ui";
import type {
  CareerFormPolicy,
  RoleOption,
  UserFormErrors,
} from "../types";

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
  includeRole?: boolean;
  includePassword?: boolean;
  requirePassword?: boolean;
};

export const UserFormFields = ({
  errors,
  roles,
  careers,
  careerPolicy,
  defaults,
  includeRole = true,
  includePassword = false,
  requirePassword = false,
}: UserFormFieldsProps) => {
  const [selectedRole, setSelectedRole] = useState(defaults?.rol ?? "");

  const effectiveRole = includeRole ? selectedRole : (defaults?.rol ?? "");
  const selectedRoleOption = roles.find((role) => role.value === effectiveRole);
  const showCareerField =
    careerPolicy.can_select_career &&
    Boolean(selectedRoleOption?.requires_career);

  const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };

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

      {includeRole ? (
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
            value={selectedRole}
            onChange={handleRoleChange}
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
      ) : null}

      {showCareerField ? (
        <div className="space-y-1">
          <label
            htmlFor="carrera"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Carrera
          </label>
          <select
            id="carrera"
            name="carrera"
            required
            defaultValue={defaults?.carrera ?? ""}
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
          {errors.carrera ? (
            <p className="text-sm text-red-600">{errors.carrera}</p>
          ) : null}
        </div>
      ) : null}

      {includePassword ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              {requirePassword ? "Contraseña" : "Contraseña (opcional)"}
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
      ) : null}
    </div>
  );
};
