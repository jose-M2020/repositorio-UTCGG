import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\BusinessAdvisorAffiliationController::verify
 * @see app/Http/Controllers/BusinessAdvisorAffiliationController.php:12
 * @route '/business-advisor-affiliations/{business_advisor_affiliation}/verify'
 */
export const verify = (args: { business_advisor_affiliation: number | { id: number } } | [business_advisor_affiliation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(args, options),
    method: 'post',
})

verify.definition = {
    methods: ["post"],
    url: '/business-advisor-affiliations/{business_advisor_affiliation}/verify',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BusinessAdvisorAffiliationController::verify
 * @see app/Http/Controllers/BusinessAdvisorAffiliationController.php:12
 * @route '/business-advisor-affiliations/{business_advisor_affiliation}/verify'
 */
verify.url = (args: { business_advisor_affiliation: number | { id: number } } | [business_advisor_affiliation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { business_advisor_affiliation: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { business_advisor_affiliation: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    business_advisor_affiliation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        business_advisor_affiliation: typeof args.business_advisor_affiliation === 'object'
                ? args.business_advisor_affiliation.id
                : args.business_advisor_affiliation,
                }

    return verify.definition.url
            .replace('{business_advisor_affiliation}', parsedArgs.business_advisor_affiliation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusinessAdvisorAffiliationController::verify
 * @see app/Http/Controllers/BusinessAdvisorAffiliationController.php:12
 * @route '/business-advisor-affiliations/{business_advisor_affiliation}/verify'
 */
verify.post = (args: { business_advisor_affiliation: number | { id: number } } | [business_advisor_affiliation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\BusinessAdvisorAffiliationController::verify
 * @see app/Http/Controllers/BusinessAdvisorAffiliationController.php:12
 * @route '/business-advisor-affiliations/{business_advisor_affiliation}/verify'
 */
    const verifyForm = (args: { business_advisor_affiliation: number | { id: number } } | [business_advisor_affiliation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: verify.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BusinessAdvisorAffiliationController::verify
 * @see app/Http/Controllers/BusinessAdvisorAffiliationController.php:12
 * @route '/business-advisor-affiliations/{business_advisor_affiliation}/verify'
 */
        verifyForm.post = (args: { business_advisor_affiliation: number | { id: number } } | [business_advisor_affiliation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: verify.url(args, options),
            method: 'post',
        })
    
    verify.form = verifyForm
/**
* @see \App\Http\Controllers\BusinessAdvisorAffiliationController::reject
 * @see app/Http/Controllers/BusinessAdvisorAffiliationController.php:23
 * @route '/business-advisor-affiliations/{business_advisor_affiliation}/reject'
 */
export const reject = (args: { business_advisor_affiliation: number | { id: number } } | [business_advisor_affiliation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/business-advisor-affiliations/{business_advisor_affiliation}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BusinessAdvisorAffiliationController::reject
 * @see app/Http/Controllers/BusinessAdvisorAffiliationController.php:23
 * @route '/business-advisor-affiliations/{business_advisor_affiliation}/reject'
 */
reject.url = (args: { business_advisor_affiliation: number | { id: number } } | [business_advisor_affiliation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { business_advisor_affiliation: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { business_advisor_affiliation: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    business_advisor_affiliation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        business_advisor_affiliation: typeof args.business_advisor_affiliation === 'object'
                ? args.business_advisor_affiliation.id
                : args.business_advisor_affiliation,
                }

    return reject.definition.url
            .replace('{business_advisor_affiliation}', parsedArgs.business_advisor_affiliation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BusinessAdvisorAffiliationController::reject
 * @see app/Http/Controllers/BusinessAdvisorAffiliationController.php:23
 * @route '/business-advisor-affiliations/{business_advisor_affiliation}/reject'
 */
reject.post = (args: { business_advisor_affiliation: number | { id: number } } | [business_advisor_affiliation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\BusinessAdvisorAffiliationController::reject
 * @see app/Http/Controllers/BusinessAdvisorAffiliationController.php:23
 * @route '/business-advisor-affiliations/{business_advisor_affiliation}/reject'
 */
    const rejectForm = (args: { business_advisor_affiliation: number | { id: number } } | [business_advisor_affiliation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reject.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BusinessAdvisorAffiliationController::reject
 * @see app/Http/Controllers/BusinessAdvisorAffiliationController.php:23
 * @route '/business-advisor-affiliations/{business_advisor_affiliation}/reject'
 */
        rejectForm.post = (args: { business_advisor_affiliation: number | { id: number } } | [business_advisor_affiliation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reject.url(args, options),
            method: 'post',
        })
    
    reject.form = rejectForm
const businessAdvisorAffiliations = {
    verify: Object.assign(verify, verify),
reject: Object.assign(reject, reject),
}

export default businessAdvisorAffiliations