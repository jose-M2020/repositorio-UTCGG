import { router } from "@inertiajs/react";
import { index } from "@/actions/App/Http/Controllers/RoleController";

export type VisitRolesIndexParams = {
  page: number;
};

export const visitRolesIndex = (params: VisitRolesIndexParams) => {
  router.get(
    index.url({
      query: {
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
