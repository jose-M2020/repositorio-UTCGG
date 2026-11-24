import { router } from '@inertiajs/react';
import { index } from '@/actions/App/Http/Controllers/CareerController';

export type VisitCareersIndexParams = {
  page: number;
};

export const visitCareersIndex = (params: VisitCareersIndexParams) => {
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
