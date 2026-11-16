import { useState, type ChangeEvent } from "react";
import { Input } from "@/shared/components/ui";
import type {
  CareerFormPolicy,
  RoleOption,
  UserFormErrors,
  UserTypeOption,
} from "../types";

type UserFormFieldsProps = {
  errors: UserFormErrors;
  roles: RoleOption[];
  careers: Record<string, string>;
  careerPolicy: CareerFormPolicy;
  userTypes?: UserTypeOption[];
  defaults?: {
    first_name?: string;
    last_name?: string;
    second_last_name?: string | null;
    email?: string;
    phone?: string | null;
    career?: string;
    role?: string | null;
    user_type?: string | null;
    student_number?: string | null;
    employee_number?: string | null;
    job_title?: string | null;
  };
  includeRole?: boolean;
  userTypeReadOnly?: boolean;
};

const defaultRoleForType = (userType: string): string => {
  if (userType === "student") {
    return "student";
  }

  if (userType === "teacher") {
    return "teacher";
  }

  return "";
};

export const UserFormFields = ({
  errors,
  roles,
  careers,
  careerPolicy,
  userTypes = [],
  defaults,
  includeRole = true,
  userTypeReadOnly = false,
}: UserFormFieldsProps) => {
  const [selectedUserType, setSelectedUserType] = useState(
    defaults?.user_type ?? "",
  );
  const [selectedRole, setSelectedRole] = useState(defaults?.role ?? "");

  const effectiveRole = includeRole ? selectedRole : (defaults?.role ?? "");
  const selectedRoleOption = roles.find((role) => role.value === effectiveRole);
  const showCareerField =
    careerPolicy.can_select_career &&
    (selectedUserType === "student" ||
      selectedUserType === "teacher" ||
      Boolean(selectedRoleOption?.requires_career));

  const handleUserTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextType = event.target.value;
    setSelectedUserType(nextType);

    if (!includeRole) {
      return;
    }

    const preferredRole = defaultRoleForType(nextType);
    if (
      preferredRole &&
      roles.some((role) => role.value === preferredRole)
    ) {
      setSelectedRole(preferredRole);
    }
  };

  const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };

  return (
    <div className="space-y-4">
      {userTypes.length > 0 ? (
        <div className="space-y-1">
          <label
            htmlFor="user_type"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Tipo de usuario
          </label>
          {userTypeReadOnly ? (
            <>
              <Input
                id="user_type_label"
                readOnly
                value={
                  userTypes.find((type) => type.value === selectedUserType)
                    ?.label ?? selectedUserType
                }
              />
              <input type="hidden" name="user_type" value={selectedUserType} />
            </>
          ) : (
            <select
              id="user_type"
              name="user_type"
              required
              value={selectedUserType}
              onChange={handleUserTypeChange}
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
              aria-invalid={Boolean(errors.user_type)}
            >
              <option value="" disabled>
                Selecciona un tipo
              </option>
              {userTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          )}
          {errors.user_type ? (
            <p className="text-sm text-red-600">{errors.user_type}</p>
          ) : null}
        </div>
      ) : null}

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

      <div className="space-y-1">
        <label
          htmlFor="phone"
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Teléfono
        </label>
        <Input
          id="phone"
          name="phone"
          defaultValue={defaults?.phone ?? ""}
          aria-invalid={Boolean(errors.phone)}
        />
        {errors.phone ? (
          <p className="text-sm text-red-600">{errors.phone}</p>
        ) : null}
      </div>

      {selectedUserType === "student" ? (
        <div className="space-y-1">
          <label
            htmlFor="student_number"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Matrícula
          </label>
          <Input
            id="student_number"
            name="student_number"
            defaultValue={defaults?.student_number ?? ""}
            aria-invalid={Boolean(errors.student_number)}
          />
          {errors.student_number ? (
            <p className="text-sm text-red-600">{errors.student_number}</p>
          ) : null}
          <input type="hidden" name="academic_status" value="active" />
        </div>
      ) : null}

      {selectedUserType === "teacher" ? (
        <div className="space-y-1">
          <label
            htmlFor="employee_number"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Número de empleado
          </label>
          <Input
            id="employee_number"
            name="employee_number"
            defaultValue={defaults?.employee_number ?? ""}
            aria-invalid={Boolean(errors.employee_number)}
          />
          {errors.employee_number ? (
            <p className="text-sm text-red-600">{errors.employee_number}</p>
          ) : null}
        </div>
      ) : null}

      {selectedUserType === "staff" ? (
        <div className="space-y-1">
          <label
            htmlFor="job_title"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Puesto
          </label>
          <Input
            id="job_title"
            name="job_title"
            defaultValue={defaults?.job_title ?? ""}
            aria-invalid={Boolean(errors.job_title)}
          />
          {errors.job_title ? (
            <p className="text-sm text-red-600">{errors.job_title}</p>
          ) : null}
        </div>
      ) : null}

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
