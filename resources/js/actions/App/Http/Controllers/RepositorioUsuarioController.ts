import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RepositorioUsuarioController::store
 * @see app/Http/Controllers/RepositorioUsuarioController.php:22
 * @route '/mi-cuenta/repositorios/{repositorio}/members'
 */
export const store = (args: { repositorio: string | { slug: string } } | [repositorio: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/mi-cuenta/repositorios/{repositorio}/members',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RepositorioUsuarioController::store
 * @see app/Http/Controllers/RepositorioUsuarioController.php:22
 * @route '/mi-cuenta/repositorios/{repositorio}/members'
 */
store.url = (args: { repositorio: string | { slug: string } } | [repositorio: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{repositorio}', parsedArgs.repositorio.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepositorioUsuarioController::store
 * @see app/Http/Controllers/RepositorioUsuarioController.php:22
 * @route '/mi-cuenta/repositorios/{repositorio}/members'
 */
store.post = (args: { repositorio: string | { slug: string } } | [repositorio: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\RepositorioUsuarioController::store
 * @see app/Http/Controllers/RepositorioUsuarioController.php:22
 * @route '/mi-cuenta/repositorios/{repositorio}/members'
 */
    const storeForm = (args: { repositorio: string | { slug: string } } | [repositorio: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RepositorioUsuarioController::store
 * @see app/Http/Controllers/RepositorioUsuarioController.php:22
 * @route '/mi-cuenta/repositorios/{repositorio}/members'
 */
        storeForm.post = (args: { repositorio: string | { slug: string } } | [repositorio: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\RepositorioUsuarioController::destroy
 * @see app/Http/Controllers/RepositorioUsuarioController.php:31
 * @route '/mi-cuenta/repositorios/{repositorio}/members/{user}'
 */
export const destroy = (args: { repositorio: string | { slug: string }, user: number | { id: number } } | [repositorio: string | { slug: string }, user: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/mi-cuenta/repositorios/{repositorio}/members/{user}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RepositorioUsuarioController::destroy
 * @see app/Http/Controllers/RepositorioUsuarioController.php:31
 * @route '/mi-cuenta/repositorios/{repositorio}/members/{user}'
 */
destroy.url = (args: { repositorio: string | { slug: string }, user: number | { id: number } } | [repositorio: string | { slug: string }, user: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    repositorio: args[0],
                    user: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        repositorio: typeof args.repositorio === 'object'
                ? args.repositorio.slug
                : args.repositorio,
                                user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return destroy.definition.url
            .replace('{repositorio}', parsedArgs.repositorio.toString())
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepositorioUsuarioController::destroy
 * @see app/Http/Controllers/RepositorioUsuarioController.php:31
 * @route '/mi-cuenta/repositorios/{repositorio}/members/{user}'
 */
destroy.delete = (args: { repositorio: string | { slug: string }, user: number | { id: number } } | [repositorio: string | { slug: string }, user: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\RepositorioUsuarioController::destroy
 * @see app/Http/Controllers/RepositorioUsuarioController.php:31
 * @route '/mi-cuenta/repositorios/{repositorio}/members/{user}'
 */
    const destroyForm = (args: { repositorio: string | { slug: string }, user: number | { id: number } } | [repositorio: string | { slug: string }, user: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RepositorioUsuarioController::destroy
 * @see app/Http/Controllers/RepositorioUsuarioController.php:31
 * @route '/mi-cuenta/repositorios/{repositorio}/members/{user}'
 */
        destroyForm.delete = (args: { repositorio: string | { slug: string }, user: number | { id: number } } | [repositorio: string | { slug: string }, user: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const RepositorioUsuarioController = { store, destroy }

export default RepositorioUsuarioController