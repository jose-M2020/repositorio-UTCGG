import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\EducationLevelController::index
 * @see app/Http/Controllers/EducationLevelController.php:30
 * @route '/education-levels'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/education-levels',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EducationLevelController::index
 * @see app/Http/Controllers/EducationLevelController.php:30
 * @route '/education-levels'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EducationLevelController::index
 * @see app/Http/Controllers/EducationLevelController.php:30
 * @route '/education-levels'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\EducationLevelController::index
 * @see app/Http/Controllers/EducationLevelController.php:30
 * @route '/education-levels'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\EducationLevelController::index
 * @see app/Http/Controllers/EducationLevelController.php:30
 * @route '/education-levels'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\EducationLevelController::index
 * @see app/Http/Controllers/EducationLevelController.php:30
 * @route '/education-levels'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\EducationLevelController::index
 * @see app/Http/Controllers/EducationLevelController.php:30
 * @route '/education-levels'
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
* @see \App\Http\Controllers\EducationLevelController::store
 * @see app/Http/Controllers/EducationLevelController.php:42
 * @route '/education-levels'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/education-levels',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EducationLevelController::store
 * @see app/Http/Controllers/EducationLevelController.php:42
 * @route '/education-levels'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EducationLevelController::store
 * @see app/Http/Controllers/EducationLevelController.php:42
 * @route '/education-levels'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\EducationLevelController::store
 * @see app/Http/Controllers/EducationLevelController.php:42
 * @route '/education-levels'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EducationLevelController::store
 * @see app/Http/Controllers/EducationLevelController.php:42
 * @route '/education-levels'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\EducationLevelController::update
 * @see app/Http/Controllers/EducationLevelController.php:58
 * @route '/education-levels/{education_level}'
 */
export const update = (args: { education_level: number | { id: number } } | [education_level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/education-levels/{education_level}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\EducationLevelController::update
 * @see app/Http/Controllers/EducationLevelController.php:58
 * @route '/education-levels/{education_level}'
 */
update.url = (args: { education_level: number | { id: number } } | [education_level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { education_level: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { education_level: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    education_level: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        education_level: typeof args.education_level === 'object'
                ? args.education_level.id
                : args.education_level,
                }

    return update.definition.url
            .replace('{education_level}', parsedArgs.education_level.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EducationLevelController::update
 * @see app/Http/Controllers/EducationLevelController.php:58
 * @route '/education-levels/{education_level}'
 */
update.put = (args: { education_level: number | { id: number } } | [education_level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\EducationLevelController::update
 * @see app/Http/Controllers/EducationLevelController.php:58
 * @route '/education-levels/{education_level}'
 */
update.patch = (args: { education_level: number | { id: number } } | [education_level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\EducationLevelController::update
 * @see app/Http/Controllers/EducationLevelController.php:58
 * @route '/education-levels/{education_level}'
 */
    const updateForm = (args: { education_level: number | { id: number } } | [education_level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EducationLevelController::update
 * @see app/Http/Controllers/EducationLevelController.php:58
 * @route '/education-levels/{education_level}'
 */
        updateForm.put = (args: { education_level: number | { id: number } } | [education_level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\EducationLevelController::update
 * @see app/Http/Controllers/EducationLevelController.php:58
 * @route '/education-levels/{education_level}'
 */
        updateForm.patch = (args: { education_level: number | { id: number } } | [education_level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\EducationLevelController::destroy
 * @see app/Http/Controllers/EducationLevelController.php:87
 * @route '/education-levels/{education_level}'
 */
export const destroy = (args: { education_level: number | { id: number } } | [education_level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/education-levels/{education_level}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\EducationLevelController::destroy
 * @see app/Http/Controllers/EducationLevelController.php:87
 * @route '/education-levels/{education_level}'
 */
destroy.url = (args: { education_level: number | { id: number } } | [education_level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { education_level: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { education_level: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    education_level: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        education_level: typeof args.education_level === 'object'
                ? args.education_level.id
                : args.education_level,
                }

    return destroy.definition.url
            .replace('{education_level}', parsedArgs.education_level.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EducationLevelController::destroy
 * @see app/Http/Controllers/EducationLevelController.php:87
 * @route '/education-levels/{education_level}'
 */
destroy.delete = (args: { education_level: number | { id: number } } | [education_level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\EducationLevelController::destroy
 * @see app/Http/Controllers/EducationLevelController.php:87
 * @route '/education-levels/{education_level}'
 */
    const destroyForm = (args: { education_level: number | { id: number } } | [education_level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EducationLevelController::destroy
 * @see app/Http/Controllers/EducationLevelController.php:87
 * @route '/education-levels/{education_level}'
 */
        destroyForm.delete = (args: { education_level: number | { id: number } } | [education_level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\EducationLevelController::toggleActive
 * @see app/Http/Controllers/EducationLevelController.php:72
 * @route '/education-levels/{education_level}/active'
 */
export const toggleActive = (args: { education_level: number | { id: number } } | [education_level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleActive.url(args, options),
    method: 'patch',
})

toggleActive.definition = {
    methods: ["patch"],
    url: '/education-levels/{education_level}/active',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\EducationLevelController::toggleActive
 * @see app/Http/Controllers/EducationLevelController.php:72
 * @route '/education-levels/{education_level}/active'
 */
toggleActive.url = (args: { education_level: number | { id: number } } | [education_level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { education_level: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { education_level: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    education_level: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        education_level: typeof args.education_level === 'object'
                ? args.education_level.id
                : args.education_level,
                }

    return toggleActive.definition.url
            .replace('{education_level}', parsedArgs.education_level.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\EducationLevelController::toggleActive
 * @see app/Http/Controllers/EducationLevelController.php:72
 * @route '/education-levels/{education_level}/active'
 */
toggleActive.patch = (args: { education_level: number | { id: number } } | [education_level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleActive.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\EducationLevelController::toggleActive
 * @see app/Http/Controllers/EducationLevelController.php:72
 * @route '/education-levels/{education_level}/active'
 */
    const toggleActiveForm = (args: { education_level: number | { id: number } } | [education_level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleActive.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\EducationLevelController::toggleActive
 * @see app/Http/Controllers/EducationLevelController.php:72
 * @route '/education-levels/{education_level}/active'
 */
        toggleActiveForm.patch = (args: { education_level: number | { id: number } } | [education_level: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleActive.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    toggleActive.form = toggleActiveForm
const EducationLevelController = { index, store, update, destroy, toggleActive }

export default EducationLevelController