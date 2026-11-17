import { Link } from '@inertiajs/react';
import { ArrowLeft, ShieldOff } from 'lucide-react';
import { mine } from '@/routes/repositories';
import { Button } from '@/shared/components/ui';

export const ForbiddenContainer = () => {
    return (
        <main className="flex flex-1 items-center justify-center px-4 py-16">
            <section
                className="w-full max-w-lg space-y-6 text-center"
                aria-labelledby="forbidden-title"
            >
                <div
                    className="mx-auto flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive"
                    aria-hidden
                >
                    <ShieldOff className="size-7" />
                </div>

                <div className="space-y-2">
                    <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                        Error 403
                    </p>
                    <h1
                        id="forbidden-title"
                        className="text-2xl font-semibold text-foreground"
                    >
                        Acceso denegado
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        No tienes permiso para ver esta página. Si crees que se
                        trata de un error, contacta a un administrador.
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2">
                    <Button render={<Link href={mine.url()} />}>
                        <ArrowLeft data-icon="inline-start" />
                        Ir a mis proyectos
                    </Button>
                </div>
            </section>
        </main>
    );
};
