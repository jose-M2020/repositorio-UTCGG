import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import images from './images'
/**
* @see \App\Http\Controllers\FileController::download
 * @see app/Http/Controllers/FileController.php:137
 * @route '/files/download/{file}'
 */
export const download = (args: { file: number | { id: number } } | [file: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
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
download.url = (args: { file: number | { id: number } } | [file: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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
download.get = (args: { file: number | { id: number } } | [file: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FileController::download
 * @see app/Http/Controllers/FileController.php:137
 * @route '/files/download/{file}'
 */
download.head = (args: { file: number | { id: number } } | [file: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FileController::download
 * @see app/Http/Controllers/FileController.php:137
 * @route '/files/download/{file}'
 */
    const downloadForm = (args: { file: number | { id: number } } | [file: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: download.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FileController::download
 * @see app/Http/Controllers/FileController.php:137
 * @route '/files/download/{file}'
 */
        downloadForm.get = (args: { file: number | { id: number } } | [file: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FileController::download
 * @see app/Http/Controllers/FileController.php:137
 * @route '/files/download/{file}'
 */
        downloadForm.head = (args: { file: number | { id: number } } | [file: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
 * @route '/account/repositories/{repository}/files/upload'
 */
export const create = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/account/repositories/{repository}/files/upload',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FileController::create
 * @see app/Http/Controllers/FileController.php:34
 * @route '/account/repositories/{repository}/files/upload'
 */
create.url = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return create.definition.url
            .replace('{repository}', parsedArgs.repository.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FileController::create
 * @see app/Http/Controllers/FileController.php:34
 * @route '/account/repositories/{repository}/files/upload'
 */
create.get = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FileController::create
 * @see app/Http/Controllers/FileController.php:34
 * @route '/account/repositories/{repository}/files/upload'
 */
create.head = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FileController::create
 * @see app/Http/Controllers/FileController.php:34
 * @route '/account/repositories/{repository}/files/upload'
 */
    const createForm = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FileController::create
 * @see app/Http/Controllers/FileController.php:34
 * @route '/account/repositories/{repository}/files/upload'
 */
        createForm.get = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FileController::create
 * @see app/Http/Controllers/FileController.php:34
 * @route '/account/repositories/{repository}/files/upload'
 */
        createForm.head = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
 * @route '/account/repositories/{repository}/files/upload'
 */
export const store = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/account/repositories/{repository}/files/upload',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\FileController::store
 * @see app/Http/Controllers/FileController.php:45
 * @route '/account/repositories/{repository}/files/upload'
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
* @see \App\Http\Controllers\FileController::store
 * @see app/Http/Controllers/FileController.php:45
 * @route '/account/repositories/{repository}/files/upload'
 */
store.post = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\FileController::store
 * @see app/Http/Controllers/FileController.php:45
 * @route '/account/repositories/{repository}/files/upload'
 */
    const storeForm = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FileController::store
 * @see app/Http/Controllers/FileController.php:45
 * @route '/account/repositories/{repository}/files/upload'
 */
        storeForm.post = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\FileController::update
 * @see app/Http/Controllers/FileController.php:82
 * @route '/account/repositories/{repository}/files/{file}'
 */
export const update = (args: { repository: string | { slug: string }, file: number | { id: number } } | [repository: string | { slug: string }, file: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/account/repositories/{repository}/files/{file}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\FileController::update
 * @see app/Http/Controllers/FileController.php:82
 * @route '/account/repositories/{repository}/files/{file}'
 */
update.url = (args: { repository: string | { slug: string }, file: number | { id: number } } | [repository: string | { slug: string }, file: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    repository: args[0],
                    file: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        repository: typeof args.repository === 'object'
                ? args.repository.slug
                : args.repository,
                                file: typeof args.file === 'object'
                ? args.file.id
                : args.file,
                }

    return update.definition.url
            .replace('{repository}', parsedArgs.repository.toString())
            .replace('{file}', parsedArgs.file.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FileController::update
 * @see app/Http/Controllers/FileController.php:82
 * @route '/account/repositories/{repository}/files/{file}'
 */
update.put = (args: { repository: string | { slug: string }, file: number | { id: number } } | [repository: string | { slug: string }, file: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\FileController::update
 * @see app/Http/Controllers/FileController.php:82
 * @route '/account/repositories/{repository}/files/{file}'
 */
    const updateForm = (args: { repository: string | { slug: string }, file: number | { id: number } } | [repository: string | { slug: string }, file: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @route '/account/repositories/{repository}/files/{file}'
 */
        updateForm.put = (args: { repository: string | { slug: string }, file: number | { id: number } } | [repository: string | { slug: string }, file: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @route '/account/repositories/{repository}/files/{file}'
 */
export const destroy = (args: { repository: string | { slug: string }, file: number | { id: number } } | [repository: string | { slug: string }, file: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/account/repositories/{repository}/files/{file}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\FileController::destroy
 * @see app/Http/Controllers/FileController.php:98
 * @route '/account/repositories/{repository}/files/{file}'
 */
destroy.url = (args: { repository: string | { slug: string }, file: number | { id: number } } | [repository: string | { slug: string }, file: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    repository: args[0],
                    file: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        repository: typeof args.repository === 'object'
                ? args.repository.slug
                : args.repository,
                                file: typeof args.file === 'object'
                ? args.file.id
                : args.file,
                }

    return destroy.definition.url
            .replace('{repository}', parsedArgs.repository.toString())
            .replace('{file}', parsedArgs.file.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FileController::destroy
 * @see app/Http/Controllers/FileController.php:98
 * @route '/account/repositories/{repository}/files/{file}'
 */
destroy.delete = (args: { repository: string | { slug: string }, file: number | { id: number } } | [repository: string | { slug: string }, file: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\FileController::destroy
 * @see app/Http/Controllers/FileController.php:98
 * @route '/account/repositories/{repository}/files/{file}'
 */
    const destroyForm = (args: { repository: string | { slug: string }, file: number | { id: number } } | [repository: string | { slug: string }, file: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @route '/account/repositories/{repository}/files/{file}'
 */
        destroyForm.delete = (args: { repository: string | { slug: string }, file: number | { id: number } } | [repository: string | { slug: string }, file: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const files = {
    download: Object.assign(download, download),
create: Object.assign(create, create),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
images: Object.assign(images, images),
}

export default files