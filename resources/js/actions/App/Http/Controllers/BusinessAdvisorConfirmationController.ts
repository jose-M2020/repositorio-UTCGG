import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\BusinessAdvisorConfirmationController::__invoke
 * @see app/Http/Controllers/BusinessAdvisorConfirmationController.php:13
 * @route '/business-advisors/confirm/{pivot}'
 */
const BusinessAdvisorConfirmationController = (args: { pivot: number | { id: number } } | [pivot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: BusinessAdvisorConfirmationController.url(args, options),
    method: 'get',
})

BusinessAdvisorConfirmationController.definition = {
    methods: ["get","head"],
    url: '/business-advisors/confirm/{pivot}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BusinessAdvisorConfirmationController::__invoke
 * @see app/Http/Controllers/BusinessAdvisorConfirmationController.php:13
 * @route '/business-advisors/confirm/{pivot}'
 */
BusinessAdvisorConfirmationController.url = (args: { pivot: number | { id: number } } | [pivot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pivot: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { pivot: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    pivot: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        pivot: typeof args.pivot === 'object'
                ? args.pivot.id
                : args.pivot,
                }

    return BusinessAdvisorConfirmationController.definition.url
            .replace('{pivot}', parsedArgs.pivot.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusinessAdvisorConfirmationController::__invoke
 * @see app/Http/Controllers/BusinessAdvisorConfirmationController.php:13
 * @route '/business-advisors/confirm/{pivot}'
 */
BusinessAdvisorConfirmationController.get = (args: { pivot: number | { id: number } } | [pivot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: BusinessAdvisorConfirmationController.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BusinessAdvisorConfirmationController::__invoke
 * @see app/Http/Controllers/BusinessAdvisorConfirmationController.php:13
 * @route '/business-advisors/confirm/{pivot}'
 */
BusinessAdvisorConfirmationController.head = (args: { pivot: number | { id: number } } | [pivot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: BusinessAdvisorConfirmationController.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BusinessAdvisorConfirmationController::__invoke
 * @see app/Http/Controllers/BusinessAdvisorConfirmationController.php:13
 * @route '/business-advisors/confirm/{pivot}'
 */
    const BusinessAdvisorConfirmationControllerForm = (args: { pivot: number | { id: number } } | [pivot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: BusinessAdvisorConfirmationController.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BusinessAdvisorConfirmationController::__invoke
 * @see app/Http/Controllers/BusinessAdvisorConfirmationController.php:13
 * @route '/business-advisors/confirm/{pivot}'
 */
        BusinessAdvisorConfirmationControllerForm.get = (args: { pivot: number | { id: number } } | [pivot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: BusinessAdvisorConfirmationController.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BusinessAdvisorConfirmationController::__invoke
 * @see app/Http/Controllers/BusinessAdvisorConfirmationController.php:13
 * @route '/business-advisors/confirm/{pivot}'
 */
        BusinessAdvisorConfirmationControllerForm.head = (args: { pivot: number | { id: number } } | [pivot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: BusinessAdvisorConfirmationController.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    BusinessAdvisorConfirmationController.form = BusinessAdvisorConfirmationControllerForm
export default BusinessAdvisorConfirmationController