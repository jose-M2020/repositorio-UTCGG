import { useState } from 'react';
import {
    Input,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/components/ui';
import type {
    RepositoryFormErrors,
    RepositoryLookups,
} from '../../shared/types';

type RepositoryCreateStepProjectProps = {
    errors: RepositoryFormErrors;
    isActive: boolean;
    lookups: RepositoryLookups;
    defaultCareer?: string;
};

export const RepositoryCreateStepProject = ({
    errors,
    isActive,
    lookups,
    defaultCareer,
}: RepositoryCreateStepProjectProps) => {
    const careerOptions = lookups.careers;
    const typeOptions = lookups.project_types;
    const levelOptions = lookups.education_levels;

    const resolvedDefaultCareer =
        defaultCareer && defaultCareer in careerOptions ? defaultCareer : null;

    const [projectType, setProjectType] = useState<string | null>(null);
    const [academicDegree, setAcademicDegree] = useState<string | null>(null);
    const [career, setCareer] = useState<string | null>(resolvedDefaultCareer);

    return (
        <section
            className="animate-in fade-in slide-in-from-right-2 space-y-6 duration-300"
            aria-hidden={!isActive}
            hidden={!isActive}
        >
            <div>
                <h2 className="text-lg font-semibold text-foreground">
                    Proyecto
                </h2>
                <p className="text-[0.8rem] text-muted-foreground">
                    Datos académicos y de la organización del proyecto.
                </p>
            </div>

            <input type="hidden" name="project_type" value={projectType ?? ''} />
            <input
                type="hidden"
                name="academic_degree"
                value={academicDegree ?? ''}
            />
            <input type="hidden" name="career" value={career ?? ''} />

            <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                    <label
                        htmlFor="project_type"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Tipo de proyecto
                    </label>
                    <Select
                        value={projectType}
                        onValueChange={setProjectType}
                    >
                        <SelectTrigger
                            id="project_type"
                            className="w-full"
                            aria-invalid={Boolean(errors.project_type)}
                        >
                            <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                            {typeOptions.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {type}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.project_type ? (
                        <p className="text-[0.8rem] font-medium text-destructive">
                            {errors.project_type}
                        </p>
                    ) : null}
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="academic_degree"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Nivel de proyecto
                    </label>
                    <Select
                        value={academicDegree}
                        onValueChange={setAcademicDegree}
                    >
                        <SelectTrigger
                            id="academic_degree"
                            className="w-full"
                            aria-invalid={Boolean(errors.academic_degree)}
                        >
                            <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(levelOptions).map(
                                ([code, label]) => (
                                    <SelectItem key={code} value={code}>
                                        {label}
                                    </SelectItem>
                                ),
                            )}
                        </SelectContent>
                    </Select>
                    {errors.academic_degree ? (
                        <p className="text-[0.8rem] font-medium text-destructive">
                            {errors.academic_degree}
                        </p>
                    ) : null}
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                    <label
                        htmlFor="career"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Carrera
                    </label>
                    <Select value={career} onValueChange={setCareer}>
                        <SelectTrigger
                            id="career"
                            className="w-full"
                            aria-invalid={Boolean(errors.career)}
                        >
                            <SelectValue placeholder="Seleccionar carrera" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(careerOptions).map(
                                ([code, label]) => (
                                    <SelectItem key={code} value={code}>
                                        {label}
                                    </SelectItem>
                                ),
                            )}
                        </SelectContent>
                    </Select>
                    {errors.career ? (
                        <p className="text-[0.8rem] font-medium text-destructive">
                            {errors.career}
                        </p>
                    ) : null}
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="generation"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Generación
                    </label>
                    <Input
                        id="generation"
                        name="generation"
                        required={isActive}
                        aria-invalid={Boolean(errors.generation)}
                    />
                    {errors.generation ? (
                        <p className="text-[0.8rem] font-medium text-destructive">
                            {errors.generation}
                        </p>
                    ) : null}
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                    <label
                        htmlFor="company"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Nombre de la Empresa/Negocio/Establecimiento
                    </label>
                    <Input
                        id="company"
                        name="company"
                        required={isActive}
                        aria-invalid={Boolean(errors.company)}
                    />
                    {errors.company ? (
                        <p className="text-[0.8rem] font-medium text-destructive">
                            {errors.company}
                        </p>
                    ) : null}
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="external_advisor"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Nombre del asesor empresarial/externo
                    </label>
                    <Input
                        id="external_advisor"
                        name="external_advisor"
                        aria-invalid={Boolean(errors.external_advisor)}
                    />
                    {errors.external_advisor ? (
                        <p className="text-[0.8rem] font-medium text-destructive">
                            {errors.external_advisor}
                        </p>
                    ) : null}
                </div>
            </div>
        </section>
    );
};
