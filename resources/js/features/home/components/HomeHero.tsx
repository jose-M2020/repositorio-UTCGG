import { Form } from '@inertiajs/react';
import { index } from '@/actions/App/Http/Controllers/RepositorioController';
import { Button, Input } from '@/shared/components/ui';

export const HomeHero = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-tr from-primary to-secondary text-primary-foreground">
            <div className="relative mx-auto grid min-h-[88vh] w-full max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
                <div className="space-y-6">
                    <h1 className="text-4xl font-extrabold tracking-[0.12em] text-white uppercase sm:text-5xl lg:text-6xl">
                        Repositorio digital
                    </h1>
                    <p className="max-w-xl text-base text-white/90 sm:text-lg">
                        Acceso virtual, libre y abierto al conocimiento académico
                        y científico de la Universidad Tecnológica de la Costa
                        Grande de Guerrero.
                    </p>

                    <Form
                        {...index.form()}
                        className="flex w-full max-w-xl flex-col gap-3 sm:flex-row"
                    >
                        <Input
                            name="query"
                            placeholder="Buscar..."
                            aria-label="Buscar en el repositorio"
                            className="h-11 border-transparent bg-card text-foreground"
                        />
                        <select
                            name="search_field"
                            defaultValue="title"
                            aria-label="Campo de búsqueda"
                            className="h-11 rounded-lg border-transparent bg-card px-3 text-sm text-foreground"
                        >
                            <option value="title">Título</option>
                            <option value="description">Descripción</option>
                            <option value="author">Autor</option>
                        </select>
                        <Button
                            type="submit"
                            size="lg"
                            className="h-11 shrink-0 bg-card text-primary hover:bg-accent"
                        >
                            Buscar
                        </Button>
                    </Form>
                </div>

                <div className="hidden justify-end lg:flex">
                    <img
                        src="/img/library.png"
                        alt="Biblioteca digital UTCGG"
                        className="max-h-[28rem] w-auto object-contain"
                    />
                </div>
            </div>
        </section>
    );
};
