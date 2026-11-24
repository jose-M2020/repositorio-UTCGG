import { InputField, SelectField } from '@/shared/components/form';
import type { ProjectPeriodItem, ProjectTypeOption } from '../../types';

type ProjectPeriodFormFieldsProps = {
  errors: Record<string, string>;
  projectTypes: ProjectTypeOption[];
  defaults?: Partial<ProjectPeriodItem>;
  isEdit?: boolean;
  defaultAdvisorCapacity: number;
};

export const ProjectPeriodFormFields = ({
  errors,
  projectTypes,
  defaults,
  isEdit = false,
  defaultAdvisorCapacity,
}: ProjectPeriodFormFieldsProps) => {
  return (
    <div className="space-y-4">
      {!isEdit ? (
        <SelectField
          id="project_type_id"
          name="project_type_id"
          label="Tipo de proyecto"
          required
          defaultValue={defaults?.project_type_id?.toString() ?? ''}
          error={errors.project_type_id}
          placeholder="Selecciona"
          options={projectTypes.map((type) => ({
            value: String(type.id),
            label: type.name,
          }))}
        />
      ) : null}

      <InputField
        id="name"
        name="name"
        label="Nombre del periodo"
        required
        defaultValue={defaults?.name}
        error={errors.name}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          id="starts_at"
          name="starts_at"
          label="Inicio"
          type="date"
          required
          defaultValue={defaults?.starts_at}
          error={errors.starts_at}
        />
        <InputField
          id="ends_at"
          name="ends_at"
          label="Fin"
          type="date"
          required
          defaultValue={defaults?.ends_at}
          error={errors.ends_at}
        />
      </div>

      <InputField
        id="advisor_default_capacity"
        name="advisor_default_capacity"
        label="Capacidad por defecto"
        type="number"
        min={1}
        defaultValue={defaults?.advisor_default_capacity ?? ''}
        error={errors.advisor_default_capacity}
        hint={`Si se deja vacio, se usa ${defaultAdvisorCapacity}.`}
      />
    </div>
  );
};
