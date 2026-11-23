import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\RepositoryBusinessAdvisorController::store
 * @see app/Http/Controllers/RepositoryBusinessAdvisorController.php:15
 * @route '/repositories/{repository}/business-advisors'
 */
export const store = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/repositories/{repository}/business-advisors',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RepositoryBusinessAdvisorController::store
 * @see app/Http/Controllers/RepositoryBusinessAdvisorController.php:15
 * @route '/repositories/{repository}/business-advisors'
 */
store.url = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { repository: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { repository: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    repository: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        repository: typeof args.repository === 'object'
                ? args.repository.slug
                : args.repository,
                }

    return store.definition.url
            .replace('{repository}', parsedArgs.repository.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepositoryBusinessAdvisorController::store
 * @see app/Http/Controllers/RepositoryBusinessAdvisorController.php:15
 * @route '/repositories/{repository}/business-advisors'
 */
store.post = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\RepositoryBusinessAdvisorController::store
 * @see app/Http/Controllers/RepositoryBusinessAdvisorController.php:15
 * @route '/repositories/{repository}/business-advisors'
 */
    const storeForm = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RepositoryBusinessAdvisorController::store
 * @see app/Http/Controllers/RepositoryBusinessAdvisorController.php:15
 * @route '/repositories/{repository}/business-advisors'
 */
        storeForm.post = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\RepositoryBusinessAdvisorController::destroy
 * @see app/Http/Controllers/RepositoryBusinessAdvisorController.php:54
 * @route '/repositories/{repository}/business-advisors/{assignment}'
 */
export const destroy = (args: { repository: string | { slug: string }, assignment: number | { id: number } } | [repository: string | { slug: string }, assignment: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/repositories/{repository}/business-advisors/{assignment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RepositoryBusinessAdvisorController::destroy
 * @see app/Http/Controllers/RepositoryBusinessAdvisorController.php:54
 * @route '/repositories/{repository}/business-advisors/{assignment}'
 */
destroy.url = (args: { repository: string | { slug: string }, assignment: number | { id: number } } | [repository: string | { slug: string }, assignment: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    repository: args[0],
                    assignment: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        repository: typeof args.repository === 'object'
                ? args.repository.slug
                : args.repository,
                                assignment: typeof args.assignment === 'object'
                ? args.assignment.id
                : args.assignment,
                }

    return destroy.definition.url
            .replace('{repository}', parsedArgs.repository.toString())
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepositoryBusinessAdvisorController::destroy
 * @see app/Http/Controllers/RepositoryBusinessAdvisorController.php:54
 * @route '/repositories/{repository}/business-advisors/{assignment}'
 */
destroy.delete = (args: { repository: string | { slug: string }, assignment: number | { id: number } } | [repository: string | { slug: string }, assignment: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\RepositoryBusinessAdvisorController::destroy
 * @see app/Http/Controllers/RepositoryBusinessAdvisorController.php:54
 * @route '/repositories/{repository}/business-advisors/{assignment}'
 */
    const destroyForm = (args: { repository: string | { slug: string }, assignment: number | { id: number } } | [repository: string | { slug: string }, assignment: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RepositoryBusinessAdvisorController::destroy
 * @see app/Http/Controllers/RepositoryBusinessAdvisorController.php:54
 * @route '/repositories/{repository}/business-advisors/{assignment}'
 */
        destroyForm.delete = (args: { repository: string | { slug: string }, assignment: number | { id: number } } | [repository: string | { slug: string }, assignment: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\RepositoryBusinessAdvisorController::resend
 * @see app/Http/Controllers/RepositoryBusinessAdvisorController.php:70
 * @route '/repositories/{repository}/business-advisors/{assignment}/resend'
 */
export const resend = (args: { repository: string | { slug: string }, assignment: number | { id: number } } | [repository: string | { slug: string }, assignment: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resend.url(args, options),
    method: 'post',
})

resend.definition = {
    methods: ["post"],
    url: '/repositories/{repository}/business-advisors/{assignment}/resend',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RepositoryBusinessAdvisorController::resend
 * @see app/Http/Controllers/RepositoryBusinessAdvisorController.php:70
 * @route '/repositories/{repository}/business-advisors/{assignment}/resend'
 */
resend.url = (args: { repository: string | { slug: string }, assignment: number | { id: number } } | [repository: string | { slug: string }, assignment: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    repository: args[0],
                    assignment: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        repository: typeof args.repository === 'object'
                ? args.repository.slug
                : args.repository,
                                assignment: typeof args.assignment === 'object'
                ? args.assignment.id
                : args.assignment,
                }

    return resend.definition.url
            .replace('{repository}', parsedArgs.repository.toString())
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepositoryBusinessAdvisorController::resend
 * @see app/Http/Controllers/RepositoryBusinessAdvisorController.php:70
 * @route '/repositories/{repository}/business-advisors/{assignment}/resend'
 */
resend.post = (args: { repository: string | { slug: string }, assignment: number | { id: number } } | [repository: string | { slug: string }, assignment: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resend.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\RepositoryBusinessAdvisorController::resend
 * @see app/Http/Controllers/RepositoryBusinessAdvisorController.php:70
 * @route '/repositories/{repository}/business-advisors/{assignment}/resend'
 */
    const resendForm = (args: { repository: string | { slug: string }, assignment: number | { id: number } } | [repository: string | { slug: string }, assignment: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: resend.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RepositoryBusinessAdvisorController::resend
 * @see app/Http/Controllers/RepositoryBusinessAdvisorController.php:70
 * @route '/repositories/{repository}/business-advisors/{assignment}/resend'
 */
        resendForm.post = (args: { repository: string | { slug: string }, assignment: number | { id: number } } | [repository: string | { slug: string }, assignment: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: resend.url(args, options),
            method: 'post',
        })
    
    resend.form = resendForm
const businessAdvisors = {
    store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
resend: Object.assign(resend, resend),
}

export default businessAdvisors