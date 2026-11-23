import { Head, Link } from '@inertiajs/react';

type PageProps = {
    status: 'confirmed' | 'rejected';
    project_title?: string | null;
};

const BusinessAdvisorConfirmationPage = ({
    status,
    project_title,
}: PageProps) => {
    return (
        <>
            <Head title="Confirmacion de asesor" />
            <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center gap-4 p-6">
                <h1 className="text-2xl font-semibold">
                    {status === 'confirmed'
                        ? 'Participacion confirmada'
                        : 'Participacion rechazada'}
                </h1>
                <p className="text-muted-foreground">
                    {status === 'confirmed'
                        ? `Gracias. Tu participacion como asesor empresarial${project_title ? ` en "${project_title}"` : ''} quedo confirmada.`
                        : `Registramos tu rechazo${project_title ? ` para "${project_title}"` : ''}. Si fue un error, contacta a la institucion.`}
                </p>
                <p className="text-sm text-muted-foreground">
                    Consulta el{' '}
                    <Link href="/aviso-de-privacidad" className="underline">
                        aviso de privacidad
                    </Link>
                    .
                </p>
            </main>
        </>
    );
};

export default BusinessAdvisorConfirmationPage;
