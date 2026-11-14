import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RepositoryMemberController::store
 * @see app/Http/Controllers/RepositoryMemberController.php:22
 * @route '/account/repositories/{repository}/members'
 */
export const store = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/account/repositories/{repository}/members',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RepositoryMemberController::store
 * @see app/Http/Controllers/RepositoryMemberController.php:22
 * @route '/account/repositories/{repository}/members'
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
* @see \App\Http\Controllers\RepositoryMemberController::store
 * @see app/Http/Controllers/RepositoryMemberController.php:22
 * @route '/account/repositories/{repository}/members'
 */
store.post = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\RepositoryMemberController::store
 * @see app/Http/Controllers/RepositoryMemberController.php:22
 * @route '/account/repositories/{repository}/members'
 */
    const storeForm = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RepositoryMemberController::store
 * @see app/Http/Controllers/RepositoryMemberController.php:22
 * @route '/account/repositories/{repository}/members'
 */
        storeForm.post = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\RepositoryMemberController::destroy
 * @see app/Http/Controllers/RepositoryMemberController.php:31
 * @route '/account/repositories/{repository}/members/{user}'
 */
export const destroy = (args: { repository: string | { slug: string }, user: number | { id: number } } | [repository: string | { slug: string }, user: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/account/repositories/{repository}/members/{user}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RepositoryMemberController::destroy
 * @see app/Http/Controllers/RepositoryMemberController.php:31
 * @route '/account/repositories/{repository}/members/{user}'
 */
destroy.url = (args: { repository: string | { slug: string }, user: number | { id: number } } | [repository: string | { slug: string }, user: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    repository: args[0],
                    user: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        repository: typeof args.repository === 'object'
                ? args.repository.slug
                : args.repository,
                                user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return destroy.definition.url
            .replace('{repository}', parsedArgs.repository.toString())
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepositoryMemberController::destroy
 * @see app/Http/Controllers/RepositoryMemberController.php:31
 * @route '/account/repositories/{repository}/members/{user}'
 */
destroy.delete = (args: { repository: string | { slug: string }, user: number | { id: number } } | [repository: string | { slug: string }, user: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\RepositoryMemberController::destroy
 * @see app/Http/Controllers/RepositoryMemberController.php:31
 * @route '/account/repositories/{repository}/members/{user}'
 */
    const destroyForm = (args: { repository: string | { slug: string }, user: number | { id: number } } | [repository: string | { slug: string }, user: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RepositoryMemberController::destroy
 * @see app/Http/Controllers/RepositoryMemberController.php:31
 * @route '/account/repositories/{repository}/members/{user}'
 */
        destroyForm.delete = (args: { repository: string | { slug: string }, user: number | { id: number } } | [repository: string | { slug: string }, user: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const RepositoryMemberController = { store, destroy }

export default RepositoryMemberController