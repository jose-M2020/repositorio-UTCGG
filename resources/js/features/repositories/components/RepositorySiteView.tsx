import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { show } from '@/actions/App/Http/Controllers/RepositorioController';
import { RepositoryPublicDetails } from './RepositoryPublicDetails';
import type { Repository, RepositoryListItem } from '../types';

type RepositoryPublicPreviewProps = {
    repositorio: Repository;
    related?: RepositoryListItem[];
    filesPanel?: ReactNode;
};

export const RepositoryPublicPreview = ({
    repositorio,
    related = [],
    filesPanel,
}: RepositoryPublicPreviewProps) => {
    return (
        <div className="space-y-8">
            <section className="rounded-xl border border-border bg-card p-6">
                <RepositoryPublicDetails repositorio={repositorio} />
            </section>

            {filesPanel}

            {related.length > 0 ? (
                <section className="space-y-3">
                    <h2 className="text-lg font-semibold">Relacionados</h2>
                    <ul className="grid gap-3 sm:grid-cols-2">
                        {related.map((item) => (
                            <li key={item.id}>
                                <Link
                                    href={show.url(item.slug)}
                                    className="block rounded-lg border border-border p-3 hover:bg-muted"
                                >
                                    {item.nombre_rep}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            ) : null}
        </div>
    );
};
