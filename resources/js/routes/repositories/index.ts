import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import advisors from './advisors'
import account from './account'
import members from './members'
/**
* @see \App\Http\Controllers\RepositoryController::index
 * @see app/Http/Controllers/RepositoryController.php:41
 * @route '/repositories'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/repositories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RepositoryController::index
 * @see app/Http/Controllers/RepositoryController.php:41
 * @route '/repositories'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepositoryController::index
 * @see app/Http/Controllers/RepositoryController.php:41
 * @route '/repositories'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RepositoryController::index
 * @see app/Http/Controllers/RepositoryController.php:41
 * @route '/repositories'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RepositoryController::index
 * @see app/Http/Controllers/RepositoryController.php:41
 * @route '/repositories'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RepositoryController::index
 * @see app/Http/Controllers/RepositoryController.php:41
 * @route '/repositories'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RepositoryController::index
 * @see app/Http/Controllers/RepositoryController.php:41
 * @route '/repositories'
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
* @see \App\Http\Controllers\RepositoryController::create
 * @see app/Http/Controllers/RepositoryController.php:134
 * @route '/repositories/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/repositories/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RepositoryController::create
 * @see app/Http/Controllers/RepositoryController.php:134
 * @route '/repositories/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepositoryController::create
 * @see app/Http/Controllers/RepositoryController.php:134
 * @route '/repositories/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RepositoryController::create
 * @see app/Http/Controllers/RepositoryController.php:134
 * @route '/repositories/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RepositoryController::create
 * @see app/Http/Controllers/RepositoryController.php:134
 * @route '/repositories/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RepositoryController::create
 * @see app/Http/Controllers/RepositoryController.php:134
 * @route '/repositories/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RepositoryController::create
 * @see app/Http/Controllers/RepositoryController.php:134
 * @route '/repositories/create'
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
* @see \App\Http\Controllers\RepositoryController::store
 * @see app/Http/Controllers/RepositoryController.php:141
 * @route '/repositories'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/repositories',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RepositoryController::store
 * @see app/Http/Controllers/RepositoryController.php:141
 * @route '/repositories'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepositoryController::store
 * @see app/Http/Controllers/RepositoryController.php:141
 * @route '/repositories'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\RepositoryController::store
 * @see app/Http/Controllers/RepositoryController.php:141
 * @route '/repositories'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RepositoryController::store
 * @see app/Http/Controllers/RepositoryController.php:141
 * @route '/repositories'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\RepositoryController::edit
 * @see app/Http/Controllers/RepositoryController.php:276
 * @route '/repositories/{repository}/edit'
 */
export const edit = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/repositories/{repository}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RepositoryController::edit
 * @see app/Http/Controllers/RepositoryController.php:276
 * @route '/repositories/{repository}/edit'
 */
edit.url = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{repository}', parsedArgs.repository.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepositoryController::edit
 * @see app/Http/Controllers/RepositoryController.php:276
 * @route '/repositories/{repository}/edit'
 */
edit.get = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RepositoryController::edit
 * @see app/Http/Controllers/RepositoryController.php:276
 * @route '/repositories/{repository}/edit'
 */
edit.head = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RepositoryController::edit
 * @see app/Http/Controllers/RepositoryController.php:276
 * @route '/repositories/{repository}/edit'
 */
    const editForm = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RepositoryController::edit
 * @see app/Http/Controllers/RepositoryController.php:276
 * @route '/repositories/{repository}/edit'
 */
        editForm.get = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RepositoryController::edit
 * @see app/Http/Controllers/RepositoryController.php:276
 * @route '/repositories/{repository}/edit'
 */
        editForm.head = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\RepositoryController::update
 * @see app/Http/Controllers/RepositoryController.php:287
 * @route '/repositories/{repository}'
 */
export const update = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/repositories/{repository}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\RepositoryController::update
 * @see app/Http/Controllers/RepositoryController.php:287
 * @route '/repositories/{repository}'
 */
update.url = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{repository}', parsedArgs.repository.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepositoryController::update
 * @see app/Http/Controllers/RepositoryController.php:287
 * @route '/repositories/{repository}'
 */
