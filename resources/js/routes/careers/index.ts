import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\CareerController::index
 * @see app/Http/Controllers/CareerController.php:36
 * @route '/careers'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/careers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CareerController::index
 * @see app/Http/Controllers/CareerController.php:36
 * @route '/careers'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CareerController::index
 * @see app/Http/Controllers/CareerController.php:36
 * @route '/careers'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CareerController::index
 * @see app/Http/Controllers/CareerController.php:36
 * @route '/careers'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CareerController::index
 * @see app/Http/Controllers/CareerController.php:36
 * @route '/careers'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CareerController::index
 * @see app/Http/Controllers/CareerController.php:36
 * @route '/careers'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CareerController::index
 * @see app/Http/Controllers/CareerController.php:36
 * @route '/careers'
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
* @see \App\Http\Controllers\CareerController::store
 * @see app/Http/Controllers/CareerController.php:48
 * @route '/careers'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/careers',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CareerController::store
 * @see app/Http/Controllers/CareerController.php:48
 * @route '/careers'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CareerController::store
 * @see app/Http/Controllers/CareerController.php:48
 * @route '/careers'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CareerController::store
 * @see app/Http/Controllers/CareerController.php:48
 * @route '/careers'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CareerController::store
 * @see app/Http/Controllers/CareerController.php:48
 * @route '/careers'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\CareerController::update
 * @see app/Http/Controllers/CareerController.php:76
 * @route '/careers/{career}'
 */
export const update = (args: { career: number | { id: number } } | [career: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/careers/{career}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\CareerController::update
 * @see app/Http/Controllers/CareerController.php:76
 * @route '/careers/{career}'
 */
update.url = (args: { career: number | { id: number } } | [career: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { career: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { career: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    career: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        career: typeof args.career === 'object'
                ? args.career.id
                : args.career,
                }

    return update.definition.url
            .replace('{career}', parsedArgs.career.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CareerController::update
 * @see app/Http/Controllers/CareerController.php:76
 * @route '/careers/{career}'
 */
update.put = (args: { career: number | { id: number } } | [career: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\CareerController::update
 * @see app/Http/Controllers/CareerController.php:76
 * @route '/careers/{career}'
 */
update.patch = (args: { career: number | { id: number } } | [career: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\CareerController::update
 * @see app/Http/Controllers/CareerController.php:76
 * @route '/careers/{career}'
 */
    const updateForm = (args: { career: number | { id: number } } | [career: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CareerController::update
 * @see app/Http/Controllers/CareerController.php:76
 * @route '/careers/{career}'
 */
        updateForm.put = (args: { career: number | { id: number } } | [career: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\CareerController::update
 * @see app/Http/Controllers/CareerController.php:76
 * @route '/careers/{career}'
 */
        updateForm.patch = (args: { career: number | { id: number } } | [career: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\CareerController::destroy
 * @see app/Http/Controllers/CareerController.php:121
 * @route '/careers/{career}'
 */
export const destroy = (args: { career: number | { id: number } } | [career: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/careers/{career}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CareerController::destroy
 * @see app/Http/Controllers/CareerController.php:121
 * @route '/careers/{career}'
 */
destroy.url = (args: { career: number | { id: number } } | [career: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { career: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { career: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    career: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        career: typeof args.career === 'object'
                ? args.career.id
                : args.career,
                }

    return destroy.definition.url
            .replace('{career}', parsedArgs.career.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CareerController::destroy
 * @see app/Http/Controllers/CareerController.php:121
 * @route '/careers/{career}'
 */
destroy.delete = (args: { career: number | { id: number } } | [career: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\CareerController::destroy
 * @see app/Http/Controllers/CareerController.php:121
 * @route '/careers/{career}'
 */
    const destroyForm = (args: { career: number | { id: number } } | [career: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CareerController::destroy
 * @see app/Http/Controllers/CareerController.php:121
 * @route '/careers/{career}'
 */
        destroyForm.delete = (args: { career: number | { id: number } } | [career: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\CareerController::toggleActive
 * @see app/Http/Controllers/CareerController.php:106
 * @route '/careers/{career}/active'
 */
export const toggleActive = (args: { career: number | { id: number } } | [career: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleActive.url(args, options),
    method: 'patch',
})

toggleActive.definition = {
    methods: ["patch"],
    url: '/careers/{career}/active',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\CareerController::toggleActive
 * @see app/Http/Controllers/CareerController.php:106
 * @route '/careers/{career}/active'
 */
toggleActive.url = (args: { career: number | { id: number } } | [career: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { career: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { career: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    career: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        career: typeof args.career === 'object'
                ? args.career.id
                : args.career,
                }

    return toggleActive.definition.url
            .replace('{career}', parsedArgs.career.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CareerController::toggleActive
 * @see app/Http/Controllers/CareerController.php:106
 * @route '/careers/{career}/active'
 */
toggleActive.patch = (args: { career: number | { id: number } } | [career: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleActive.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\CareerController::toggleActive
 * @see app/Http/Controllers/CareerController.php:106
 * @route '/careers/{career}/active'
 */
    const toggleActiveForm = (args: { career: number | { id: number } } | [career: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleActive.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CareerController::toggleActive
 * @see app/Http/Controllers/CareerController.php:106
 * @route '/careers/{career}/active'
 */
        toggleActiveForm.patch = (args: { career: number | { id: number } } | [career: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleActive.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    toggleActive.form = toggleActiveForm
const careers = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
toggleActive: Object.assign(toggleActive, toggleActive),
}

export default careers