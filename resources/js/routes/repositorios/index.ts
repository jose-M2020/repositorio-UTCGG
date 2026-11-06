import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import user3b1c2b from './user'
import member from './member'
/**
* @see \App\Http\Controllers\RepositorioController::index
 * @see app/Http/Controllers/RepositorioController.php:32
 * @route '/repositorios'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/repositorios',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RepositorioController::index
 * @see app/Http/Controllers/RepositorioController.php:32
 * @route '/repositorios'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepositorioController::index
 * @see app/Http/Controllers/RepositorioController.php:32
 * @route '/repositorios'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RepositorioController::index
 * @see app/Http/Controllers/RepositorioController.php:32
 * @route '/repositorios'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RepositorioController::index
 * @see app/Http/Controllers/RepositorioController.php:32
 * @route '/repositorios'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RepositorioController::index
 * @see app/Http/Controllers/RepositorioController.php:32
 * @route '/repositorios'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RepositorioController::index
 * @see app/Http/Controllers/RepositorioController.php:32
 * @route '/repositorios'
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
* @see \App\Http\Controllers\RepositorioController::show
 * @see app/Http/Controllers/RepositorioController.php:105
 * @route '/repositorios/{repositorio}'
 */
export const show = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/repositorios/{repositorio}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RepositorioController::show
 * @see app/Http/Controllers/RepositorioController.php:105
 * @route '/repositorios/{repositorio}'
 */
show.url = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{repositorio}', parsedArgs.repositorio.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepositorioController::show
 * @see app/Http/Controllers/RepositorioController.php:105
 * @route '/repositorios/{repositorio}'
 */
show.get = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RepositorioController::show
 * @see app/Http/Controllers/RepositorioController.php:105
 * @route '/repositorios/{repositorio}'
 */
show.head = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RepositorioController::show
 * @see app/Http/Controllers/RepositorioController.php:105
 * @route '/repositorios/{repositorio}'
 */
    const showForm = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RepositorioController::show
 * @see app/Http/Controllers/RepositorioController.php:105
 * @route '/repositorios/{repositorio}'
 */
        showForm.get = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RepositorioController::show
 * @see app/Http/Controllers/RepositorioController.php:105
 * @route '/repositorios/{repositorio}'
 */
        showForm.head = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\RepositorioController::create
 * @see app/Http/Controllers/RepositorioController.php:73
 * @route '/repositorios/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/repositorios/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RepositorioController::create
 * @see app/Http/Controllers/RepositorioController.php:73
 * @route '/repositorios/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepositorioController::create
 * @see app/Http/Controllers/RepositorioController.php:73
 * @route '/repositorios/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RepositorioController::create
 * @see app/Http/Controllers/RepositorioController.php:73
 * @route '/repositorios/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RepositorioController::create
 * @see app/Http/Controllers/RepositorioController.php:73
 * @route '/repositorios/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RepositorioController::create
 * @see app/Http/Controllers/RepositorioController.php:73
 * @route '/repositorios/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RepositorioController::create
 * @see app/Http/Controllers/RepositorioController.php:73
 * @route '/repositorios/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\RepositorioController::store
 * @see app/Http/Controllers/RepositorioController.php:78
 * @route '/repositorios'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/repositorios',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RepositorioController::store
 * @see app/Http/Controllers/RepositorioController.php:78
 * @route '/repositorios'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepositorioController::store
 * @see app/Http/Controllers/RepositorioController.php:78
 * @route '/repositorios'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\RepositorioController::store
 * @see app/Http/Controllers/RepositorioController.php:78
 * @route '/repositorios'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RepositorioController::store
 * @see app/Http/Controllers/RepositorioController.php:78
 * @route '/repositorios'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\RepositorioController::edit
 * @see app/Http/Controllers/RepositorioController.php:157
 * @route '/repositorios/{repositorio}/edit'
 */
export const edit = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/repositorios/{repositorio}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RepositorioController::edit
 * @see app/Http/Controllers/RepositorioController.php:157
 * @route '/repositorios/{repositorio}/edit'
 */
edit.url = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{repositorio}', parsedArgs.repositorio.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepositorioController::edit
 * @see app/Http/Controllers/RepositorioController.php:157
 * @route '/repositorios/{repositorio}/edit'
 */
