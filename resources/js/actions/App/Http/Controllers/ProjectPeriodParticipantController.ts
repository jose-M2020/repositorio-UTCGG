import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectPeriodParticipantController::preview
 * @see app/Http/Controllers/ProjectPeriodParticipantController.php:25
 * @route '/project-periods/{project_period}/participants/preview'
 */
export const preview = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: preview.url(args, options),
    method: 'post',
})

preview.definition = {
    methods: ["post"],
    url: '/project-periods/{project_period}/participants/preview',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectPeriodParticipantController::preview
 * @see app/Http/Controllers/ProjectPeriodParticipantController.php:25
 * @route '/project-periods/{project_period}/participants/preview'
 */
preview.url = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return preview.definition.url
            .replace('{project_period}', parsedArgs.project_period.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPeriodParticipantController::preview
 * @see app/Http/Controllers/ProjectPeriodParticipantController.php:25
 * @route '/project-periods/{project_period}/participants/preview'
 */
preview.post = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: preview.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ProjectPeriodParticipantController::preview
 * @see app/Http/Controllers/ProjectPeriodParticipantController.php:25
 * @route '/project-periods/{project_period}/participants/preview'
 */
    const previewForm = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: preview.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProjectPeriodParticipantController::preview
 * @see app/Http/Controllers/ProjectPeriodParticipantController.php:25
 * @route '/project-periods/{project_period}/participants/preview'
 */
        previewForm.post = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: preview.url(args, options),
            method: 'post',
        })
    
    preview.form = previewForm
/**
* @see \App\Http\Controllers\ProjectPeriodParticipantController::store
 * @see app/Http/Controllers/ProjectPeriodParticipantController.php:44
 * @route '/project-periods/{project_period}/participants'
 */
export const store = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/project-periods/{project_period}/participants',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectPeriodParticipantController::store
 * @see app/Http/Controllers/ProjectPeriodParticipantController.php:44
 * @route '/project-periods/{project_period}/participants'
 */
store.url = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{project_period}', parsedArgs.project_period.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPeriodParticipantController::store
 * @see app/Http/Controllers/ProjectPeriodParticipantController.php:44
 * @route '/project-periods/{project_period}/participants'
 */
store.post = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ProjectPeriodParticipantController::store
 * @see app/Http/Controllers/ProjectPeriodParticipantController.php:44
 * @route '/project-periods/{project_period}/participants'
 */
    const storeForm = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProjectPeriodParticipantController::store
 * @see app/Http/Controllers/ProjectPeriodParticipantController.php:44
 * @route '/project-periods/{project_period}/participants'
 */
        storeForm.post = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const ProjectPeriodParticipantController = { preview, store }

export default ProjectPeriodParticipantController