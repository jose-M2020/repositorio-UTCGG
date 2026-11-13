import { Link, usePage } from "@inertiajs/react";
import { create } from "@/actions/App/Http/Controllers/CatalogController";
import { Button } from "@/shared/components/ui";
import { CatalogsTable } from "../components/CatalogsTable";
import type { CatalogFilters, CatalogTypesMap, PaginatedCatalogs } from "../types";

type CatalogsIndexContainerProps = {
  catalogs: PaginatedCatalogs;
  filters: CatalogFilters;
  catalogTypes: CatalogTypesMap;
};

export const CatalogsIndexContainer = ({
  catalogs,
  filters,
  catalogTypes,
}: CatalogsIndexContainerProps) => {
  const { flash } = usePage().props;

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Catalogos
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Administra areas, tipos de proyecto y grados academicos.
          </p>
        </div>
        <Link href={create.url()}>
          <Button type="button">Nuevo catalogo</Button>
        </Link>
      </header>

      {flash.status ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
          {flash.status}
        </p>
      ) : null}

      <CatalogsTable
        catalogs={catalogs}
        filters={filters}
        catalogTypes={catalogTypes}
      />
    </main>
  );
};
