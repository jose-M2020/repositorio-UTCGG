import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectTypeController::index
 * @see app/Http/Controllers/ProjectTypeController.php:31
 * @route '/project-types'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/project-types',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectTypeController::index
 * @see app/Http/Controllers/ProjectTypeController.php:31
 * @route '/project-types'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectTypeController::index
 * @see app/Http/Controllers/ProjectTypeController.php:31
 * @route '/project-types'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProjectTypeController::index
 * @see app/Http/Controllers/ProjectTypeController.php:31
 * @route '/project-types'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProjectTypeController::index
 * @see app/Http/Controllers/ProjectTypeController.php:31
 * @route '/project-types'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProjectTypeController::index
 * @see app/Http/Controllers/ProjectTypeController.php:31
 * @route '/project-types'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProjectTypeController::index
 * @see app/Http/Controllers/ProjectTypeController.php:31
 * @route '/project-types'
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
* @see \App\Http\Controllers\ProjectTypeController::store
 * @see app/Http/Controllers/ProjectTypeController.php:43
 * @route '/project-types'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/project-types',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectTypeController::store
 * @see app/Http/Controllers/ProjectTypeController.php:43
 * @route '/project-types'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectTypeController::store
 * @see app/Http/Controllers/ProjectTypeController.php:43
 * @route '/project-types'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ProjectTypeController::store
 * @see app/Http/Controllers/ProjectTypeController.php:43
 * @route '/project-types'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProjectTypeController::store
 * @see app/Http/Controllers/ProjectTypeController.php:43
 * @route '/project-types'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ProjectTypeController::update
 * @see app/Http/Controllers/ProjectTypeController.php:52
 * @route '/project-types/{project_type}'
 */
export const update = (args: { project_type: number | { id: number } } | [project_type: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/project-types/{project_type}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ProjectTypeController::update
 * @see app/Http/Controllers/ProjectTypeController.php:52
 * @route '/project-types/{project_type}'
 */
update.url = (args: { project_type: number | { id: number } } | [project_type: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project_type: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { project_type: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    project_type: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project_type: typeof args.project_type === 'object'
                ? args.project_type.id
                : args.project_type,
                }

    return update.definition.url
            .replace('{project_type}', parsedArgs.project_type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectTypeController::update
 * @see app/Http/Controllers/ProjectTypeController.php:52
 * @route '/project-types/{project_type}'
 */
update.put = (args: { project_type: number | { id: number } } | [project_type: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\ProjectTypeController::update
 * @see app/Http/Controllers/ProjectTypeController.php:52
 * @route '/project-types/{project_type}'
 */
update.patch = (args: { project_type: number | { id: number } } | [project_type: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\ProjectTypeController::update
 * @see app/Http/Controllers/ProjectTypeController.php:52
 * @route '/project-types/{project_type}'
 */
    const updateForm = (args: { project_type: number | { id: number } } | [project_type: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProjectTypeController::update
 * @see app/Http/Controllers/ProjectTypeController.php:52
 * @route '/project-types/{project_type}'
 */
        updateForm.put = (args: { project_type: number | { id: number } } | [project_type: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\ProjectTypeController::update
 * @see app/Http/Controllers/ProjectTypeController.php:52
 * @route '/project-types/{project_type}'
 */
        updateForm.patch = (args: { project_type: number | { id: number } } | [project_type: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\ProjectTypeController::destroy
 * @see app/Http/Controllers/ProjectTypeController.php:76
 * @route '/project-types/{project_type}'
 */
export const destroy = (args: { project_type: number | { id: number } } | [project_type: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/project-types/{project_type}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ProjectTypeController::destroy
 * @see app/Http/Controllers/ProjectTypeController.php:76
 * @route '/project-types/{project_type}'
 */
destroy.url = (args: { project_type: number | { id: number } } | [project_type: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project_type: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { project_type: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    project_type: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project_type: typeof args.project_type === 'object'
                ? args.project_type.id
                : args.project_type,
                }

    return destroy.definition.url
            .replace('{project_type}', parsedArgs.project_type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectTypeController::destroy
 * @see app/Http/Controllers/ProjectTypeController.php:76
 * @route '/project-types/{project_type}'
 */
destroy.delete = (args: { project_type: number | { id: number } } | [project_type: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ProjectTypeController::destroy
 * @see app/Http/Controllers/ProjectTypeController.php:76
 * @route '/project-types/{project_type}'
 */
    const destroyForm = (args: { project_type: number | { id: number } } | [project_type: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProjectTypeController::destroy
 * @see app/Http/Controllers/ProjectTypeController.php:76
 * @route '/project-types/{project_type}'
 */
        destroyForm.delete = (args: { project_type: number | { id: number } } | [project_type: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\ProjectTypeController::toggleActive
 * @see app/Http/Controllers/ProjectTypeController.php:61
 * @route '/project-types/{project_type}/active'
 */
export const toggleActive = (args: { project_type: number | { id: number } } | [project_type: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleActive.url(args, options),
    method: 'patch',
})

toggleActive.definition = {
    methods: ["patch"],
    url: '/project-types/{project_type}/active',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\ProjectTypeController::toggleActive
 * @see app/Http/Controllers/ProjectTypeController.php:61
 * @route '/project-types/{project_type}/active'
 */
toggleActive.url = (args: { project_type: number | { id: number } } | [project_type: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project_type: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { project_type: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    project_type: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project_type: typeof args.project_type === 'object'
                ? args.project_type.id
                : args.project_type,
                }

    return toggleActive.definition.url
            .replace('{project_type}', parsedArgs.project_type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectTypeController::toggleActive
 * @see app/Http/Controllers/ProjectTypeController.php:61
 * @route '/project-types/{project_type}/active'
 */
toggleActive.patch = (args: { project_type: number | { id: number } } | [project_type: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleActive.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\ProjectTypeController::toggleActive
 * @see app/Http/Controllers/ProjectTypeController.php:61
 * @route '/project-types/{project_type}/active'
 */
    const toggleActiveForm = (args: { project_type: number | { id: number } } | [project_type: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleActive.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProjectTypeController::toggleActive
 * @see app/Http/Controllers/ProjectTypeController.php:61
 * @route '/project-types/{project_type}/active'
 */
        toggleActiveForm.patch = (args: { project_type: number | { id: number } } | [project_type: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleActive.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    toggleActive.form = toggleActiveForm
const ProjectTypeController = { index, store, update, destroy, toggleActive }

export default ProjectTypeController