import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\RepositoryController::show
 * @see app/Http/Controllers/RepositoryController.php:242
 * @route '/account/repositories/{repository}'
 */
export const show = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/account/repositories/{repository}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RepositoryController::show
 * @see app/Http/Controllers/RepositoryController.php:242
 * @route '/account/repositories/{repository}'
 */
show.url = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{repository}', parsedArgs.repository.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepositoryController::show
 * @see app/Http/Controllers/RepositoryController.php:242
 * @route '/account/repositories/{repository}'
 */
show.get = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RepositoryController::show
 * @see app/Http/Controllers/RepositoryController.php:242
 * @route '/account/repositories/{repository}'
 */
show.head = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RepositoryController::show
 * @see app/Http/Controllers/RepositoryController.php:242
 * @route '/account/repositories/{repository}'
 */
    const showForm = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RepositoryController::show
 * @see app/Http/Controllers/RepositoryController.php:242
 * @route '/account/repositories/{repository}'
 */
        showForm.get = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RepositoryController::show
 * @see app/Http/Controllers/RepositoryController.php:242
 * @route '/account/repositories/{repository}'
 */
        showForm.head = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const account = {
    show: Object.assign(show, show),
}

export default account