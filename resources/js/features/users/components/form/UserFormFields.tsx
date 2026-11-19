import { useState } from "react";
import { USER_TYPE, isUserType, type UserType } from "@/shared/types";
import {
    FormField,
    InputField,
    SelectField,
    fieldDescribedBy,
} from "@/shared/components/form";
import { Input } from "@/shared/components/ui";
import type {
    CareerFormPolicy,
    CareerOption,
    RoleOption,
    UserFormErrors,
    UserTypeOption,
} from "../../types";
import { defaultRoleForType } from "../../utils/userTypeDefaults";
import { TeacherCareerPicker } from "./TeacherCareerPicker";

type UserFormFieldsProps = {
    errors: UserFormErrors;
    roles: RoleOption[];
    careers: CareerOption[];
    careerPolicy: CareerFormPolicy;
    userTypes?: UserTypeOption[];
    defaults?: {
        first_name?: string;
        last_name?: string;
        second_last_name?: string | null;
        email?: string;
        phone?: string | null;
        career?: string;
        career_ids?: number[];
        role?: string | null;
        user_type?: UserType | null;
        student_number?: string | null;
        employee_number?: string | null;
        job_title?: string | null;
    };
    includeRole?: boolean;
    userTypeReadOnly?: boolean;
    showUserTypeField?: boolean;
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
    showUserTypeField = true,
}: UserFormFieldsProps) => {
    const [selectedUserType, setSelectedUserType] = useState<UserType | "">(
        defaults?.user_type ?? "",
    );
    const [selectedRole, setSelectedRole] = useState(defaults?.role ?? "");
    const resolvedUserType = selectedUserType || defaults?.user_type || "";

    const effectiveRole = includeRole ? selectedRole : (defaults?.role ?? "");
    const selectedRoleOption = roles.find((role) => role.value === effectiveRole);
    const showCareerField =
        careerPolicy.can_select_career &&
        (resolvedUserType === USER_TYPE.ACADEMIC ||
            resolvedUserType === USER_TYPE.WORKFORCE ||
            Boolean(selectedRoleOption?.requires_career));
    const showTeacherCareers =
        showCareerField && resolvedUserType === USER_TYPE.WORKFORCE;
    const showStudentCareer =
        showCareerField && resolvedUserType !== USER_TYPE.WORKFORCE;
    const careerError =
        errors.careers ?? errors["careers.0.career_id"] ?? errors.career;

    const handleUserTypeChange = (nextValue: string | null) => {
        const nextType =
            nextValue && isUserType(nextValue) ? nextValue : "";
        setSelectedUserType(nextType);

        if (!includeRole || !nextType) {
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

    const handleRoleChange = (nextValue: string | null) => {
        setSelectedRole(nextValue ?? "");
    };

    return (
        <div className="space-y-4">
            {!showUserTypeField && resolvedUserType ? (
                <input type="hidden" name="user_type" value={resolvedUserType} />
            ) : null}

            {showUserTypeField && userTypes.length > 0 ? (
                userTypeReadOnly ? (
                    <FormField
                        id="user_type_label"
                        label="Tipo de usuario"
                        error={errors.user_type}
                    >
                        <Input
                            id="user_type_label"
                            readOnly
                            value={
                                userTypes.find(
                                    (type) => type.value === resolvedUserType,
                                )?.label ?? resolvedUserType
                            }
                            aria-describedby={fieldDescribedBy("user_type_label", {
                                error: errors.user_type,
                            })}
                        />
                        <input
                            type="hidden"
                            name="user_type"
                            value={resolvedUserType}
                        />
                    </FormField>
                ) : (
                    <SelectField
                        id="user_type"
                        name="user_type"
                        label="Tipo de usuario"
                        required
                        value={selectedUserType || null}
                        onValueChange={handleUserTypeChange}
                        error={errors.user_type}
                        placeholder="Selecciona un tipo"
                        options={userTypes.map((type) => ({
                            value: type.value,
                            label: type.label,
                        }))}
                    />
                )
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
                <InputField
                    id="first_name"
                    name="first_name"
                    label="Nombre(s)"
                    required
                    defaultValue={defaults?.first_name}
                    error={errors.first_name}
                />
                <InputField
                    id="last_name"
                    name="last_name"
                    label="Apellido paterno"
                    required
                    defaultValue={defaults?.last_name}
                    error={errors.last_name}
                />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <InputField
                    id="second_last_name"
                    name="second_last_name"
                    label="Apellido materno"
                    defaultValue={defaults?.second_last_name ?? ""}
                    error={errors.second_last_name}
                />
                <InputField
                    id="email"
                    name="email"
                    label="Correo"
                    type="email"
                    required
                    defaultValue={defaults?.email}
                    error={errors.email}
                />
            </div>

            <InputField
                id="phone"
                name="phone"
                label="Teléfono"
                defaultValue={defaults?.phone ?? ""}
                error={errors.phone}
            />

            {resolvedUserType === USER_TYPE.ACADEMIC ? (
                <>
                    <InputField
                        id="student_number"
                        name="student_number"
                        label="Matrícula"
                        defaultValue={defaults?.student_number ?? ""}
                        error={errors.student_number}
                    />
                    <input type="hidden" name="academic_status" value="active" />
                </>
            ) : null}

            {resolvedUserType === USER_TYPE.WORKFORCE ? (
                <InputField
                    id="employee_number"
                    name="employee_number"
                    label="Número de empleado"
                    defaultValue={defaults?.employee_number ?? ""}
                    error={errors.employee_number}
                />
            ) : null}

            {resolvedUserType === USER_TYPE.STAFF ? (
                <InputField
                    id="job_title"
                    name="job_title"
                    label="Puesto"
                    defaultValue={defaults?.job_title ?? ""}
                    error={errors.job_title}
                />
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
                {includeRole ? (
                    <SelectField
                        id="role"
                        name="role"
                        label="Rol"
                        required
                        value={selectedRole || null}
                        onValueChange={handleRoleChange}
                        error={errors.role}
                        placeholder="Selecciona un rol"
                        options={roles.map((role) => ({
                            value: role.value,
                            label: role.label,
                        }))}
                    />
                ) : null}

                {showStudentCareer ? (
                    <SelectField
                        id="career"
                        name="career"
                        label="Carrera"
                        required
                        defaultValue={defaults?.career ?? ""}
                        error={errors.career}
                        placeholder="Selecciona una carrera"
                        options={careers.map((career) => ({
                            value: career.code,
                            label: `${career.code} — ${career.name}`,
                        }))}
                    />
                ) : null}

                {showTeacherCareers ? (
                    <TeacherCareerPicker
                        careers={careers}
                        defaultSelectedIds={defaults?.career_ids ?? []}
                        error={careerError}
                    />
                ) : null}
            </div>
        </div>
    );
};
