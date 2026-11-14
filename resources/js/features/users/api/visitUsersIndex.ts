import { router } from "@inertiajs/react";
import { index } from "@/actions/App/Http/Controllers/UserController";

export type VisitUsersIndexParams = {
  name: string;
  email: string;
  role: string[];
  career: string[];
  status: string[];
  date: string;
  date_range: string[];
  page: number;
};

/** Inertia visit to the Laravel users index (filters + pagination query). */
export const visitUsersIndex = (params: VisitUsersIndexParams) => {
  router.get(
    index.url({
      query: {
        name: params.name.trim() || undefined,
        email: params.email.trim() || undefined,
        role: params.role.length > 0 ? params.role : undefined,
        career: params.career.length > 0 ? params.career : undefined,
        status: params.status.length > 0 ? params.status : undefined,
        date: params.date || undefined,
        date_range:
          params.date_range[0] && params.date_range[1]
            ? params.date_range
            : undefined,
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
