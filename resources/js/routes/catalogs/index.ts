import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\CatalogController::index
 * @see app/Http/Controllers/CatalogController.php:28
 * @route '/catalogs'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/catalogs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CatalogController::index
 * @see app/Http/Controllers/CatalogController.php:28
 * @route '/catalogs'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CatalogController::index
 * @see app/Http/Controllers/CatalogController.php:28
 * @route '/catalogs'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CatalogController::index
 * @see app/Http/Controllers/CatalogController.php:28
 * @route '/catalogs'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CatalogController::index
 * @see app/Http/Controllers/CatalogController.php:28
 * @route '/catalogs'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CatalogController::index
 * @see app/Http/Controllers/CatalogController.php:28
 * @route '/catalogs'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CatalogController::index
 * @see app/Http/Controllers/CatalogController.php:28
 * @route '/catalogs'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\CatalogController::store
 * @see app/Http/Controllers/CatalogController.php:50
 * @route '/catalogs'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/catalogs',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CatalogController::store
 * @see app/Http/Controllers/CatalogController.php:50
 * @route '/catalogs'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CatalogController::store
 * @see app/Http/Controllers/CatalogController.php:50
 * @route '/catalogs'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CatalogController::store
 * @see app/Http/Controllers/CatalogController.php:50
 * @route '/catalogs'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CatalogController::store
 * @see app/Http/Controllers/CatalogController.php:50
 * @route '/catalogs'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\CatalogController::update
 * @see app/Http/Controllers/CatalogController.php:62
 * @route '/catalogs/{catalog}'
 */
export const update = (args: { catalog: number | { id: number } } | [catalog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/catalogs/{catalog}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\CatalogController::update
 * @see app/Http/Controllers/CatalogController.php:62
 * @route '/catalogs/{catalog}'
 */
update.url = (args: { catalog: number | { id: number } } | [catalog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { catalog: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { catalog: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    catalog: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        catalog: typeof args.catalog === 'object'
                ? args.catalog.id
                : args.catalog,
                }

    return update.definition.url
            .replace('{catalog}', parsedArgs.catalog.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CatalogController::update
 * @see app/Http/Controllers/CatalogController.php:62
 * @route '/catalogs/{catalog}'
 */
update.put = (args: { catalog: number | { id: number } } | [catalog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\CatalogController::update
 * @see app/Http/Controllers/CatalogController.php:62
 * @route '/catalogs/{catalog}'
 */
update.patch = (args: { catalog: number | { id: number } } | [catalog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\CatalogController::update
 * @see app/Http/Controllers/CatalogController.php:62
 * @route '/catalogs/{catalog}'
 */
    const updateForm = (args: { catalog: number | { id: number } } | [catalog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CatalogController::update
 * @see app/Http/Controllers/CatalogController.php:62
 * @route '/catalogs/{catalog}'
 */
        updateForm.put = (args: { catalog: number | { id: number } } | [catalog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\CatalogController::update
 * @see app/Http/Controllers/CatalogController.php:62
 * @route '/catalogs/{catalog}'
 */
        updateForm.patch = (args: { catalog: number | { id: number } } | [catalog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\CatalogController::destroy
 * @see app/Http/Controllers/CatalogController.php:86
 * @route '/catalogs/{catalog}'
 */
export const destroy = (args: { catalog: number | { id: number } } | [catalog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/catalogs/{catalog}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CatalogController::destroy
 * @see app/Http/Controllers/CatalogController.php:86
 * @route '/catalogs/{catalog}'
 */
destroy.url = (args: { catalog: number | { id: number } } | [catalog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { catalog: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { catalog: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    catalog: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        catalog: typeof args.catalog === 'object'
                ? args.catalog.id
                : args.catalog,
                }

    return destroy.definition.url
            .replace('{catalog}', parsedArgs.catalog.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CatalogController::destroy
 * @see app/Http/Controllers/CatalogController.php:86
 * @route '/catalogs/{catalog}'
 */
destroy.delete = (args: { catalog: number | { id: number } } | [catalog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\CatalogController::destroy
 * @see app/Http/Controllers/CatalogController.php:86
 * @route '/catalogs/{catalog}'
 */
    const destroyForm = (args: { catalog: number | { id: number } } | [catalog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CatalogController::destroy
 * @see app/Http/Controllers/CatalogController.php:86
 * @route '/catalogs/{catalog}'
 */
        destroyForm.delete = (args: { catalog: number | { id: number } } | [catalog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\CatalogController::toggleActive
 * @see app/Http/Controllers/CatalogController.php:71
 * @route '/catalogs/{catalog}/active'
 */
export const toggleActive = (args: { catalog: number | { id: number } } | [catalog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleActive.url(args, options),
    method: 'patch',
})

toggleActive.definition = {
    methods: ["patch"],
    url: '/catalogs/{catalog}/active',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\CatalogController::toggleActive
 * @see app/Http/Controllers/CatalogController.php:71
 * @route '/catalogs/{catalog}/active'
 */
toggleActive.url = (args: { catalog: number | { id: number } } | [catalog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { catalog: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { catalog: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    catalog: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        catalog: typeof args.catalog === 'object'
                ? args.catalog.id
                : args.catalog,
                }

    return toggleActive.definition.url
            .replace('{catalog}', parsedArgs.catalog.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CatalogController::toggleActive
 * @see app/Http/Controllers/CatalogController.php:71
 * @route '/catalogs/{catalog}/active'
 */
toggleActive.patch = (args: { catalog: number | { id: number } } | [catalog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleActive.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\CatalogController::toggleActive
 * @see app/Http/Controllers/CatalogController.php:71
 * @route '/catalogs/{catalog}/active'
 */
    const toggleActiveForm = (args: { catalog: number | { id: number } } | [catalog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleActive.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CatalogController::toggleActive
 * @see app/Http/Controllers/CatalogController.php:71
 * @route '/catalogs/{catalog}/active'
 */
        toggleActiveForm.patch = (args: { catalog: number | { id: number } } | [catalog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleActive.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    toggleActive.form = toggleActiveForm
const catalogs = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
toggleActive: Object.assign(toggleActive, toggleActive),
}

export default catalogs