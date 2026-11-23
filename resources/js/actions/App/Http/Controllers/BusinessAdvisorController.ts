import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\BusinessAdvisorController::search
 * @see app/Http/Controllers/BusinessAdvisorController.php:19
 * @route '/business-advisors/search'
 */
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/business-advisors/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BusinessAdvisorController::search
 * @see app/Http/Controllers/BusinessAdvisorController.php:19
 * @route '/business-advisors/search'
 */
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusinessAdvisorController::search
 * @see app/Http/Controllers/BusinessAdvisorController.php:19
 * @route '/business-advisors/search'
 */
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BusinessAdvisorController::search
 * @see app/Http/Controllers/BusinessAdvisorController.php:19
 * @route '/business-advisors/search'
 */
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BusinessAdvisorController::search
 * @see app/Http/Controllers/BusinessAdvisorController.php:19
 * @route '/business-advisors/search'
 */
    const searchForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: search.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BusinessAdvisorController::search
 * @see app/Http/Controllers/BusinessAdvisorController.php:19
 * @route '/business-advisors/search'
 */
        searchForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: search.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BusinessAdvisorController::search
 * @see app/Http/Controllers/BusinessAdvisorController.php:19
 * @route '/business-advisors/search'
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
* @see \App\Http\Controllers\BusinessAdvisorController::duplicates
 * @see app/Http/Controllers/BusinessAdvisorController.php:30
 * @route '/business-advisors/duplicates'
 */
export const duplicates = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: duplicates.url(options),
    method: 'post',
})

duplicates.definition = {
    methods: ["post"],
    url: '/business-advisors/duplicates',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BusinessAdvisorController::duplicates
 * @see app/Http/Controllers/BusinessAdvisorController.php:30
 * @route '/business-advisors/duplicates'
 */
duplicates.url = (options?: RouteQueryOptions) => {
    return duplicates.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusinessAdvisorController::duplicates
 * @see app/Http/Controllers/BusinessAdvisorController.php:30
 * @route '/business-advisors/duplicates'
 */
duplicates.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: duplicates.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\BusinessAdvisorController::duplicates
 * @see app/Http/Controllers/BusinessAdvisorController.php:30
 * @route '/business-advisors/duplicates'
 */
    const duplicatesForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: duplicates.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BusinessAdvisorController::duplicates
 * @see app/Http/Controllers/BusinessAdvisorController.php:30
 * @route '/business-advisors/duplicates'
 */
        duplicatesForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: duplicates.url(options),
            method: 'post',
        })
    
    duplicates.form = duplicatesForm
/**
* @see \App\Http\Controllers\BusinessAdvisorController::pending
 * @see app/Http/Controllers/BusinessAdvisorController.php:55
 * @route '/business-advisors/pending'
 */
export const pending = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pending.url(options),
    method: 'get',
})

