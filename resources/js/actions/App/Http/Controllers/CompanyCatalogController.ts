import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CompanyCatalogController::search
 * @see app/Http/Controllers/CompanyCatalogController.php:16
 * @route '/companies/search'
 */
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/companies/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CompanyCatalogController::search
 * @see app/Http/Controllers/CompanyCatalogController.php:16
 * @route '/companies/search'
 */
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CompanyCatalogController::search
 * @see app/Http/Controllers/CompanyCatalogController.php:16
 * @route '/companies/search'
 */
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CompanyCatalogController::search
 * @see app/Http/Controllers/CompanyCatalogController.php:16
 * @route '/companies/search'
 */
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CompanyCatalogController::search
 * @see app/Http/Controllers/CompanyCatalogController.php:16
 * @route '/companies/search'
 */
    const searchForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: search.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CompanyCatalogController::search
 * @see app/Http/Controllers/CompanyCatalogController.php:16
 * @route '/companies/search'
 */
        searchForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: search.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CompanyCatalogController::search
 * @see app/Http/Controllers/CompanyCatalogController.php:16
 * @route '/companies/search'
 */
        searchForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: search.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    search.form = searchForm
/**
* @see \App\Http\Controllers\CompanyCatalogController::duplicates
 * @see app/Http/Controllers/CompanyCatalogController.php:27
 * @route '/companies/duplicates'
 */
export const duplicates = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: duplicates.url(options),
    method: 'post',
})

duplicates.definition = {
    methods: ["post"],
    url: '/companies/duplicates',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CompanyCatalogController::duplicates
 * @see app/Http/Controllers/CompanyCatalogController.php:27
 * @route '/companies/duplicates'
 */
duplicates.url = (options?: RouteQueryOptions) => {
    return duplicates.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CompanyCatalogController::duplicates
 * @see app/Http/Controllers/CompanyCatalogController.php:27
 * @route '/companies/duplicates'
 */
duplicates.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: duplicates.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CompanyCatalogController::duplicates
 * @see app/Http/Controllers/CompanyCatalogController.php:27
 * @route '/companies/duplicates'
 */
    const duplicatesForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: duplicates.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CompanyCatalogController::duplicates
 * @see app/Http/Controllers/CompanyCatalogController.php:27
 * @route '/companies/duplicates'
 */
        duplicatesForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: duplicates.url(options),
            method: 'post',
        })
    
    duplicates.form = duplicatesForm
/**
* @see \App\Http\Controllers\CompanyCatalogController::verify
 * @see app/Http/Controllers/CompanyCatalogController.php:41
 * @route '/companies/{company}/verify'
 */
export const verify = (args: { company: number | { id: number } } | [company: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(args, options),
    method: 'post',
})

verify.definition = {
    methods: ["post"],
    url: '/companies/{company}/verify',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CompanyCatalogController::verify
 * @see app/Http/Controllers/CompanyCatalogController.php:41
 * @route '/companies/{company}/verify'
 */
verify.url = (args: { company: number | { id: number } } | [company: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { company: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { company: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    company: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        company: typeof args.company === 'object'
                ? args.company.id
                : args.company,
                }

    return verify.definition.url
            .replace('{company}', parsedArgs.company.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CompanyCatalogController::verify
 * @see app/Http/Controllers/CompanyCatalogController.php:41
 * @route '/companies/{company}/verify'
 */
verify.post = (args: { company: number | { id: number } } | [company: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CompanyCatalogController::verify
 * @see app/Http/Controllers/CompanyCatalogController.php:41
 * @route '/companies/{company}/verify'
 */
    const verifyForm = (args: { company: number | { id: number } } | [company: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: verify.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CompanyCatalogController::verify
 * @see app/Http/Controllers/CompanyCatalogController.php:41
 * @route '/companies/{company}/verify'
 */
        verifyForm.post = (args: { company: number | { id: number } } | [company: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: verify.url(args, options),
            method: 'post',
        })
    
    verify.form = verifyForm
/**
* @see \App\Http\Controllers\CompanyCatalogController::reject
 * @see app/Http/Controllers/CompanyCatalogController.php:49
 * @route '/companies/{company}/reject'
 */
export const reject = (args: { company: number | { id: number } } | [company: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/companies/{company}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CompanyCatalogController::reject
 * @see app/Http/Controllers/CompanyCatalogController.php:49
 * @route '/companies/{company}/reject'
 */
reject.url = (args: { company: number | { id: number } } | [company: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { company: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { company: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    company: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        company: typeof args.company === 'object'
                ? args.company.id
                : args.company,
                }

    return reject.definition.url
            .replace('{company}', parsedArgs.company.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CompanyCatalogController::reject
 * @see app/Http/Controllers/CompanyCatalogController.php:49
 * @route '/companies/{company}/reject'
 */
reject.post = (args: { company: number | { id: number } } | [company: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CompanyCatalogController::reject
 * @see app/Http/Controllers/CompanyCatalogController.php:49
 * @route '/companies/{company}/reject'
 */
    const rejectForm = (args: { company: number | { id: number } } | [company: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reject.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CompanyCatalogController::reject
 * @see app/Http/Controllers/CompanyCatalogController.php:49
 * @route '/companies/{company}/reject'
 */
        rejectForm.post = (args: { company: number | { id: number } } | [company: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reject.url(args, options),
            method: 'post',
        })
    
    reject.form = rejectForm
/**
* @see \App\Http\Controllers\CompanyCatalogController::merge
 * @see app/Http/Controllers/CompanyCatalogController.php:62
 * @route '/companies/{company}/merge'
 */
export const merge = (args: { company: number | { id: number } } | [company: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: merge.url(args, options),
    method: 'post',
})

merge.definition = {
    methods: ["post"],
    url: '/companies/{company}/merge',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CompanyCatalogController::merge
 * @see app/Http/Controllers/CompanyCatalogController.php:62
 * @route '/companies/{company}/merge'
 */
merge.url = (args: { company: number | { id: number } } | [company: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { company: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { company: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    company: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        company: typeof args.company === 'object'
                ? args.company.id
                : args.company,
                }

    return merge.definition.url
            .replace('{company}', parsedArgs.company.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CompanyCatalogController::merge
 * @see app/Http/Controllers/CompanyCatalogController.php:62
 * @route '/companies/{company}/merge'
 */
merge.post = (args: { company: number | { id: number } } | [company: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: merge.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CompanyCatalogController::merge
 * @see app/Http/Controllers/CompanyCatalogController.php:62
 * @route '/companies/{company}/merge'
 */
    const mergeForm = (args: { company: number | { id: number } } | [company: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: merge.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CompanyCatalogController::merge
 * @see app/Http/Controllers/CompanyCatalogController.php:62
 * @route '/companies/{company}/merge'
 */
        mergeForm.post = (args: { company: number | { id: number } } | [company: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: merge.url(args, options),
            method: 'post',
        })
    
    merge.form = mergeForm
const CompanyCatalogController = { search, duplicates, verify, reject, merge }

export default CompanyCatalogController