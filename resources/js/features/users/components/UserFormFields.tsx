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
    first_name?: string;
    last_name?: string;
    second_last_name?: string | null;
    email?: string;
    career?: string;
    role?: string | null;
  };
  includeRole?: boolean;
};

export const UserFormFields = ({
  errors,
  roles,
  careers,
  careerPolicy,
  defaults,
  includeRole = true,
}: UserFormFieldsProps) => {
  const [selectedRole, setSelectedRole] = useState(defaults?.role ?? "");

  const effectiveRole = includeRole ? selectedRole : (defaults?.role ?? "");
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
            htmlFor="first_name"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Nombre(s)
          </label>
          <Input
            id="first_name"
            name="first_name"
            required
            defaultValue={defaults?.first_name}
            aria-invalid={Boolean(errors.first_name)}
          />
          {errors.first_name ? (
            <p className="text-sm text-red-600">{errors.first_name}</p>
          ) : null}
        </div>
        <div className="space-y-1">
          <label
            htmlFor="last_name"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Apellido paterno
          </label>
          <Input
            id="last_name"
            name="last_name"
            required
            defaultValue={defaults?.last_name}
            aria-invalid={Boolean(errors.last_name)}
          />
          {errors.last_name ? (
            <p className="text-sm text-red-600">{errors.last_name}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label
            htmlFor="second_last_name"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Apellido materno
          </label>
          <Input
            id="second_last_name"
            name="second_last_name"
            defaultValue={defaults?.second_last_name ?? ""}
            aria-invalid={Boolean(errors.second_last_name)}
          />
          {errors.second_last_name ? (
            <p className="text-sm text-red-600">{errors.second_last_name}</p>
          ) : null}
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
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {includeRole ? (
          <div className="space-y-1">
            <label
              htmlFor="role"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Rol
            </label>
            <select
              id="role"
              name="role"
              required
              value={selectedRole}
              onChange={handleRoleChange}
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
              aria-invalid={Boolean(errors.role)}
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
            {errors.role ? (
              <p className="text-sm text-red-600">{errors.role}</p>
            ) : null}
          </div>
        ) : null}

        {showCareerField ? (
          <div className="space-y-1">
            <label
              htmlFor="career"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Carrera
            </label>
            <select
              id="career"
              name="career"
              required
              defaultValue={defaults?.career ?? ""}
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
              aria-invalid={Boolean(errors.career)}
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
            {errors.career ? (
              <p className="text-sm text-red-600">{errors.career}</p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};
