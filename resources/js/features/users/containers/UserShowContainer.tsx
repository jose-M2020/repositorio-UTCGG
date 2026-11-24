import { Link } from '@inertiajs/react';
import { show as showRepository } from '@/actions/App/Http/Controllers/RepositoryController';
import { index } from '@/actions/App/Http/Controllers/UserController';
import { Button } from '@/shared/components/ui';
import { UserDetails } from '../components/UserDetails';
import type {
  UserDetails as UserDetailsType,
  UserRepositorySummary,
} from '../types';

type UserShowContainerProps = {
  user: UserDetailsType;
  publicRepositories: UserRepositorySummary[];
  privateRepositories: UserRepositorySummary[];
};

const RepositoryGroup = ({
  title,
  items,
}: {
  title: string;
  items: UserRepositorySummary[];
}) => {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-secondary">{title}</h2>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No se encontró ningún repositorio.
        </p>
      ) : (
        <ul className="divide-y divide-border rounded-xl border border-border bg-card">
          {items.map((repo) => (
            <li key={repo.id}>
              <Link
                href={showRepository.url(repo.slug)}
                className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-muted"
              >
                {repo.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export const UserShowContainer = ({
  user,
  publicRepositories,
  privateRepositories,
}: UserShowContainerProps) => {
  const isAdmin = user.roles.includes('admin');

  return (
    <main className="page-container space-y-6 py-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-primary">
            Detalle de usuario
          </h1>
          <p className="text-sm text-muted-foreground">
            Información registrada de la cuenta.
          </p>
        </div>
        <Link href={index.url()}>
          <Button type="button" variant="outline">
            Volver
          </Button>
        </Link>
      </header>

      <section className="rounded-xl border border-border bg-card p-6">
        <UserDetails user={user} />
      </section>

      {!isAdmin ? (
        <div className="space-y-6">
          <RepositoryGroup
            title={`${publicRepositories.length} Públicos`}
            items={publicRepositories}
          />
          <RepositoryGroup
            title={`${privateRepositories.length} Privados`}
            items={privateRepositories}
          />
        </div>
      ) : null}
    </main>
  );
};
