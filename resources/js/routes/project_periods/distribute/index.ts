import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectPeriodController::propose
 * @see app/Http/Controllers/ProjectPeriodController.php:209
 * @route '/project-periods/{project_period}/distribute/propose'
 */
export const propose = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: propose.url(args, options),
    method: 'post',
})

propose.definition = {
    methods: ["post"],
    url: '/project-periods/{project_period}/distribute/propose',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectPeriodController::propose
 * @see app/Http/Controllers/ProjectPeriodController.php:209
 * @route '/project-periods/{project_period}/distribute/propose'
 */
propose.url = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return propose.definition.url
            .replace('{project_period}', parsedArgs.project_period.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPeriodController::propose
 * @see app/Http/Controllers/ProjectPeriodController.php:209
 * @route '/project-periods/{project_period}/distribute/propose'
 */
propose.post = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: propose.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ProjectPeriodController::propose
 * @see app/Http/Controllers/ProjectPeriodController.php:209
 * @route '/project-periods/{project_period}/distribute/propose'
 */
    const proposeForm = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: propose.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProjectPeriodController::propose
 * @see app/Http/Controllers/ProjectPeriodController.php:209
 * @route '/project-periods/{project_period}/distribute/propose'
 */
        proposeForm.post = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: propose.url(args, options),
            method: 'post',
        })
    
    propose.form = proposeForm
/**
* @see \App\Http\Controllers\RepositoryAdvisorController::apply
 * @see app/Http/Controllers/RepositoryAdvisorController.php:82
 * @route '/project-periods/{project_period}/distribute/apply'
 */
export const apply = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: apply.url(args, options),
    method: 'post',
})

apply.definition = {
    methods: ["post"],
    url: '/project-periods/{project_period}/distribute/apply',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RepositoryAdvisorController::apply
 * @see app/Http/Controllers/RepositoryAdvisorController.php:82
 * @route '/project-periods/{project_period}/distribute/apply'
 */
apply.url = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return apply.definition.url
            .replace('{project_period}', parsedArgs.project_period.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepositoryAdvisorController::apply
 * @see app/Http/Controllers/RepositoryAdvisorController.php:82
 * @route '/project-periods/{project_period}/distribute/apply'
 */
apply.post = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: apply.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\RepositoryAdvisorController::apply
 * @see app/Http/Controllers/RepositoryAdvisorController.php:82
 * @route '/project-periods/{project_period}/distribute/apply'
 */
    const applyForm = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: apply.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RepositoryAdvisorController::apply
 * @see app/Http/Controllers/RepositoryAdvisorController.php:82
 * @route '/project-periods/{project_period}/distribute/apply'
 */
        applyForm.post = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: apply.url(args, options),
            method: 'post',
        })
    
    apply.form = applyForm
const distribute = {
    propose: Object.assign(propose, propose),
apply: Object.assign(apply, apply),
}

export default distribute