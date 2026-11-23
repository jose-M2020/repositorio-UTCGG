import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\BusinessAdvisorController::store
 * @see app/Http/Controllers/BusinessAdvisorController.php:105
 * @route '/business-advisors/{business_advisor}/affiliations'
 */
export const store = (args: { business_advisor: number | { id: number } } | [business_advisor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/business-advisors/{business_advisor}/affiliations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BusinessAdvisorController::store
 * @see app/Http/Controllers/BusinessAdvisorController.php:105
 * @route '/business-advisors/{business_advisor}/affiliations'
 */
store.url = (args: { business_advisor: number | { id: number } } | [business_advisor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { business_advisor: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { business_advisor: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    business_advisor: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        business_advisor: typeof args.business_advisor === 'object'
                ? args.business_advisor.id
                : args.business_advisor,
                }

    return store.definition.url
            .replace('{business_advisor}', parsedArgs.business_advisor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusinessAdvisorController::store
 * @see app/Http/Controllers/BusinessAdvisorController.php:105
 * @route '/business-advisors/{business_advisor}/affiliations'
 */
store.post = (args: { business_advisor: number | { id: number } } | [business_advisor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\BusinessAdvisorController::store
 * @see app/Http/Controllers/BusinessAdvisorController.php:105
 * @route '/business-advisors/{business_advisor}/affiliations'
 */
    const storeForm = (args: { business_advisor: number | { id: number } } | [business_advisor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BusinessAdvisorController::store
 * @see app/Http/Controllers/BusinessAdvisorController.php:105
 * @route '/business-advisors/{business_advisor}/affiliations'
 */
        storeForm.post = (args: { business_advisor: number | { id: number } } | [business_advisor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const affiliations = {
    store: Object.assign(store, store),
}

export default affiliations