import { Form } from '@inertiajs/react';
import { index } from '@/actions/App/Http/Controllers/RepositorioController';
import { Button, Input } from '@/shared/components/ui';

export const HomeHero = () => {
    return (
        <section className="relative overflow-hidden border-b border-teal-900/10 bg-gradient-to-br from-teal-950 via-teal-900 to-slate-900 text-teal-50">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                    backgroundImage:
                        'radial-gradient(circle at 20% 20%, rgba(45,212,191,0.35), transparent 40%), radial-gradient(circle at 80% 0%, rgba(15,118,110,0.45), transparent 35%)',
                }}
            />

            <div className="relative mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col justify-center gap-8 px-4 py-16">
                <div className="max-w-3xl space-y-4">
                    <p className="text-sm font-medium tracking-[0.2em] text-teal-200/80 uppercase">
                        UTCGG
                    </p>
                    <h1 className="font-serif text-4xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Repositorio digital
                    </h1>
                    <p className="max-w-2xl text-base text-teal-100/90 sm:text-lg">
                        Acceso virtual, libre y abierto al conocimiento académico
                        y científico de la Universidad Tecnológica de la Costa
                        Grande de Guerrero.
                    </p>
                </div>

                <Form
                    {...index.form()}
                    className="flex w-full max-w-2xl flex-col gap-3 sm:flex-row"
                >
                    <Input
                        name="query"
                        placeholder="Buscar proyectos, tesis o autores..."
                        aria-label="Buscar en el repositorio"
                        className="h-11 border-teal-700/40 bg-white/95 text-slate-900"
                    />
                    <select
                        name="search_field"
                        defaultValue="title"
                        aria-label="Campo de búsqueda"
                        className="h-11 rounded-lg border border-teal-700/40 bg-white/95 px-3 text-sm text-slate-900"
                    >
                        <option value="title">Título</option>
                        <option value="description">Descripción</option>
                        <option value="author">Autor</option>
                    </select>
                    <Button type="submit" size="lg" className="h-11 shrink-0">
                        Buscar
                    </Button>
                </Form>
            </div>
        </section>
    );
};
