import { InputField, TextareaField } from "@/shared/components/form";
import type { RepositoryFormErrors, RepositoryOrganizationDefaults } from "../types";

type RepositoryOrganizationFieldsProps = {
    errors: RepositoryFormErrors;
    defaults?: RepositoryOrganizationDefaults;
    requiredAdvisor?: boolean;
};

export const RepositoryOrganizationFields = ({
    errors,
    defaults,
    requiredAdvisor = false,
}: RepositoryOrganizationFieldsProps) => {
    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">Empresa</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                    <InputField
                        id="company_name"
                        name="company[name]"
                        label="Nombre de la empresa"
                        defaultValue={defaults?.company?.name ?? ""}
                        error={errors["company.name"] ?? errors.company}
                    />
                    <InputField
                        id="company_rfc"
                        name="company[rfc]"
                        label="RFC"
                        defaultValue={defaults?.company?.rfc ?? ""}
                        error={errors["company.rfc"]}
                    />
                    <InputField
                        id="company_sector"
                        name="company[sector]"
                        label="Sector"
                        defaultValue={defaults?.company?.sector ?? ""}
                        error={errors["company.sector"]}
                    />
                    <InputField
                        id="company_phone"
                        name="company[phone]"
                        label="Telefono"
                        defaultValue={defaults?.company?.phone ?? ""}
                        error={errors["company.phone"]}
                    />
                    <InputField
                        id="company_email"
                        name="company[email]"
                        label="Correo"
                        type="email"
                        defaultValue={defaults?.company?.email ?? ""}
                        error={errors["company.email"]}
                    />
                    <InputField
                        id="company_address_street_line"
                        name="company[address][street_line]"
                        label="Calle y numero"
                        defaultValue={defaults?.company?.address?.street_line ?? ""}
                        error={errors["company.address.street_line"]}
                        fieldClassName="sm:col-span-2"
                    />
                    <InputField
                        id="company_address_street_line_2"
                        name="company[address][street_line_2]"
                        label="Interior / complemento"
                        defaultValue={
                            defaults?.company?.address?.street_line_2 ?? ""
                        }
                        error={errors["company.address.street_line_2"]}
                    />
                    <InputField
                        id="company_address_neighborhood"
                        name="company[address][neighborhood]"
                        label="Colonia"
                        defaultValue={
                            defaults?.company?.address?.neighborhood ?? ""
                        }
                        error={errors["company.address.neighborhood"]}
                    />
                    <InputField
                        id="company_address_city"
                        name="company[address][city]"
                        label="Ciudad"
                        defaultValue={defaults?.company?.address?.city ?? ""}
                        error={errors["company.address.city"]}
                    />
                    <InputField
                        id="company_address_state"
                        name="company[address][state]"
                        label="Estado"
                        defaultValue={defaults?.company?.address?.state ?? ""}
                        error={errors["company.address.state"]}
                    />
                    <InputField
                        id="company_address_postal_code"
                        name="company[address][postal_code]"
                        label="Codigo postal"
                        defaultValue={
                            defaults?.company?.address?.postal_code ?? ""
                        }
                        error={errors["company.address.postal_code"]}
                    />
                    <InputField
                        id="company_address_country"
                        name="company[address][country]"
                        label="Pais (ISO)"
                        defaultValue={
                            defaults?.company?.address?.country ?? "MX"
                        }
                        error={errors["company.address.country"]}
                    />
                    <InputField
                        id="company_address_references"
                        name="company[address][references]"
                        label="Referencias"
                        defaultValue={
                            defaults?.company?.address?.references ?? ""
                        }
                        error={errors["company.address.references"]}
                        fieldClassName="sm:col-span-2"
                    />
                    <TextareaField
                        id="company_notes"
                        name="company[notes]"
                        label="Notas de la empresa"
                        rows={2}
                        defaultValue={defaults?.company?.notes ?? ""}
                        error={errors["company.notes"]}
                        fieldClassName="sm:col-span-2"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">
                    Asesor empresarial
                </h3>
                <div className="grid gap-4 sm:grid-cols-3">
                    <InputField
                        id="business_advisor_first_name"
                        name="business_advisor[first_name]"
                        label="Nombre"
                        required={requiredAdvisor}
                        defaultValue={defaults?.business_advisor?.first_name ?? ""}
                        error={errors["business_advisor.first_name"]}
                    />
                    <InputField
                        id="business_advisor_last_name"
                        name="business_advisor[last_name]"
                        label="Apellido paterno"
                        required={requiredAdvisor}
                        defaultValue={defaults?.business_advisor?.last_name ?? ""}
                        error={errors["business_advisor.last_name"]}
                    />
                    <InputField
                        id="business_advisor_second_last_name"
                        name="business_advisor[second_last_name]"
                        label="Apellido materno"
                        defaultValue={
                            defaults?.business_advisor?.second_last_name ?? ""
                        }
                        error={errors["business_advisor.second_last_name"]}
                    />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <InputField
                        id="business_advisor_email"
                        name="business_advisor[email]"
                        label="Correo"
                        type="email"
                        defaultValue={defaults?.business_advisor?.email ?? ""}
                        error={errors["business_advisor.email"]}
                    />
                    <InputField
                        id="business_advisor_phone"
                        name="business_advisor[phone]"
                        label="Telefono"
                        defaultValue={defaults?.business_advisor?.phone ?? ""}
                        error={errors["business_advisor.phone"]}
                    />
                    <InputField
                        id="business_advisor_job_title"
                        name="business_advisor[job_title]"
                        label="Puesto"
                        defaultValue={defaults?.business_advisor?.job_title ?? ""}
                        error={errors["business_advisor.job_title"]}
                    />
                    <InputField
                        id="business_advisor_department"
                        name="business_advisor[department]"
                        label="Area / departamento"
                        defaultValue={defaults?.business_advisor?.department ?? ""}
                        error={errors["business_advisor.department"]}
                    />
                    <TextareaField
                        id="business_advisor_notes"
                        name="business_advisor[notes]"
                        label="Notas"
                        rows={2}
                        defaultValue={defaults?.business_advisor?.notes ?? ""}
                        error={errors["business_advisor.notes"]}
                        fieldClassName="sm:col-span-2"
                    />
                </div>
            </div>
        </div>
    );
};
