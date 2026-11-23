import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\BusinessAdvisorExportController::__invoke
 * @see app/Http/Controllers/BusinessAdvisorExportController.php:12
 * @route '/business-advisors/export'
 */
const BusinessAdvisorExportController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: BusinessAdvisorExportController.url(options),
    method: 'get',
})

BusinessAdvisorExportController.definition = {
    methods: ["get","head"],
    url: '/business-advisors/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BusinessAdvisorExportController::__invoke
 * @see app/Http/Controllers/BusinessAdvisorExportController.php:12
 * @route '/business-advisors/export'
 */
BusinessAdvisorExportController.url = (options?: RouteQueryOptions) => {
    return BusinessAdvisorExportController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusinessAdvisorExportController::__invoke
 * @see app/Http/Controllers/BusinessAdvisorExportController.php:12
 * @route '/business-advisors/export'
 */
BusinessAdvisorExportController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: BusinessAdvisorExportController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BusinessAdvisorExportController::__invoke
 * @see app/Http/Controllers/BusinessAdvisorExportController.php:12
 * @route '/business-advisors/export'
 */
BusinessAdvisorExportController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: BusinessAdvisorExportController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BusinessAdvisorExportController::__invoke
 * @see app/Http/Controllers/BusinessAdvisorExportController.php:12
 * @route '/business-advisors/export'
 */
    const BusinessAdvisorExportControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: BusinessAdvisorExportController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BusinessAdvisorExportController::__invoke
 * @see app/Http/Controllers/BusinessAdvisorExportController.php:12
 * @route '/business-advisors/export'
 */
        BusinessAdvisorExportControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: BusinessAdvisorExportController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BusinessAdvisorExportController::__invoke
 * @see app/Http/Controllers/BusinessAdvisorExportController.php:12
 * @route '/business-advisors/export'
 */
        BusinessAdvisorExportControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: BusinessAdvisorExportController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    BusinessAdvisorExportController.form = BusinessAdvisorExportControllerForm
export default BusinessAdvisorExportController