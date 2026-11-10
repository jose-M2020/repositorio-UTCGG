import { Link } from '@inertiajs/react';
import { show } from '@/actions/App/Http/Controllers/RepositorioController';
import { RepositoryFilesPanel } from '../../shared/components/RepositoryFilesPanel';
import type { Repository, RepositoryListItem } from '../../shared/types';
import { RepositoryPublicDetails } from './RepositoryPublicDetails';

type RepositoryPublicViewProps = {
    repositorio: Repository;
    related?: RepositoryListItem[];
};

export const RepositoryPublicView = ({
    repositorio,
    related = [],
}: RepositoryPublicViewProps) => {
    const publicFiles = repositorio.files.filter((file) => file.is_public);

    return (
        <div className="space-y-8">
            <section className="rounded-xl border border-border bg-card p-6">
                <RepositoryPublicDetails repositorio={repositorio} />
            </section>

            <RepositoryFilesPanel
                slug={repositorio.slug}
                files={publicFiles}
                imagenes={repositorio.imagenes}
                imagenUrls={repositorio.imagen_urls}
            />

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
