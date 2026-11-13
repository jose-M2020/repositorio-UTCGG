import { router } from "@inertiajs/react";
import { index } from "@/actions/App/Http/Controllers/UserController";

export type VisitUsersIndexParams = {
  nombre: string;
  email: string;
  rol: string[];
  carrera: string[];
  fecha: string;
  rango_fecha: string[];
  page: number;
};

/** Inertia visit to the Laravel users index (filters + pagination query). */
export const visitUsersIndex = (params: VisitUsersIndexParams) => {
  router.get(
    index.url({
      query: {
        nombre: params.nombre.trim() || undefined,
        email: params.email.trim() || undefined,
        rol: params.rol.length > 0 ? params.rol : undefined,
        carrera: params.carrera.length > 0 ? params.carrera : undefined,
        fecha: params.fecha || undefined,
        rango_fecha:
          params.rango_fecha[0] && params.rango_fecha[1]
            ? params.rango_fecha
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
