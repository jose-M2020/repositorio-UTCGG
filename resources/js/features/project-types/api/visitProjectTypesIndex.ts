import { router } from '@inertiajs/react';
import { index } from '@/actions/App/Http/Controllers/ProjectTypeController';

export type VisitProjectTypesIndexParams = {
  page: number;
};

export const visitProjectTypesIndex = (
  params: VisitProjectTypesIndexParams,
) => {
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
