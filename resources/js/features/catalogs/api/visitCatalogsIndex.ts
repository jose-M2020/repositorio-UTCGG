import { router } from "@inertiajs/react";
import { index } from "@/actions/App/Http/Controllers/CatalogController";
import type { CatalogType } from "../types";

export type VisitCatalogsIndexParams = {
  type: CatalogType | "all";
  page: number;
};

export const visitCatalogsIndex = (params: VisitCatalogsIndexParams) => {
  router.get(
    index.url({
      query: {
        type: params.type !== "all" ? params.type : undefined,
        page: params.page > 1 ? params.page : undefined,
      },
    }),
    {},
    {
      preserveState: true,
      preserveScroll: true,
      replace: true,
    },
  );
};
