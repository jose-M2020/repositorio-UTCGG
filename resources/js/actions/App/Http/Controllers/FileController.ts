import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\FileController::download
 * @see app/Http/Controllers/FileController.php:137
 * @route '/files/download/{file}'
 */
export const download = (args: { file: string | number | { id: string | number } } | [file: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/files/download/{file}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FileController::download
 * @see app/Http/Controllers/FileController.php:137
 * @route '/files/download/{file}'
 */
download.url = (args: { file: string | number | { id: string | number } } | [file: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { file: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { file: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    file: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        file: typeof args.file === 'object'
                ? args.file.id
                : args.file,
                }

    return download.definition.url
            .replace('{file}', parsedArgs.file.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FileController::download
 * @see app/Http/Controllers/FileController.php:137
 * @route '/files/download/{file}'
 */
download.get = (args: { file: string | number | { id: string | number } } | [file: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FileController::download
 * @see app/Http/Controllers/FileController.php:137
 * @route '/files/download/{file}'
 */
download.head = (args: { file: string | number | { id: string | number } } | [file: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FileController::download
 * @see app/Http/Controllers/FileController.php:137
 * @route '/files/download/{file}'
 */
    const downloadForm = (args: { file: string | number | { id: string | number } } | [file: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: download.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FileController::download
 * @see app/Http/Controllers/FileController.php:137
 * @route '/files/download/{file}'
 */
        downloadForm.get = (args: { file: string | number | { id: string | number } } | [file: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FileController::download
 * @see app/Http/Controllers/FileController.php:137
 * @route '/files/download/{file}'
 */
        downloadForm.head = (args: { file: string | number | { id: string | number } } | [file: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    download.form = downloadForm
/**
* @see \App\Http\Controllers\FileController::create
 * @see app/Http/Controllers/FileController.php:34
 * @route '/mi-cuenta/repositorios/{repositorio}/archivos/upload'
 */
export const create = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/mi-cuenta/repositorios/{repositorio}/archivos/upload',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FileController::create
 * @see app/Http/Controllers/FileController.php:34
 * @route '/mi-cuenta/repositorios/{repositorio}/archivos/upload'
 */
create.url = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
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

    return create.definition.url
            .replace('{repositorio}', parsedArgs.repositorio.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FileController::create
 * @see app/Http/Controllers/FileController.php:34
 * @route '/mi-cuenta/repositorios/{repositorio}/archivos/upload'
 */
create.get = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FileController::create
 * @see app/Http/Controllers/FileController.php:34
 * @route '/mi-cuenta/repositorios/{repositorio}/archivos/upload'
 */
create.head = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FileController::create
 * @see app/Http/Controllers/FileController.php:34
 * @route '/mi-cuenta/repositorios/{repositorio}/archivos/upload'
 */
    const createForm = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FileController::create
 * @see app/Http/Controllers/FileController.php:34
 * @route '/mi-cuenta/repositorios/{repositorio}/archivos/upload'
 */
        createForm.get = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FileController::create
 * @see app/Http/Controllers/FileController.php:34
 * @route '/mi-cuenta/repositorios/{repositorio}/archivos/upload'
 */
        createForm.head = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\FileController::store
 * @see app/Http/Controllers/FileController.php:45
 * @route '/mi-cuenta/repositorios/{repositorio}/archivos/upload'
 */
export const store = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/mi-cuenta/repositorios/{repositorio}/archivos/upload',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\FileController::store
 * @see app/Http/Controllers/FileController.php:45
 * @route '/mi-cuenta/repositorios/{repositorio}/archivos/upload'
 */
store.url = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
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
* @see \App\Http\Controllers\FileController::store
 * @see app/Http/Controllers/FileController.php:45
 * @route '/mi-cuenta/repositorios/{repositorio}/archivos/upload'
 */
store.post = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\FileController::store
 * @see app/Http/Controllers/FileController.php:45
 * @route '/mi-cuenta/repositorios/{repositorio}/archivos/upload'
 */
    const storeForm = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FileController::store
 * @see app/Http/Controllers/FileController.php:45
 * @route '/mi-cuenta/repositorios/{repositorio}/archivos/upload'
 */
        storeForm.post = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\FileController::update
 * @see app/Http/Controllers/FileController.php:82
 * @route '/mi-cuenta/repositorios/{repositorio}/archivos/{file}'
 */
export const update = (args: { repositorio: string | number | { slug: string | number }, file: string | number | { id: string | number } } | [repositorio: string | number | { slug: string | number }, file: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/mi-cuenta/repositorios/{repositorio}/archivos/{file}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\FileController::update
 * @see app/Http/Controllers/FileController.php:82
 * @route '/mi-cuenta/repositorios/{repositorio}/archivos/{file}'
 */
update.url = (args: { repositorio: string | number | { slug: string | number }, file: string | number | { id: string | number } } | [repositorio: string | number | { slug: string | number }, file: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    repositorio: args[0],
                    file: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        repositorio: typeof args.repositorio === 'object'
                ? args.repositorio.slug
                : args.repositorio,
                                file: typeof args.file === 'object'
                ? args.file.id
                : args.file,
                }

    return update.definition.url
            .replace('{repositorio}', parsedArgs.repositorio.toString())
            .replace('{file}', parsedArgs.file.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FileController::update
 * @see app/Http/Controllers/FileController.php:82
 * @route '/mi-cuenta/repositorios/{repositorio}/archivos/{file}'
 */
update.put = (args: { repositorio: string | number | { slug: string | number }, file: string | number | { id: string | number } } | [repositorio: string | number | { slug: string | number }, file: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\FileController::update
 * @see app/Http/Controllers/FileController.php:82
 * @route '/mi-cuenta/repositorios/{repositorio}/archivos/{file}'
 */
    const updateForm = (args: { repositorio: string | number | { slug: string | number }, file: string | number | { id: string | number } } | [repositorio: string | number | { slug: string | number }, file: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FileController::update
 * @see app/Http/Controllers/FileController.php:82
 * @route '/mi-cuenta/repositorios/{repositorio}/archivos/{file}'
 */
        updateForm.put = (args: { repositorio: string | number | { slug: string | number }, file: string | number | { id: string | number } } | [repositorio: string | number | { slug: string | number }, file: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\FileController::destroy
 * @see app/Http/Controllers/FileController.php:98
 * @route '/mi-cuenta/repositorios/{repositorio}/archivos/{file}'
 */
export const destroy = (args: { repositorio: string | number | { slug: string | number }, file: string | number | { id: string | number } } | [repositorio: string | number | { slug: string | number }, file: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/mi-cuenta/repositorios/{repositorio}/archivos/{file}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\FileController::destroy
 * @see app/Http/Controllers/FileController.php:98
 * @route '/mi-cuenta/repositorios/{repositorio}/archivos/{file}'
 */
destroy.url = (args: { repositorio: string | number | { slug: string | number }, file: string | number | { id: string | number } } | [repositorio: string | number | { slug: string | number }, file: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    repositorio: args[0],
                    file: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        repositorio: typeof args.repositorio === 'object'
                ? args.repositorio.slug
                : args.repositorio,
                                file: typeof args.file === 'object'
                ? args.file.id
                : args.file,
                }

    return destroy.definition.url
            .replace('{repositorio}', parsedArgs.repositorio.toString())
            .replace('{file}', parsedArgs.file.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FileController::destroy
 * @see app/Http/Controllers/FileController.php:98
 * @route '/mi-cuenta/repositorios/{repositorio}/archivos/{file}'
 */
destroy.delete = (args: { repositorio: string | number | { slug: string | number }, file: string | number | { id: string | number } } | [repositorio: string | number | { slug: string | number }, file: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\FileController::destroy
 * @see app/Http/Controllers/FileController.php:98
 * @route '/mi-cuenta/repositorios/{repositorio}/archivos/{file}'
 */
    const destroyForm = (args: { repositorio: string | number | { slug: string | number }, file: string | number | { id: string | number } } | [repositorio: string | number | { slug: string | number }, file: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/FileController.php:98
 * @route '/mi-cuenta/repositorios/{repositorio}/archivos/{file}'
 */
        destroyForm.delete = (args: { repositorio: string | number | { slug: string | number }, file: string | number | { id: string | number } } | [repositorio: string | number | { slug: string | number }, file: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\FileController::destroyImage
 * @see app/Http/Controllers/FileController.php:113
 * @route '/mi-cuenta/repositorios/{repositorio}/imagenes/{index}'
 */
export const destroyImage = (args: { repositorio: string | number | { slug: string | number }, index: string | number } | [repositorio: string | number | { slug: string | number }, index: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyImage.url(args, options),
    method: 'delete',
})

destroyImage.definition = {
    methods: ["delete"],
    url: '/mi-cuenta/repositorios/{repositorio}/imagenes/{index}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\FileController::destroyImage
 * @see app/Http/Controllers/FileController.php:113
 * @route '/mi-cuenta/repositorios/{repositorio}/imagenes/{index}'
 */
destroyImage.url = (args: { repositorio: string | number | { slug: string | number }, index: string | number } | [repositorio: string | number | { slug: string | number }, index: string | number ], options?: RouteQueryOptions) => {
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

    return destroyImage.definition.url
            .replace('{repositorio}', parsedArgs.repositorio.toString())
            .replace('{index}', parsedArgs.index.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FileController::destroyImage
 * @see app/Http/Controllers/FileController.php:113
 * @route '/mi-cuenta/repositorios/{repositorio}/imagenes/{index}'
 */
destroyImage.delete = (args: { repositorio: string | number | { slug: string | number }, index: string | number } | [repositorio: string | number | { slug: string | number }, index: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyImage.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\FileController::destroyImage
 * @see app/Http/Controllers/FileController.php:113
 * @route '/mi-cuenta/repositorios/{repositorio}/imagenes/{index}'
 */
    const destroyImageForm = (args: { repositorio: string | number | { slug: string | number }, index: string | number } | [repositorio: string | number | { slug: string | number }, index: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyImage.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FileController::destroyImage
 * @see app/Http/Controllers/FileController.php:113
 * @route '/mi-cuenta/repositorios/{repositorio}/imagenes/{index}'
 */
        destroyImageForm.delete = (args: { repositorio: string | number | { slug: string | number }, index: string | number } | [repositorio: string | number | { slug: string | number }, index: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyImage.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyImage.form = destroyImageForm
const FileController = { download, create, store, update, destroy, destroyImage }

export default FileController