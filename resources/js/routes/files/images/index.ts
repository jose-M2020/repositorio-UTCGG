import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\FileController::destroy
 * @see app/Http/Controllers/FileController.php:113
 * @route '/mi-cuenta/repositorios/{repositorio}/imagenes/{index}'
 */
export const destroy = (args: { repositorio: string | number | { slug: string | number }, index: string | number } | [repositorio: string | number | { slug: string | number }, index: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/mi-cuenta/repositorios/{repositorio}/imagenes/{index}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\FileController::destroy
 * @see app/Http/Controllers/FileController.php:113
 * @route '/mi-cuenta/repositorios/{repositorio}/imagenes/{index}'
 */
destroy.url = (args: { repositorio: string | number | { slug: string | number }, index: string | number } | [repositorio: string | number | { slug: string | number }, index: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    repositorio: args[0],
                    index: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        repositorio: typeof args.repositorio === 'object'
                ? args.repositorio.slug
                : args.repositorio,
                                index: args.index,
                }

    return destroy.definition.url
            .replace('{repositorio}', parsedArgs.repositorio.toString())
            .replace('{index}', parsedArgs.index.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FileController::destroy
 * @see app/Http/Controllers/FileController.php:113
 * @route '/mi-cuenta/repositorios/{repositorio}/imagenes/{index}'
 */
destroy.delete = (args: { repositorio: string | number | { slug: string | number }, index: string | number } | [repositorio: string | number | { slug: string | number }, index: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\FileController::destroy
 * @see app/Http/Controllers/FileController.php:113
 * @route '/mi-cuenta/repositorios/{repositorio}/imagenes/{index}'
 */
    const destroyForm = (args: { repositorio: string | number | { slug: string | number }, index: string | number } | [repositorio: string | number | { slug: string | number }, index: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/FileController.php:113
 * @route '/mi-cuenta/repositorios/{repositorio}/imagenes/{index}'
 */
        destroyForm.delete = (args: { repositorio: string | number | { slug: string | number }, index: string | number } | [repositorio: string | number | { slug: string | number }, index: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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