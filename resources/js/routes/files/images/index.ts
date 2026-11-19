import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\FileController::destroy
 * @see app/Http/Controllers/FileController.php:108
 * @route '/account/repositories/{repository}/images/{index}'
 */
export const destroy = (args: { repository: string | { slug: string }, index: string | number } | [repository: string | { slug: string }, index: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/account/repositories/{repository}/images/{index}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\FileController::destroy
 * @see app/Http/Controllers/FileController.php:108
 * @route '/account/repositories/{repository}/images/{index}'
 */
destroy.url = (args: { repository: string | { slug: string }, index: string | number } | [repository: string | { slug: string }, index: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    repository: args[0],
                    index: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        repository: typeof args.repository === 'object'
                ? args.repository.slug
                : args.repository,
                                index: args.index,
                }

    return destroy.definition.url
            .replace('{repository}', parsedArgs.repository.toString())
            .replace('{index}', parsedArgs.index.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FileController::destroy
 * @see app/Http/Controllers/FileController.php:108
 * @route '/account/repositories/{repository}/images/{index}'
 */
destroy.delete = (args: { repository: string | { slug: string }, index: string | number } | [repository: string | { slug: string }, index: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\FileController::destroy
 * @see app/Http/Controllers/FileController.php:108
 * @route '/account/repositories/{repository}/images/{index}'
 */
    const destroyForm = (args: { repository: string | { slug: string }, index: string | number } | [repository: string | { slug: string }, index: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FileController::destroy
 * @see app/Http/Controllers/FileController.php:108
 * @route '/account/repositories/{repository}/images/{index}'
 */
        destroyForm.delete = (args: { repository: string | { slug: string }, index: string | number } | [repository: string | { slug: string }, index: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const images = {
    destroy: Object.assign(destroy, destroy),
}

export default images