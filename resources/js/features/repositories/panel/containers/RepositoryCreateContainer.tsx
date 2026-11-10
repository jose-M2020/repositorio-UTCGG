import { Form, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/RepositorioController';
import {
    UserSearchPicker,
    type SearchableUser,
} from '@/shared/components';
import { Button, Input } from '@/shared/components/ui';
import type { RepositoryCatalog } from '@/shared/data/catalog';
import { cn } from '@/shared/lib';

type RepositoryCreateContainerProps = {
    catalog: RepositoryCatalog;
};

const steps = [
    { id: 1, title: 'Información del repositorio' },
    { id: 2, title: 'Información del proyecto' },
    { id: 3, title: 'Usuarios / organizaciones' },
] as const;

export const RepositoryCreateContainer = ({
    catalog,
}: RepositoryCreateContainerProps) => {
    const { auth } = usePage().props;
    const currentUser = auth.user;
    const [step, setStep] = useState(1);

    const careerOptions = catalog.careers;
    const typeOptions = catalog.types;
    const levelOptions = catalog.levels;

    const [collaborators, setCollaborators] = useState<SearchableUser[]>(
        currentUser
            ? [
                  {
                      id: currentUser.id,
                      nombre: currentUser.nombre,
                      apellido: currentUser.apellido,
                      email: currentUser.email,
                  },
              ]
            : [],
    );

    const handleNext = () => {
        setStep((current) => Math.min(current + 1, 3));
    };

    const handlePrevious = () => {
        setStep((current) => Math.max(current - 1, 1));
    };

    return (
        <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8">
            <header className="text-center">
                <h1 className="text-2xl font-semibold text-primary">
                    Crear nuevo repositorio
                </h1>
            </header>

            <ol className="mx-auto flex max-w-md items-center justify-between gap-2">
                {steps.map((item) => (
                    <li
                        key={item.id}
                        className={cn(
                            'flex size-10 items-center justify-center rounded-full border text-sm font-semibold',
                            step >= item.id
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-border bg-card text-muted-foreground',
                        )}
                        aria-current={step === item.id ? 'step' : undefined}
                    >
                        {item.id}
                    </li>
                ))}
            </ol>

            <Form
                {...store.form()}
                className="space-y-6 rounded-xl border border-border bg-card p-6"
            >
                {({ errors, processing }) => (
                    <>
                        <section
                            className={cn('space-y-4', step !== 1 && 'hidden')}
                            aria-hidden={step !== 1}
                        >
                            <h2 className="text-lg font-semibold text-secondary">
                                {steps[0].title}
                            </h2>
                            <div className="space-y-1">
                                <label
                                    htmlFor="nombre_rep"
                                    className="text-sm font-medium"
                                >
                                    Nombre del repositorio
                                </label>
                                <Input
                                    id="nombre_rep"
                                    name="nombre_rep"
                                    required={step === 1}
                                />
                                {errors.nombre_rep ? (
                                    <p className="text-sm text-destructive">
                                        {errors.nombre_rep}
                                    </p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label
                                    htmlFor="descripcion"
                                    className="text-sm font-medium"
                                >
                                    Descripción
                                </label>
                                <textarea
                                    id="descripcion"
                                    name="descripcion"
                                    required={step === 1}
                                    rows={4}
                                    className="w-full rounded-lg border border-input bg-card px-2.5 py-2 text-sm"
                                />
                                {errors.descripcion ? (
                                    <p className="text-sm text-destructive">
                                        {errors.descripcion}
                                    </p>
                                ) : null}
                            </div>
                            <div className="space-y-1">
                                <label
                                    htmlFor="palabras_clave"
                                    className="text-sm font-medium"
                                >
                                    Palabras clave de búsqueda
                                </label>
                                <Input
                                    id="palabras_clave"
                                    name="palabras_clave"
                                    required={step === 1}
                                />
                            </div>
                            <fieldset className="space-y-2">
                                <legend className="text-sm font-medium">
                                    Visibilidad
                                </legend>
                                <label className="flex items-start gap-2 text-sm">
                                    <input
                                        type="radio"
                                        name="visibilidad"
                                        value="privado"
                                        defaultChecked
                                        className="mt-1 accent-primary"
                                    />
                                    <span>
                                        Privado
                                        <small className="block text-muted-foreground">
                                            El acceso al repositorio será
                                            restringido
                                        </small>
                                    </span>
                                </label>
                                <label className="flex items-start gap-2 text-sm">
                                    <input
                                        type="radio"
                                        name="visibilidad"
                                        value="publico"
                                        className="mt-1 accent-primary"
                                    />
                                    <span>
                                        Público
                                        <small className="block text-muted-foreground">
                                            El repositorio será visible para
                                            todo el público
                                        </small>
                                    </span>
                                </label>
                            </fieldset>
                            <div className="flex justify-end gap-2">
                                <Link href={index.url()}>
                                    <Button type="button" variant="outline">
                                        Cancelar
                                    </Button>
                                </Link>
                                <Button type="button" onClick={handleNext}>
                                    Siguiente
                                </Button>
                            </div>
                        </section>

                        <section
                            className={cn('space-y-4', step !== 2 && 'hidden')}
                            aria-hidden={step !== 2}
                        >
                            <h2 className="text-lg font-semibold text-secondary">
                                {steps[1].title}
                            </h2>
                            <div className="space-y-1">
                                <label
                                    htmlFor="tipo_proyecto"
                                    className="text-sm font-medium"
                                >
                                    Tipo de proyecto
                                </label>
                                <select
                                    id="tipo_proyecto"
                                    name="tipo_proyecto"
                                    required={step === 2}
                                    defaultValue=""
                                    className="h-8 w-full rounded-lg border border-input bg-card px-2.5 text-sm"
                                >
                                    <option value="" disabled>
                                        Seleccionar
                                    </option>
                                    {typeOptions.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label
                                    htmlFor="nivel_proyecto"
                                    className="text-sm font-medium"
                                >
                                    Nivel de proyecto
                                </label>
                                <select
                                    id="nivel_proyecto"
                                    name="nivel_proyecto"
                                    required={step === 2}
                                    defaultValue=""
                                    className="h-8 w-full rounded-lg border border-input bg-card px-2.5 text-sm"
                                >
                                    <option value="" disabled>
                                        Seleccionar
                                    </option>
                                    {Object.keys(levelOptions).map((code) => (
                                        <option key={code} value={code}>
                                            {code}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label
                                    htmlFor="carrera"
                                    className="text-sm font-medium"
                                >
                                    Carrera
                                </label>
                                <select
                                    id="carrera"
                                    name="carrera"
                                    required={step === 2}
                                    defaultValue={
                                        currentUser?.carrera &&
                                        currentUser.carrera in careerOptions
                                            ? currentUser.carrera
                                            : ''
                                    }
                                    className="h-8 w-full rounded-lg border border-input bg-card px-2.5 text-sm"
                                >
                                    <option value="" disabled>
                                        Seleccionar carrera
                                    </option>
                                    {Object.entries(careerOptions).map(
                                        ([code, label]) => (
                                            <option key={code} value={code}>
                                                {label}
                                            </option>
                                        ),
                                    )}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label
                                    htmlFor="generacion"
                                    className="text-sm font-medium"
                                >
                                    Generación
                                </label>
                                <Input
                                    id="generacion"
                                    name="generacion"
                                    required={step === 2}
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handlePrevious}
                                >
                                    Anterior
                                </Button>
                                <Button type="button" onClick={handleNext}>
                                    Siguiente
                                </Button>
                            </div>
                        </section>

                        <section
                            className={cn('space-y-4', step !== 3 && 'hidden')}
                            aria-hidden={step !== 3}
                        >
                            <h2 className="text-lg font-semibold text-secondary">
                                {steps[2].title}
                            </h2>
                            <UserSearchPicker
                                mode="email"
                                selected={collaborators}
                                onChange={setCollaborators}
                                max={8}
                                label="Miembro(s)"
                            />
                            {errors.usuario ? (
                                <p className="text-sm text-destructive">
                                    {errors.usuario}
                                </p>
                            ) : null}
                            <div className="space-y-1">
                                <label
                                    htmlFor="asesor_externo"
                                    className="text-sm font-medium"
                                >
                                    Nombre del asesor empresarial/externo
                                </label>
                                <Input
                                    id="asesor_externo"
                                    name="asesor_externo"
                                />
                            </div>
                            <div className="space-y-1">
                                <label
                                    htmlFor="empresa"
                                    className="text-sm font-medium"
                                >
                                    Nombre de la Empresa/Negocio/Establecimiento
                                </label>
                                <Input
                                    id="empresa"
                                    name="empresa"
                                    required={step === 3}
                                />
                                {errors.empresa ? (
                                    <p className="text-sm text-destructive">
                                        {errors.empresa}
                                    </p>
                                ) : null}
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handlePrevious}
                                >
                                    Anterior
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Guardando...' : 'Crear'}
                                </Button>
                            </div>
                        </section>
                    </>
                )}
            </Form>
        </main>
    );
};