pending.definition = {
    methods: ["get","head"],
    url: '/business-advisors/pending',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BusinessAdvisorController::pending
 * @see app/Http/Controllers/BusinessAdvisorController.php:55
 * @route '/business-advisors/pending'
 */
pending.url = (options?: RouteQueryOptions) => {
    return pending.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusinessAdvisorController::pending
 * @see app/Http/Controllers/BusinessAdvisorController.php:55
 * @route '/business-advisors/pending'
 */
pending.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pending.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BusinessAdvisorController::pending
 * @see app/Http/Controllers/BusinessAdvisorController.php:55
 * @route '/business-advisors/pending'
 */
pending.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pending.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BusinessAdvisorController::pending
 * @see app/Http/Controllers/BusinessAdvisorController.php:55
 * @route '/business-advisors/pending'
 */
    const pendingForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: pending.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BusinessAdvisorController::pending
 * @see app/Http/Controllers/BusinessAdvisorController.php:55
 * @route '/business-advisors/pending'
 */
        pendingForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pending.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BusinessAdvisorController::pending
 * @see app/Http/Controllers/BusinessAdvisorController.php:55
 * @route '/business-advisors/pending'
 */
        pendingForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pending.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    pending.form = pendingForm
/**
* @see \App\Http\Controllers\BusinessAdvisorController::verify
 * @see app/Http/Controllers/BusinessAdvisorController.php:90
 * @route '/business-advisors/{business_advisor}/verify'
 */
export const verify = (args: { business_advisor: number | { id: number } } | [business_advisor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(args, options),
    method: 'post',
})

verify.definition = {
    methods: ["post"],
    url: '/business-advisors/{business_advisor}/verify',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BusinessAdvisorController::verify
 * @see app/Http/Controllers/BusinessAdvisorController.php:90
 * @route '/business-advisors/{business_advisor}/verify'
 */
verify.url = (args: { business_advisor: number | { id: number } } | [business_advisor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return verify.definition.url
            .replace('{business_advisor}', parsedArgs.business_advisor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusinessAdvisorController::verify
 * @see app/Http/Controllers/BusinessAdvisorController.php:90
 * @route '/business-advisors/{business_advisor}/verify'
 */
verify.post = (args: { business_advisor: number | { id: number } } | [business_advisor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\BusinessAdvisorController::verify
 * @see app/Http/Controllers/BusinessAdvisorController.php:90
 * @route '/business-advisors/{business_advisor}/verify'
 */
    const verifyForm = (args: { business_advisor: number | { id: number } } | [business_advisor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: verify.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BusinessAdvisorController::verify
 * @see app/Http/Controllers/BusinessAdvisorController.php:90
 * @route '/business-advisors/{business_advisor}/verify'
 */
        verifyForm.post = (args: { business_advisor: number | { id: number } } | [business_advisor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: verify.url(args, options),
            method: 'post',
        })
    
    verify.form = verifyForm
/**
* @see \App\Http\Controllers\BusinessAdvisorController::reject
 * @see app/Http/Controllers/BusinessAdvisorController.php:98
 * @route '/business-advisors/{business_advisor}/reject'
 */
export const reject = (args: { business_advisor: number | { id: number } } | [business_advisor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/business-advisors/{business_advisor}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BusinessAdvisorController::reject
 * @see app/Http/Controllers/BusinessAdvisorController.php:98
 * @route '/business-advisors/{business_advisor}/reject'
 */
reject.url = (args: { business_advisor: number | { id: number } } | [business_advisor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return reject.definition.url
            .replace('{business_advisor}', parsedArgs.business_advisor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusinessAdvisorController::reject
 * @see app/Http/Controllers/BusinessAdvisorController.php:98
 * @route '/business-advisors/{business_advisor}/reject'
 */
reject.post = (args: { business_advisor: number | { id: number } } | [business_advisor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\BusinessAdvisorController::reject
 * @see app/Http/Controllers/BusinessAdvisorController.php:98
 * @route '/business-advisors/{business_advisor}/reject'
 */
    const rejectForm = (args: { business_advisor: number | { id: number } } | [business_advisor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reject.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BusinessAdvisorController::reject
 * @see app/Http/Controllers/BusinessAdvisorController.php:98
 * @route '/business-advisors/{business_advisor}/reject'
 */
        rejectForm.post = (args: { business_advisor: number | { id: number } } | [business_advisor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reject.url(args, options),
            method: 'post',
        })
    
    reject.form = rejectForm
/**
* @see \App\Http\Controllers\BusinessAdvisorController::merge
 * @see app/Http/Controllers/BusinessAdvisorController.php:111
 * @route '/business-advisors/{business_advisor}/merge'
 */
export const merge = (args: { business_advisor: number | { id: number } } | [business_advisor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: merge.url(args, options),
    method: 'post',
})

merge.definition = {
    methods: ["post"],
    url: '/business-advisors/{business_advisor}/merge',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BusinessAdvisorController::merge
 * @see app/Http/Controllers/BusinessAdvisorController.php:111
 * @route '/business-advisors/{business_advisor}/merge'
 */
merge.url = (args: { business_advisor: number | { id: number } } | [business_advisor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return merge.definition.url
            .replace('{business_advisor}', parsedArgs.business_advisor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusinessAdvisorController::merge
 * @see app/Http/Controllers/BusinessAdvisorController.php:111
 * @route '/business-advisors/{business_advisor}/merge'
 */
merge.post = (args: { business_advisor: number | { id: number } } | [business_advisor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: merge.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\BusinessAdvisorController::merge
 * @see app/Http/Controllers/BusinessAdvisorController.php:111
 * @route '/business-advisors/{business_advisor}/merge'
 */
    const mergeForm = (args: { business_advisor: number | { id: number } } | [business_advisor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: merge.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BusinessAdvisorController::merge
 * @see app/Http/Controllers/BusinessAdvisorController.php:111
 * @route '/business-advisors/{business_advisor}/merge'
 */
        mergeForm.post = (args: { business_advisor: number | { id: number } } | [business_advisor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: merge.url(args, options),
            method: 'post',
        })
    
    merge.form = mergeForm
/**
* @see \App\Http\Controllers\BusinessAdvisorController::storeAffiliation
 * @see app/Http/Controllers/BusinessAdvisorController.php:125
 * @route '/business-advisors/{business_advisor}/affiliations'
 */
export const storeAffiliation = (args: { business_advisor: number | { id: number } } | [business_advisor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeAffiliation.url(args, options),
    method: 'post',
})

storeAffiliation.definition = {
    methods: ["post"],
    url: '/business-advisors/{business_advisor}/affiliations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BusinessAdvisorController::storeAffiliation
 * @see app/Http/Controllers/BusinessAdvisorController.php:125
 * @route '/business-advisors/{business_advisor}/affiliations'
 */
storeAffiliation.url = (args: { business_advisor: number | { id: number } } | [business_advisor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return storeAffiliation.definition.url
            .replace('{business_advisor}', parsedArgs.business_advisor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusinessAdvisorController::storeAffiliation
 * @see app/Http/Controllers/BusinessAdvisorController.php:125
 * @route '/business-advisors/{business_advisor}/affiliations'
 */
storeAffiliation.post = (args: { business_advisor: number | { id: number } } | [business_advisor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeAffiliation.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\BusinessAdvisorController::storeAffiliation
 * @see app/Http/Controllers/BusinessAdvisorController.php:125
 * @route '/business-advisors/{business_advisor}/affiliations'
 */
    const storeAffiliationForm = (args: { business_advisor: number | { id: number } } | [business_advisor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeAffiliation.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BusinessAdvisorController::storeAffiliation
 * @see app/Http/Controllers/BusinessAdvisorController.php:125
 * @route '/business-advisors/{business_advisor}/affiliations'
 */
        storeAffiliationForm.post = (args: { business_advisor: number | { id: number } } | [business_advisor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeAffiliation.url(args, options),
            method: 'post',
        })
    
    storeAffiliation.form = storeAffiliationForm
const BusinessAdvisorController = { search, duplicates, pending, verify, reject, merge, storeAffiliation }

export default BusinessAdvisorController