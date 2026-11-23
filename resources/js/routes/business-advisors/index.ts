import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import privacyRequests from './privacy-requests'
import affiliations from './affiliations'
/**
* @see \App\Http\Controllers\BusinessAdvisorConfirmationController::__invoke
 * @see app/Http/Controllers/BusinessAdvisorConfirmationController.php:13
 * @route '/business-advisors/confirm/{pivot}'
 */
export const confirm = (args: { pivot: number | { id: number } } | [pivot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirm.url(args, options),
    method: 'get',
})

confirm.definition = {
    methods: ["get","head"],
    url: '/business-advisors/confirm/{pivot}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BusinessAdvisorConfirmationController::__invoke
 * @see app/Http/Controllers/BusinessAdvisorConfirmationController.php:13
 * @route '/business-advisors/confirm/{pivot}'
 */
confirm.url = (args: { pivot: number | { id: number } } | [pivot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return confirm.definition.url
            .replace('{pivot}', parsedArgs.pivot.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusinessAdvisorConfirmationController::__invoke
 * @see app/Http/Controllers/BusinessAdvisorConfirmationController.php:13
 * @route '/business-advisors/confirm/{pivot}'
 */
confirm.get = (args: { pivot: number | { id: number } } | [pivot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirm.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BusinessAdvisorConfirmationController::__invoke
 * @see app/Http/Controllers/BusinessAdvisorConfirmationController.php:13
 * @route '/business-advisors/confirm/{pivot}'
 */
confirm.head = (args: { pivot: number | { id: number } } | [pivot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: confirm.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BusinessAdvisorConfirmationController::__invoke
 * @see app/Http/Controllers/BusinessAdvisorConfirmationController.php:13
 * @route '/business-advisors/confirm/{pivot}'
 */
    const confirmForm = (args: { pivot: number | { id: number } } | [pivot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: confirm.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BusinessAdvisorConfirmationController::__invoke
 * @see app/Http/Controllers/BusinessAdvisorConfirmationController.php:13
 * @route '/business-advisors/confirm/{pivot}'
 */
        confirmForm.get = (args: { pivot: number | { id: number } } | [pivot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: confirm.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BusinessAdvisorConfirmationController::__invoke
 * @see app/Http/Controllers/BusinessAdvisorConfirmationController.php:13
 * @route '/business-advisors/confirm/{pivot}'
 */
        confirmForm.head = (args: { pivot: number | { id: number } } | [pivot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: confirm.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    confirm.form = confirmForm
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
* @see \App\Http\Controllers\BusinessAdvisorExportController::__invoke
 * @see app/Http/Controllers/BusinessAdvisorExportController.php:12
 * @route '/business-advisors/export'
 */
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/business-advisors/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BusinessAdvisorExportController::__invoke
 * @see app/Http/Controllers/BusinessAdvisorExportController.php:12
 * @route '/business-advisors/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusinessAdvisorExportController::__invoke
 * @see app/Http/Controllers/BusinessAdvisorExportController.php:12
 * @route '/business-advisors/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BusinessAdvisorExportController::__invoke
 * @see app/Http/Controllers/BusinessAdvisorExportController.php:12
 * @route '/business-advisors/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BusinessAdvisorExportController::__invoke
 * @see app/Http/Controllers/BusinessAdvisorExportController.php:12
 * @route '/business-advisors/export'
 */
    const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BusinessAdvisorExportController::__invoke
 * @see app/Http/Controllers/BusinessAdvisorExportController.php:12
 * @route '/business-advisors/export'
 */
        exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BusinessAdvisorExportController::__invoke
 * @see app/Http/Controllers/BusinessAdvisorExportController.php:12
 * @route '/business-advisors/export'
 */
        exportMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethod.form = exportMethodForm
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
const businessAdvisors = {
    confirm: Object.assign(confirm, confirm),
search: Object.assign(search, search),
duplicates: Object.assign(duplicates, duplicates),
pending: Object.assign(pending, pending),
export: Object.assign(exportMethod, exportMethod),
privacyRequests: Object.assign(privacyRequests, privacyRequests),
verify: Object.assign(verify, verify),
reject: Object.assign(reject, reject),
merge: Object.assign(merge, merge),
affiliations: Object.assign(affiliations, affiliations),
}

export default businessAdvisors