import type { Repository } from '../../shared/types';

type RepositoryPublicDetailsProps = {
    repositorio: Repository;
};

export const RepositoryPublicDetails = ({
    repositorio,
}: RepositoryPublicDetailsProps) => {
    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-2xl font-semibold">{repositorio.nombre_rep}</h2>
                <p className="mt-2 text-muted-foreground">{repositorio.descripcion}</p>
            </div>

            <dl className="grid gap-3 sm:grid-cols-2">
                <div>
                    <dt className="text-sm text-muted-foreground">Carrera</dt>
                    <dd className="font-medium">{repositorio.carrera}</dd>
                </div>
                <div>
                    <dt className="text-sm text-muted-foreground">Tipo</dt>
                    <dd className="font-medium">{repositorio.tipo_proyecto}</dd>
                </div>
                <div>
                    <dt className="text-sm text-muted-foreground">Nivel</dt>
                    <dd className="font-medium">{repositorio.nivel_proyecto}</dd>
                </div>
                <div>
                    <dt className="text-sm text-muted-foreground">Empresa</dt>
                    <dd className="font-medium">{repositorio.empresa}</dd>
                </div>
                <div>
                    <dt className="text-sm text-muted-foreground">Generación</dt>
                    <dd className="font-medium">{repositorio.generacion}</dd>
                </div>
                <div>
                    <dt className="text-sm text-muted-foreground">Visibilidad</dt>
                    <dd className="font-medium">
                        {repositorio.publico ? 'Público' : 'Privado'}
                    </dd>
                </div>
            </dl>

            <div>
                <p className="text-sm text-muted-foreground">Palabras clave</p>
                <p className="font-medium">{repositorio.palabras_clave}</p>
            </div>

            {repositorio.users.length > 0 ? (
                <div>
                    <p className="mb-2 text-sm text-muted-foreground">Miembros</p>
                    <ul className="space-y-1 text-sm">
                        {repositorio.users.map((user) => (
                            <li key={user.id}>
                                {user.nombre} {user.apellido} ({user.email})
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}
        </div>
    );
};
