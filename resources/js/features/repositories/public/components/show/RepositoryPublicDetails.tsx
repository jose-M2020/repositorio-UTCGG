import { formatUserName } from '@/shared/lib';
import type { Repository } from '../../../shared/types';

type RepositoryPublicDetailsProps = {
    repository: Repository;
};

export const RepositoryPublicDetails = ({
    repository,
}: RepositoryPublicDetailsProps) => {
    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-2xl font-semibold">{repository.title}</h2>
                <p className="mt-2 text-muted-foreground">{repository.description}</p>
            </div>

            <dl className="grid gap-3 sm:grid-cols-2">
                <div>
                    <dt className="text-sm text-muted-foreground">Carrera</dt>
                    <dd className="font-medium">{repository.career}</dd>
                </div>
                <div>
                    <dt className="text-sm text-muted-foreground">Tipo</dt>
                    <dd className="font-medium">{repository.project_type}</dd>
                </div>
                <div>
                    <dt className="text-sm text-muted-foreground">Nivel</dt>
                    <dd className="font-medium">{repository.academic_degree}</dd>
                </div>
                <div>
                    <dt className="text-sm text-muted-foreground">Empresa</dt>
                    <dd className="font-medium">{repository.company}</dd>
                </div>
                <div>
                    <dt className="text-sm text-muted-foreground">Generación</dt>
                    <dd className="font-medium">{repository.generation}</dd>
                </div>
                <div>
                    <dt className="text-sm text-muted-foreground">Visibilidad</dt>
                    <dd className="font-medium">
                        {repository.is_public ? 'Público' : 'Privado'}
                    </dd>
                </div>
            </dl>

            <div>
                <p className="text-sm text-muted-foreground">Palabras clave</p>
                <p className="font-medium">{repository.keywords}</p>
            </div>

            {repository.users.length > 0 ? (
                <div>
                    <p className="mb-2 text-sm text-muted-foreground">Miembros</p>
                    <ul className="space-y-1 text-sm">
                        {repository.users.map((user) => (
                            <li key={user.id}>
                                {formatUserName(user)} ({user.email})
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}
        </div>
    );
};
