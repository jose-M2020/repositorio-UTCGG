import { Head, router } from '@inertiajs/react';

type PendingAdvisor = {
    id: number;
    first_name: string;
    last_name: string;
    second_last_name?: string | null;
    created_by?: { first_name: string; last_name: string } | null;
    affiliations?: Array<{ company?: { name: string } | null }>;
};

type PageProps = {
    advisors: {
        data: PendingAdvisor[];
    };
};

const BusinessAdvisorsPendingPage = ({ advisors }: PageProps) => {
    const handleVerify = (id: number) => {
        router.post(`/business-advisors/${id}/verify`);
    };

    const handleReject = (id: number) => {
        router.post(`/business-advisors/${id}/reject`);
    };

    return (
        <>
            <Head title="Asesores pendientes" />
            <div className="mx-auto max-w-4xl space-y-6 p-6">
                <h1 className="text-2xl font-semibold">Bandeja de verificacion</h1>
                <p className="text-sm text-muted-foreground">
                    Revisa asesores empresariales pendientes antes de aprobarlos
                    para el catalogo.
                </p>
                <ul className="space-y-3">
                    {advisors.data.map((advisor) => (
                        <li
                            key={advisor.id}
                            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-4"
                        >
                            <div>
                                <p className="font-medium">
                                    {advisor.first_name} {advisor.last_name}{' '}
                                    {advisor.second_last_name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {advisor.affiliations?.[0]?.company?.name ??
                                        'Sin empresa'}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground"
                                    onClick={() => handleVerify(advisor.id)}
                                >
                                    Verificar
                                </button>
                                <button
                                    type="button"
                                    className="rounded-md border px-3 py-1.5 text-sm"
                                    onClick={() => handleReject(advisor.id)}
                                >
                                    Rechazar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default BusinessAdvisorsPendingPage;
