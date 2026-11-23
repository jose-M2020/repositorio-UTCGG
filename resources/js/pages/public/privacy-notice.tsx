import { Head, Link } from '@inertiajs/react';
import { home } from '@/routes';

type PageProps = {
    updated_at: string;
};

const PrivacyNoticePage = ({ updated_at }: PageProps) => {
    return (
        <>
            <Head title="Aviso de privacidad" />
            <main className="mx-auto max-w-3xl space-y-6 px-6 py-10">
                <p className="text-sm text-muted-foreground">
                    <Link href={home.url()} className="underline">
                        Inicio
                    </Link>
                </p>
                <header className="space-y-2">
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Aviso de privacidad
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Ultima actualizacion: {updated_at}
                    </p>
                </header>

                <section className="space-y-3 text-sm leading-relaxed text-foreground">
                    <p>
                        Este repositorio institucional trata datos de contacto de
                        asesores empresariales (nombre, empresa, puesto, correo y
                        telefono) para gestionar proyectos academicos y
                        confirmaciones de participacion.
                    </p>
                    <p>
                        Los datos del catálogo se reutilizan entre proyectos; el
                        historial de cada proyecto se conserva en un snapshot que
                        no se reescribe al actualizar el catálogo.
                    </p>
                    <p>
                        Puedes ejercer derechos ARCO (acceso, rectificacion,
                        cancelacion u oposicion) contactando a la institucion. El
                        personal autorizado registra y atiende la solicitud en el
                        panel interno.
                    </p>
                    <p>
                        Al confirmar tu participacion como asesor empresarial
                        aceptas el tratamiento descrito en este aviso para las
                        finalidades del proyecto academico correspondiente.
                    </p>
                </section>
            </main>
        </>
    );
};

export default PrivacyNoticePage;
