import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectPeriodController::index
 * @see app/Http/Controllers/ProjectPeriodController.php:38
 * @route '/project-periods'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/project-periods',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectPeriodController::index
 * @see app/Http/Controllers/ProjectPeriodController.php:38
 * @route '/project-periods'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPeriodController::index
 * @see app/Http/Controllers/ProjectPeriodController.php:38
 * @route '/project-periods'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProjectPeriodController::index
 * @see app/Http/Controllers/ProjectPeriodController.php:38
 * @route '/project-periods'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProjectPeriodController::index
 * @see app/Http/Controllers/ProjectPeriodController.php:38
 * @route '/project-periods'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProjectPeriodController::index
 * @see app/Http/Controllers/ProjectPeriodController.php:38
 * @route '/project-periods'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProjectPeriodController::index
 * @see app/Http/Controllers/ProjectPeriodController.php:38
 * @route '/project-periods'
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
* @see \App\Http\Controllers\ProjectPeriodController::store
 * @see app/Http/Controllers/ProjectPeriodController.php:139
 * @route '/project-periods'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/project-periods',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectPeriodController::store
 * @see app/Http/Controllers/ProjectPeriodController.php:139
 * @route '/project-periods'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPeriodController::store
 * @see app/Http/Controllers/ProjectPeriodController.php:139
 * @route '/project-periods'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ProjectPeriodController::store
 * @see app/Http/Controllers/ProjectPeriodController.php:139
 * @route '/project-periods'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProjectPeriodController::store
 * @see app/Http/Controllers/ProjectPeriodController.php:139
 * @route '/project-periods'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ProjectPeriodController::show
 * @see app/Http/Controllers/ProjectPeriodController.php:66
 * @route '/project-periods/{project_period}'
 */
export const show = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/project-periods/{project_period}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectPeriodController::show
 * @see app/Http/Controllers/ProjectPeriodController.php:66
 * @route '/project-periods/{project_period}'
 */
show.url = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project_period: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { project_period: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    project_period: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project_period: typeof args.project_period === 'object'
                ? args.project_period.id
                : args.project_period,
                }

    return show.definition.url
            .replace('{project_period}', parsedArgs.project_period.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPeriodController::show
 * @see app/Http/Controllers/ProjectPeriodController.php:66
 * @route '/project-periods/{project_period}'
 */
show.get = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProjectPeriodController::show
 * @see app/Http/Controllers/ProjectPeriodController.php:66
 * @route '/project-periods/{project_period}'
 */
show.head = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProjectPeriodController::show
 * @see app/Http/Controllers/ProjectPeriodController.php:66
 * @route '/project-periods/{project_period}'
 */
    const showForm = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProjectPeriodController::show
 * @see app/Http/Controllers/ProjectPeriodController.php:66
 * @route '/project-periods/{project_period}'
 */
        showForm.get = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProjectPeriodController::show
 * @see app/Http/Controllers/ProjectPeriodController.php:66
 * @route '/project-periods/{project_period}'
 */
        showForm.head = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\ProjectPeriodController::update
 * @see app/Http/Controllers/ProjectPeriodController.php:158
 * @route '/project-periods/{project_period}'
 */
export const update = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/project-periods/{project_period}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ProjectPeriodController::update
 * @see app/Http/Controllers/ProjectPeriodController.php:158
 * @route '/project-periods/{project_period}'
 */
update.url = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project_period: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { project_period: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    project_period: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project_period: typeof args.project_period === 'object'
                ? args.project_period.id
                : args.project_period,
                }

    return update.definition.url
            .replace('{project_period}', parsedArgs.project_period.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPeriodController::update
 * @see app/Http/Controllers/ProjectPeriodController.php:158
 * @route '/project-periods/{project_period}'
 */
update.put = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\ProjectPeriodController::update
 * @see app/Http/Controllers/ProjectPeriodController.php:158
 * @route '/project-periods/{project_period}'
 */
update.patch = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\ProjectPeriodController::update
 * @see app/Http/Controllers/ProjectPeriodController.php:158
 * @route '/project-periods/{project_period}'
 */
    const updateForm = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProjectPeriodController::update
 * @see app/Http/Controllers/ProjectPeriodController.php:158
 * @route '/project-periods/{project_period}'
 */
        updateForm.put = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\ProjectPeriodController::update
 * @see app/Http/Controllers/ProjectPeriodController.php:158
 * @route '/project-periods/{project_period}'
 */
        updateForm.patch = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\ProjectPeriodController::destroy
 * @see app/Http/Controllers/ProjectPeriodController.php:194
 * @route '/project-periods/{project_period}'
 */
export const destroy = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/project-periods/{project_period}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ProjectPeriodController::destroy
 * @see app/Http/Controllers/ProjectPeriodController.php:194
 * @route '/project-periods/{project_period}'
 */
destroy.url = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project_period: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { project_period: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    project_period: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project_period: typeof args.project_period === 'object'
                ? args.project_period.id
                : args.project_period,
                }

    return destroy.definition.url
            .replace('{project_period}', parsedArgs.project_period.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPeriodController::destroy
 * @see app/Http/Controllers/ProjectPeriodController.php:194
 * @route '/project-periods/{project_period}'
 */
destroy.delete = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ProjectPeriodController::destroy
 * @see app/Http/Controllers/ProjectPeriodController.php:194
 * @route '/project-periods/{project_period}'
 */
    const destroyForm = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProjectPeriodController::destroy
 * @see app/Http/Controllers/ProjectPeriodController.php:194
 * @route '/project-periods/{project_period}'
 */
        destroyForm.delete = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\ProjectPeriodController::open
 * @see app/Http/Controllers/ProjectPeriodController.php:174
 * @route '/project-periods/{project_period}/open'
 */
export const open = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: open.url(args, options),
    method: 'post',
})

open.definition = {
    methods: ["post"],
    url: '/project-periods/{project_period}/open',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectPeriodController::open
 * @see app/Http/Controllers/ProjectPeriodController.php:174
 * @route '/project-periods/{project_period}/open'
 */
open.url = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project_period: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { project_period: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    project_period: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project_period: typeof args.project_period === 'object'
                ? args.project_period.id
                : args.project_period,
                }

    return open.definition.url
            .replace('{project_period}', parsedArgs.project_period.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPeriodController::open
 * @see app/Http/Controllers/ProjectPeriodController.php:174
 * @route '/project-periods/{project_period}/open'
 */
open.post = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: open.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ProjectPeriodController::open
 * @see app/Http/Controllers/ProjectPeriodController.php:174
 * @route '/project-periods/{project_period}/open'
 */
    const openForm = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: open.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProjectPeriodController::open
 * @see app/Http/Controllers/ProjectPeriodController.php:174
 * @route '/project-periods/{project_period}/open'
 */
        openForm.post = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: open.url(args, options),
            method: 'post',
        })
    
    open.form = openForm
/**
* @see \App\Http\Controllers\ProjectPeriodController::close
 * @see app/Http/Controllers/ProjectPeriodController.php:187
 * @route '/project-periods/{project_period}/close'
 */
export const close = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: close.url(args, options),
    method: 'post',
})