update.put = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\RepositoryController::update
 * @see app/Http/Controllers/RepositoryController.php:287
 * @route '/repositories/{repository}'
 */
update.patch = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\RepositoryController::update
 * @see app/Http/Controllers/RepositoryController.php:287
 * @route '/repositories/{repository}'
 */
    const updateForm = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RepositoryController::update
 * @see app/Http/Controllers/RepositoryController.php:287
 * @route '/repositories/{repository}'
 */
        updateForm.put = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\RepositoryController::update
 * @see app/Http/Controllers/RepositoryController.php:287
 * @route '/repositories/{repository}'
 */
        updateForm.patch = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\RepositoryController::destroy
 * @see app/Http/Controllers/RepositoryController.php:328
 * @route '/repositories/{repository}'
 */
export const destroy = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/repositories/{repository}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RepositoryController::destroy
 * @see app/Http/Controllers/RepositoryController.php:328
 * @route '/repositories/{repository}'
 */
destroy.url = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{repository}', parsedArgs.repository.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepositoryController::destroy
 * @see app/Http/Controllers/RepositoryController.php:328
 * @route '/repositories/{repository}'
 */
destroy.delete = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\RepositoryController::destroy
 * @see app/Http/Controllers/RepositoryController.php:328
 * @route '/repositories/{repository}'
 */
    const destroyForm = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\RepositoryController::destroy
 * @see app/Http/Controllers/RepositoryController.php:328
 * @route '/repositories/{repository}'
 */
        destroyForm.delete = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\RepositoryController::mine
 * @see app/Http/Controllers/RepositoryController.php:233
 * @route '/account/repositories'
 */
export const mine = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mine.url(options),
    method: 'get',
})

mine.definition = {
    methods: ["get","head"],
    url: '/account/repositories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RepositoryController::mine
 * @see app/Http/Controllers/RepositoryController.php:233
 * @route '/account/repositories'
 */
mine.url = (options?: RouteQueryOptions) => {
    return mine.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepositoryController::mine
 * @see app/Http/Controllers/RepositoryController.php:233
 * @route '/account/repositories'
 */
mine.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: mine.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RepositoryController::mine
 * @see app/Http/Controllers/RepositoryController.php:233
 * @route '/account/repositories'
 */
mine.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: mine.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RepositoryController::mine
 * @see app/Http/Controllers/RepositoryController.php:233
 * @route '/account/repositories'
 */
    const mineForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: mine.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RepositoryController::mine
 * @see app/Http/Controllers/RepositoryController.php:233
 * @route '/account/repositories'
 */
        mineForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: mine.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RepositoryController::mine
 * @see app/Http/Controllers/RepositoryController.php:233
 * @route '/account/repositories'
 */
        mineForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: mine.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    mine.form = mineForm
/**
* @see \App\Http\Controllers\RepositoryController::show
 * @see app/Http/Controllers/RepositoryController.php:194
 * @route '/repositories/{repository}'
 */
export const show = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/repositories/{repository}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RepositoryController::show
 * @see app/Http/Controllers/RepositoryController.php:194
 * @route '/repositories/{repository}'
 */
show.url = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{repository}', parsedArgs.repository.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RepositoryController::show
 * @see app/Http/Controllers/RepositoryController.php:194
 * @route '/repositories/{repository}'
 */
show.get = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RepositoryController::show
 * @see app/Http/Controllers/RepositoryController.php:194
 * @route '/repositories/{repository}'
 */
show.head = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RepositoryController::show
 * @see app/Http/Controllers/RepositoryController.php:194
 * @route '/repositories/{repository}'
 */
    const showForm = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RepositoryController::show
 * @see app/Http/Controllers/RepositoryController.php:194
 * @route '/repositories/{repository}'
 */
        showForm.get = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RepositoryController::show
 * @see app/Http/Controllers/RepositoryController.php:194
 * @route '/repositories/{repository}'
 */
        showForm.head = (args: { repository: string | { slug: string } } | [repository: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const repositories = {
    advisors: Object.assign(advisors, advisors),
index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
mine: Object.assign(mine, mine),
account: Object.assign(account, account),
members: Object.assign(members, members),
show: Object.assign(show, show),
}

export default repositories