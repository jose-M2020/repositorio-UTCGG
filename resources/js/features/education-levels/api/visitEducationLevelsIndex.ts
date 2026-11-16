import { router } from "@inertiajs/react";
import { index } from "@/actions/App/Http/Controllers/EducationLevelController";

export type VisitEducationLevelsIndexParams = {
    page: number;
};

export const visitEducationLevelsIndex = (
    params: VisitEducationLevelsIndexParams,
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