close.definition = {
    methods: ["post"],
    url: '/project-periods/{project_period}/close',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectPeriodController::close
 * @see app/Http/Controllers/ProjectPeriodController.php:187
 * @route '/project-periods/{project_period}/close'
 */
close.url = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project_period: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { project_period: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    project_period: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project_period: typeof args.project_period === 'object'
                ? args.project_period.id
                : args.project_period,
                }

    return close.definition.url
            .replace('{project_period}', parsedArgs.project_period.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPeriodController::close
 * @see app/Http/Controllers/ProjectPeriodController.php:187
 * @route '/project-periods/{project_period}/close'
 */
close.post = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: close.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ProjectPeriodController::close
 * @see app/Http/Controllers/ProjectPeriodController.php:187
 * @route '/project-periods/{project_period}/close'
 */
    const closeForm = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: close.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProjectPeriodController::close
 * @see app/Http/Controllers/ProjectPeriodController.php:187
 * @route '/project-periods/{project_period}/close'
 */
        closeForm.post = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: close.url(args, options),
            method: 'post',
        })
    
    close.form = closeForm
/**
* @see \App\Http\Controllers\ProjectPeriodController::proposeDistribution
 * @see app/Http/Controllers/ProjectPeriodController.php:209
 * @route '/project-periods/{project_period}/distribute/propose'
 */
export const proposeDistribution = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: proposeDistribution.url(args, options),
    method: 'post',
})

proposeDistribution.definition = {
    methods: ["post"],
    url: '/project-periods/{project_period}/distribute/propose',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectPeriodController::proposeDistribution
 * @see app/Http/Controllers/ProjectPeriodController.php:209
 * @route '/project-periods/{project_period}/distribute/propose'
 */
proposeDistribution.url = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project_period: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { project_period: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    project_period: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project_period: typeof args.project_period === 'object'
                ? args.project_period.id
                : args.project_period,
                }

    return proposeDistribution.definition.url
            .replace('{project_period}', parsedArgs.project_period.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectPeriodController::proposeDistribution
 * @see app/Http/Controllers/ProjectPeriodController.php:209
 * @route '/project-periods/{project_period}/distribute/propose'
 */
proposeDistribution.post = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: proposeDistribution.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ProjectPeriodController::proposeDistribution
 * @see app/Http/Controllers/ProjectPeriodController.php:209
 * @route '/project-periods/{project_period}/distribute/propose'
 */
    const proposeDistributionForm = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: proposeDistribution.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProjectPeriodController::proposeDistribution
 * @see app/Http/Controllers/ProjectPeriodController.php:209
 * @route '/project-periods/{project_period}/distribute/propose'
 */
        proposeDistributionForm.post = (args: { project_period: number | { id: number } } | [project_period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: proposeDistribution.url(args, options),
            method: 'post',
        })
    
    proposeDistribution.form = proposeDistributionForm
const ProjectPeriodController = { index, store, show, update, destroy, open, close, proposeDistribution }

export default ProjectPeriodController