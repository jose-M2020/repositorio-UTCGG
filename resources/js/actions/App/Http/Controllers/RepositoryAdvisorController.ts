import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RepositoryAdvisorController::applyDistribution
 * @see app/Http/Controllers/RepositoryAdvisorController.php:82
 * @route '/project-periods/{project_period}/distribute/apply'
 */
export const applyDistribution = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: applyDistribution.url(args, options),
    method: 'post',
})

applyDistribution.definition = {
    methods: ["post"],
    url: '/project-periods/{project_period}/distribute/apply',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RepositoryAdvisorController::applyDistribution
 * @see app/Http/Controllers/RepositoryAdvisorController.php:82
 * @route '/project-periods/{project_period}/distribute/apply'
 */
applyDistribution.url = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return applyDistribution.definition.url
            .replace('{project_period}', parsedArgs.project_period.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepositoryAdvisorController::applyDistribution
 * @see app/Http/Controllers/RepositoryAdvisorController.php:82
 * @route '/project-periods/{project_period}/distribute/apply'
 */
applyDistribution.post = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: applyDistribution.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\RepositoryAdvisorController::applyDistribution
 * @see app/Http/Controllers/RepositoryAdvisorController.php:82
 * @route '/project-periods/{project_period}/distribute/apply'
 */
    const applyDistributionForm = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: applyDistribution.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RepositoryAdvisorController::applyDistribution
 * @see app/Http/Controllers/RepositoryAdvisorController.php:82
 * @route '/project-periods/{project_period}/distribute/apply'
 */
        applyDistributionForm.post = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: applyDistribution.url(args, options),
            method: 'post',
        })
    
    applyDistribution.form = applyDistributionForm
/**
* @see \App\Http\Controllers\RepositoryAdvisorController::assign
 * @see app/Http/Controllers/RepositoryAdvisorController.php:30
 * @route '/repositories/{repository}/advisors'
 */
export const assign = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assign.url(args, options),
    method: 'post',
})

assign.definition = {
    methods: ["post"],
    url: '/repositories/{repository}/advisors',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RepositoryAdvisorController::assign
 * @see app/Http/Controllers/RepositoryAdvisorController.php:30
 * @route '/repositories/{repository}/advisors'
 */
assign.url = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return assign.definition.url
            .replace('{repository}', parsedArgs.repository.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepositoryAdvisorController::assign
 * @see app/Http/Controllers/RepositoryAdvisorController.php:30
 * @route '/repositories/{repository}/advisors'
 */
assign.post = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assign.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\RepositoryAdvisorController::assign
 * @see app/Http/Controllers/RepositoryAdvisorController.php:30
 * @route '/repositories/{repository}/advisors'
 */
    const assignForm = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: assign.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RepositoryAdvisorController::assign
 * @see app/Http/Controllers/RepositoryAdvisorController.php:30
 * @route '/repositories/{repository}/advisors'
 */
        assignForm.post = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: assign.url(args, options),
            method: 'post',
        })
    
    assign.form = assignForm
/**
* @see \App\Http\Controllers\RepositoryAdvisorController::reassign
 * @see app/Http/Controllers/RepositoryAdvisorController.php:53
 * @route '/repositories/{repository}/advisors/reassign'
 */
export const reassign = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reassign.url(args, options),
    method: 'post',
})

reassign.definition = {
    methods: ["post"],
    url: '/repositories/{repository}/advisors/reassign',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RepositoryAdvisorController::reassign
 * @see app/Http/Controllers/RepositoryAdvisorController.php:53
 * @route '/repositories/{repository}/advisors/reassign'
 */
reassign.url = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return reassign.definition.url
            .replace('{repository}', parsedArgs.repository.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepositoryAdvisorController::reassign
 * @see app/Http/Controllers/RepositoryAdvisorController.php:53
 * @route '/repositories/{repository}/advisors/reassign'
 */
reassign.post = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reassign.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\RepositoryAdvisorController::reassign
 * @see app/Http/Controllers/RepositoryAdvisorController.php:53
 * @route '/repositories/{repository}/advisors/reassign'
 */
    const reassignForm = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reassign.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RepositoryAdvisorController::reassign
 * @see app/Http/Controllers/RepositoryAdvisorController.php:53
 * @route '/repositories/{repository}/advisors/reassign'
 */
        reassignForm.post = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reassign.url(args, options),
            method: 'post',
        })
    
    reassign.form = reassignForm
/**
* @see \App\Http\Controllers\RepositoryAdvisorController::release
 * @see app/Http/Controllers/RepositoryAdvisorController.php:70
 * @route '/repositories/{repository}/advisors/{repository_advisor}'
 */
export const release = (args: { repository: string | { slug: string }, repository_advisor: number | { id: number } } | [repository: string | { slug: string }, repository_advisor: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: release.url(args, options),
    method: 'delete',
})

release.definition = {
    methods: ["delete"],
    url: '/repositories/{repository}/advisors/{repository_advisor}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RepositoryAdvisorController::release
 * @see app/Http/Controllers/RepositoryAdvisorController.php:70
 * @route '/repositories/{repository}/advisors/{repository_advisor}'
 */
release.url = (args: { repository: string | { slug: string }, repository_advisor: number | { id: number } } | [repository: string | { slug: string }, repository_advisor: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    repository: args[0],
                    repository_advisor: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        repository: typeof args.repository === 'object'
                ? args.repository.slug
                : args.repository,
                                repository_advisor: typeof args.repository_advisor === 'object'
                ? args.repository_advisor.id
                : args.repository_advisor,
                }

    return release.definition.url
            .replace('{repository}', parsedArgs.repository.toString())
            .replace('{repository_advisor}', parsedArgs.repository_advisor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepositoryAdvisorController::release
 * @see app/Http/Controllers/RepositoryAdvisorController.php:70
 * @route '/repositories/{repository}/advisors/{repository_advisor}'
 */
release.delete = (args: { repository: string | { slug: string }, repository_advisor: number | { id: number } } | [repository: string | { slug: string }, repository_advisor: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: release.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\RepositoryAdvisorController::release
 * @see app/Http/Controllers/RepositoryAdvisorController.php:70
 * @route '/repositories/{repository}/advisors/{repository_advisor}'
 */
    const releaseForm = (args: { repository: string | { slug: string }, repository_advisor: number | { id: number } } | [repository: string | { slug: string }, repository_advisor: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: release.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RepositoryAdvisorController::release
 * @see app/Http/Controllers/RepositoryAdvisorController.php:70
 * @route '/repositories/{repository}/advisors/{repository_advisor}'
 */
        releaseForm.delete = (args: { repository: string | { slug: string }, repository_advisor: number | { id: number } } | [repository: string | { slug: string }, repository_advisor: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: release.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    release.form = releaseForm
const RepositoryAdvisorController = { applyDistribution, assign, reassign, release }

export default RepositoryAdvisorController