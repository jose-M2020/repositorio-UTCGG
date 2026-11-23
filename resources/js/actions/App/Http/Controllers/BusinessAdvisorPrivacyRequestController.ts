import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\BusinessAdvisorPrivacyRequestController::index
 * @see app/Http/Controllers/BusinessAdvisorPrivacyRequestController.php:19
 * @route '/business-advisors/privacy-requests'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/business-advisors/privacy-requests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BusinessAdvisorPrivacyRequestController::index
 * @see app/Http/Controllers/BusinessAdvisorPrivacyRequestController.php:19
 * @route '/business-advisors/privacy-requests'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusinessAdvisorPrivacyRequestController::index
 * @see app/Http/Controllers/BusinessAdvisorPrivacyRequestController.php:19
 * @route '/business-advisors/privacy-requests'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BusinessAdvisorPrivacyRequestController::index
 * @see app/Http/Controllers/BusinessAdvisorPrivacyRequestController.php:19
 * @route '/business-advisors/privacy-requests'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BusinessAdvisorPrivacyRequestController::index
 * @see app/Http/Controllers/BusinessAdvisorPrivacyRequestController.php:19
 * @route '/business-advisors/privacy-requests'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BusinessAdvisorPrivacyRequestController::index
 * @see app/Http/Controllers/BusinessAdvisorPrivacyRequestController.php:19
 * @route '/business-advisors/privacy-requests'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BusinessAdvisorPrivacyRequestController::index
 * @see app/Http/Controllers/BusinessAdvisorPrivacyRequestController.php:19
 * @route '/business-advisors/privacy-requests'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\BusinessAdvisorPrivacyRequestController::store
 * @see app/Http/Controllers/BusinessAdvisorPrivacyRequestController.php:53
 * @route '/business-advisors/privacy-requests'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/business-advisors/privacy-requests',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BusinessAdvisorPrivacyRequestController::store
 * @see app/Http/Controllers/BusinessAdvisorPrivacyRequestController.php:53
 * @route '/business-advisors/privacy-requests'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusinessAdvisorPrivacyRequestController::store
 * @see app/Http/Controllers/BusinessAdvisorPrivacyRequestController.php:53
 * @route '/business-advisors/privacy-requests'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\BusinessAdvisorPrivacyRequestController::store
 * @see app/Http/Controllers/BusinessAdvisorPrivacyRequestController.php:53
 * @route '/business-advisors/privacy-requests'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BusinessAdvisorPrivacyRequestController::store
 * @see app/Http/Controllers/BusinessAdvisorPrivacyRequestController.php:53
 * @route '/business-advisors/privacy-requests'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\BusinessAdvisorPrivacyRequestController::resolve
 * @see app/Http/Controllers/BusinessAdvisorPrivacyRequestController.php:88
 * @route '/business-advisors/privacy-requests/{privacy_request}/resolve'
 */
export const resolve = (args: { privacy_request: number | { id: number } } | [privacy_request: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resolve.url(args, options),
    method: 'post',
})

resolve.definition = {
    methods: ["post"],
    url: '/business-advisors/privacy-requests/{privacy_request}/resolve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BusinessAdvisorPrivacyRequestController::resolve
 * @see app/Http/Controllers/BusinessAdvisorPrivacyRequestController.php:88
 * @route '/business-advisors/privacy-requests/{privacy_request}/resolve'
 */
resolve.url = (args: { privacy_request: number | { id: number } } | [privacy_request: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { privacy_request: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { privacy_request: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    privacy_request: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        privacy_request: typeof args.privacy_request === 'object'
                ? args.privacy_request.id
                : args.privacy_request,
                }

    return resolve.definition.url
            .replace('{privacy_request}', parsedArgs.privacy_request.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusinessAdvisorPrivacyRequestController::resolve
 * @see app/Http/Controllers/BusinessAdvisorPrivacyRequestController.php:88
 * @route '/business-advisors/privacy-requests/{privacy_request}/resolve'
 */
resolve.post = (args: { privacy_request: number | { id: number } } | [privacy_request: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resolve.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\BusinessAdvisorPrivacyRequestController::resolve
 * @see app/Http/Controllers/BusinessAdvisorPrivacyRequestController.php:88
 * @route '/business-advisors/privacy-requests/{privacy_request}/resolve'
 */
    const resolveForm = (args: { privacy_request: number | { id: number } } | [privacy_request: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: resolve.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BusinessAdvisorPrivacyRequestController::resolve
 * @see app/Http/Controllers/BusinessAdvisorPrivacyRequestController.php:88
 * @route '/business-advisors/privacy-requests/{privacy_request}/resolve'
 */
        resolveForm.post = (args: { privacy_request: number | { id: number } } | [privacy_request: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: resolve.url(args, options),
            method: 'post',
        })
    
    resolve.form = resolveForm
/**
* @see \App\Http\Controllers\BusinessAdvisorPrivacyRequestController::reject
 * @see app/Http/Controllers/BusinessAdvisorPrivacyRequestController.php:110
 * @route '/business-advisors/privacy-requests/{privacy_request}/reject'
 */
export const reject = (args: { privacy_request: number | { id: number } } | [privacy_request: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/business-advisors/privacy-requests/{privacy_request}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BusinessAdvisorPrivacyRequestController::reject
 * @see app/Http/Controllers/BusinessAdvisorPrivacyRequestController.php:110
 * @route '/business-advisors/privacy-requests/{privacy_request}/reject'
 */
reject.url = (args: { privacy_request: number | { id: number } } | [privacy_request: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { privacy_request: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { privacy_request: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    privacy_request: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        privacy_request: typeof args.privacy_request === 'object'
                ? args.privacy_request.id
                : args.privacy_request,
                }

    return reject.definition.url
            .replace('{privacy_request}', parsedArgs.privacy_request.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusinessAdvisorPrivacyRequestController::reject
 * @see app/Http/Controllers/BusinessAdvisorPrivacyRequestController.php:110
 * @route '/business-advisors/privacy-requests/{privacy_request}/reject'
 */
reject.post = (args: { privacy_request: number | { id: number } } | [privacy_request: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\BusinessAdvisorPrivacyRequestController::reject
 * @see app/Http/Controllers/BusinessAdvisorPrivacyRequestController.php:110
 * @route '/business-advisors/privacy-requests/{privacy_request}/reject'
 */
    const rejectForm = (args: { privacy_request: number | { id: number } } | [privacy_request: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reject.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BusinessAdvisorPrivacyRequestController::reject
 * @see app/Http/Controllers/BusinessAdvisorPrivacyRequestController.php:110
 * @route '/business-advisors/privacy-requests/{privacy_request}/reject'
 */
        rejectForm.post = (args: { privacy_request: number | { id: number } } | [privacy_request: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reject.url(args, options),
            method: 'post',
        })
    
    reject.form = rejectForm
const BusinessAdvisorPrivacyRequestController = { index, store, resolve, reject }

export default BusinessAdvisorPrivacyRequestController