import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\AdvisorCapacityController::upsert
 * @see app/Http/Controllers/AdvisorCapacityController.php:23
 * @route '/project-periods/{project_period}/capacities'
 */
export const upsert = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: upsert.url(args, options),
    method: 'put',
})

upsert.definition = {
    methods: ["put"],
    url: '/project-periods/{project_period}/capacities',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\AdvisorCapacityController::upsert
 * @see app/Http/Controllers/AdvisorCapacityController.php:23
 * @route '/project-periods/{project_period}/capacities'
 */
upsert.url = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project_period: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { project_period: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    project_period: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project_period: typeof args.project_period === 'object'
                ? args.project_period.id
                : args.project_period,
                }

    return upsert.definition.url
            .replace('{project_period}', parsedArgs.project_period.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdvisorCapacityController::upsert
 * @see app/Http/Controllers/AdvisorCapacityController.php:23
 * @route '/project-periods/{project_period}/capacities'
 */
upsert.put = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: upsert.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\AdvisorCapacityController::upsert
 * @see app/Http/Controllers/AdvisorCapacityController.php:23
 * @route '/project-periods/{project_period}/capacities'
 */
    const upsertForm = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: upsert.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdvisorCapacityController::upsert
 * @see app/Http/Controllers/AdvisorCapacityController.php:23
 * @route '/project-periods/{project_period}/capacities'
 */
        upsertForm.put = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: upsert.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    upsert.form = upsertForm
const capacities = {
    upsert: Object.assign(upsert, upsert),
}

export default capacities