edit.get = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RepositorioController::edit
 * @see app/Http/Controllers/RepositorioController.php:157
 * @route '/repositorios/{repositorio}/edit'
 */
edit.head = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RepositorioController::edit
 * @see app/Http/Controllers/RepositorioController.php:157
 * @route '/repositorios/{repositorio}/edit'
 */
    const editForm = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RepositorioController::edit
 * @see app/Http/Controllers/RepositorioController.php:157
 * @route '/repositorios/{repositorio}/edit'
 */
        editForm.get = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RepositorioController::edit
 * @see app/Http/Controllers/RepositorioController.php:157
 * @route '/repositorios/{repositorio}/edit'
 */
        editForm.head = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\RepositorioController::update
 * @see app/Http/Controllers/RepositorioController.php:167
 * @route '/repositorios/{repositorio}'
 */
export const update = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/repositorios/{repositorio}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\RepositorioController::update
 * @see app/Http/Controllers/RepositorioController.php:167
 * @route '/repositorios/{repositorio}'
 */
update.url = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{repositorio}', parsedArgs.repositorio.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepositorioController::update
 * @see app/Http/Controllers/RepositorioController.php:167
 * @route '/repositorios/{repositorio}'
 */
update.put = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\RepositorioController::update
 * @see app/Http/Controllers/RepositorioController.php:167
 * @route '/repositorios/{repositorio}'
 */
update.patch = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\RepositorioController::update
 * @see app/Http/Controllers/RepositorioController.php:167
 * @route '/repositorios/{repositorio}'
 */
    const updateForm = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RepositorioController::update
 * @see app/Http/Controllers/RepositorioController.php:167
 * @route '/repositorios/{repositorio}'
 */
        updateForm.put = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\RepositorioController::update
 * @see app/Http/Controllers/RepositorioController.php:167
 * @route '/repositorios/{repositorio}'
 */
        updateForm.patch = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\RepositorioController::destroy
 * @see app/Http/Controllers/RepositorioController.php:182
 * @route '/repositorios/{repositorio}'
 */
export const destroy = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/repositorios/{repositorio}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RepositorioController::destroy
 * @see app/Http/Controllers/RepositorioController.php:182
 * @route '/repositorios/{repositorio}'
 */
destroy.url = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{repositorio}', parsedArgs.repositorio.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepositorioController::destroy
 * @see app/Http/Controllers/RepositorioController.php:182
 * @route '/repositorios/{repositorio}'
 */
destroy.delete = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\RepositorioController::destroy
 * @see app/Http/Controllers/RepositorioController.php:182
 * @route '/repositorios/{repositorio}'
 */
    const destroyForm = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RepositorioController::destroy
 * @see app/Http/Controllers/RepositorioController.php:182
 * @route '/repositorios/{repositorio}'
 */
        destroyForm.delete = (args: { repositorio: string | number | { slug: string | number } } | [repositorio: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\RepositorioController::user
 * @see app/Http/Controllers/RepositorioController.php:135
 * @route '/mi-cuenta/repositories'
 */
export const user = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: user.url(options),
    method: 'get',
})

user.definition = {
    methods: ["get","head"],
    url: '/mi-cuenta/repositories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RepositorioController::user
 * @see app/Http/Controllers/RepositorioController.php:135
 * @route '/mi-cuenta/repositories'
 */
user.url = (options?: RouteQueryOptions) => {
    return user.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepositorioController::user
 * @see app/Http/Controllers/RepositorioController.php:135
 * @route '/mi-cuenta/repositories'
 */
user.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: user.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RepositorioController::user
 * @see app/Http/Controllers/RepositorioController.php:135
 * @route '/mi-cuenta/repositories'
 */
user.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: user.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RepositorioController::user
 * @see app/Http/Controllers/RepositorioController.php:135
 * @route '/mi-cuenta/repositories'
 */
    const userForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: user.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RepositorioController::user
 * @see app/Http/Controllers/RepositorioController.php:135
 * @route '/mi-cuenta/repositories'
 */
        userForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: user.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RepositorioController::user
 * @see app/Http/Controllers/RepositorioController.php:135
 * @route '/mi-cuenta/repositories'
 */
        userForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: user.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    user.form = userForm
const repositorios = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
user: Object.assign(user, user3b1c2b),
member: Object.assign(member, member),
}

export default repositorios