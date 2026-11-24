import { useState } from 'react';
import {
  InputField,
  SelectField,
  TextareaField,
} from '@/shared/components/form';
import { ProjectPeriodField } from './ProjectPeriodField';
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

const mapOptions = (options: Record<string, string>, withCode = false) =>
  Object.entries(options).map(([code, label]) => ({
    value: code,
    label: withCode ? `${code} — ${label}` : label,
  }));

export const RepositoryFormFields = ({
  errors,
  defaults,
  lookups,
}: RepositoryFormFieldsProps) => {
  const [projectType, setProjectType] = useState(defaults?.project_type ?? '');
  const projectMeta = lookups.project_types_meta?.find(
    (item) => item.code === projectType,
  );
  const showsAdvisorNote =
    Boolean(projectMeta?.requires_academic_advisor) ||
    Boolean(projectMeta?.requires_business_advisor);

  return (
    <div className="space-y-4">
      <InputField
        id="title"
        name="title"
        label="Nombre del repositorio"
        required
        defaultValue={defaults?.title}
        error={errors.title}
      />

      <TextareaField
        id="description"
        name="description"
        label="Descripción"
        required
        rows={4}
        defaultValue={defaults?.description}
        error={errors.description}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField
          id="project_type"
          name="project_type"
          label="Tipo de proyecto"
          required
          defaultValue={defaults?.project_type ?? ''}
          error={errors.project_type}
          placeholder="Selecciona"
          options={mapOptions(lookups.project_types)}
          onValueChange={(value) => setProjectType(value ?? '')}
        />

        <SelectField
          id="academic_degree"
          name="academic_degree"
          label="Nivel"
          required
          defaultValue={defaults?.academic_degree ?? ''}
          error={errors.academic_degree}
          placeholder="Selecciona"
          options={mapOptions(lookups.education_levels)}
        />
      </div>

      <ProjectPeriodField
        lookups={lookups}
        projectTypeCode={projectType}
        defaultPeriodId={defaults?.project_period_id}
        error={errors.project_period_id}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField
          id="career"
          name="career"
          label="Carrera"
          required
          defaultValue={defaults?.career ?? ''}
          error={errors.career}
          placeholder="Selecciona"
          options={mapOptions(lookups.careers, true)}
        />

        <InputField
          id="generation"
          name="generation"
          label="Generación"
          required
          defaultValue={defaults?.generation}
          error={errors.generation}
        />
      </div>

      <InputField
        id="keywords"
        name="keywords"
        label="Palabras clave"
        required
        defaultValue={defaults?.keywords}
        error={errors.keywords}
      />

      {showsAdvisorNote ? (
        <p className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
          Los asesores academicos y empresariales se gestionan desde el panel
          del repositorio (buscar, registrar o actualizar afiliacion).
        </p>
      ) : null}

      <SelectField
        id="visibility"
        name="visibility"
        label="Visibilidad"
        required
        defaultValue={defaults?.visibility ?? 'private'}
        error={errors.visibility}
        options={[
          { value: 'private', label: 'Privado' },
          { value: 'public', label: 'Público' },
        ]}
      />
    </div>
  );
};
