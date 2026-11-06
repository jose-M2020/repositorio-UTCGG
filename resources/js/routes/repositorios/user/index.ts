import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\RepositorioController::show
 * @see app/Http/Controllers/RepositorioController.php:173
 * @route '/mi-cuenta/repositorios/{repositorio}'
 */
export const show = (args: { repositorio: string | { slug: string } } | [repositorio: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/mi-cuenta/repositorios/{repositorio}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RepositorioController::show
 * @see app/Http/Controllers/RepositorioController.php:173
 * @route '/mi-cuenta/repositorios/{repositorio}'
 */
show.url = (args: { repositorio: string | { slug: string } } | [repositorio: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { repositorio: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { repositorio: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    repositorio: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        repositorio: typeof args.repositorio === 'object'
                ? args.repositorio.slug
                : args.repositorio,
                }

    return show.definition.url
            .replace('{repositorio}', parsedArgs.repositorio.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepositorioController::show
 * @see app/Http/Controllers/RepositorioController.php:173
 * @route '/mi-cuenta/repositorios/{repositorio}'
 */
show.get = (args: { repositorio: string | { slug: string } } | [repositorio: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RepositorioController::show
 * @see app/Http/Controllers/RepositorioController.php:173
 * @route '/mi-cuenta/repositorios/{repositorio}'
 */
show.head = (args: { repositorio: string | { slug: string } } | [repositorio: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RepositorioController::show
 * @see app/Http/Controllers/RepositorioController.php:173
 * @route '/mi-cuenta/repositorios/{repositorio}'
 */
    const showForm = (args: { repositorio: string | { slug: string } } | [repositorio: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RepositorioController::show
 * @see app/Http/Controllers/RepositorioController.php:173
 * @route '/mi-cuenta/repositorios/{repositorio}'
 */
        showForm.get = (args: { repositorio: string | { slug: string } } | [repositorio: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RepositorioController::show
 * @see app/Http/Controllers/RepositorioController.php:173
 * @route '/mi-cuenta/repositorios/{repositorio}'
 */
        showForm.head = (args: { repositorio: string | { slug: string } } | [repositorio: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const user = {
    show: Object.assign(show, show),
}

export default user