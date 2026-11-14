import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::request
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:14
 * @route '/forgot-password'
 */
export const request = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: request.url(options),
    method: 'get',
})

request.definition = {
    methods: ["get","head"],
    url: '/forgot-password',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::request
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:14
 * @route '/forgot-password'
 */
request.url = (options?: RouteQueryOptions) => {
    return request.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::request
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:14
 * @route '/forgot-password'
 */
request.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: request.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::request
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:14
 * @route '/forgot-password'
 */
request.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: request.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::request
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:14
 * @route '/forgot-password'
 */
    const requestForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: request.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::request
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:14
 * @route '/forgot-password'
 */
        requestForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: request.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::request
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:14
 * @route '/forgot-password'
 */
        requestForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: request.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    request.form = requestForm
/**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::email
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:19
 * @route '/forgot-password'
 */
export const email = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: email.url(options),
    method: 'post',
})

email.definition = {
    methods: ["post"],
    url: '/forgot-password',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::email
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:19
 * @route '/forgot-password'
 */
email.url = (options?: RouteQueryOptions) => {
    return email.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::email
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:19
 * @route '/forgot-password'
 */
email.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: email.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::email
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:19
 * @route '/forgot-password'
 */
    const emailForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: email.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::email
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:19
 * @route '/forgot-password'
 */
        emailForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: email.url(options),
            method: 'post',
        })
    
    email.form = emailForm
/**
* @see \App\Http\Controllers\Auth\SetPasswordController::set
 * @see app/Http/Controllers/Auth/SetPasswordController.php:20
 * @route '/set-password/{token}'
 */
export const set = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: set.url(args, options),
    method: 'get',
})

set.definition = {
    methods: ["get","head"],
    url: '/set-password/{token}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\SetPasswordController::set
 * @see app/Http/Controllers/Auth/SetPasswordController.php:20
 * @route '/set-password/{token}'
 */
set.url = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { token: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    token: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        token: args.token,
                }

    return set.definition.url
            .replace('{token}', parsedArgs.token.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\SetPasswordController::set
 * @see app/Http/Controllers/Auth/SetPasswordController.php:20
 * @route '/set-password/{token}'
 */
set.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: set.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\SetPasswordController::set
 * @see app/Http/Controllers/Auth/SetPasswordController.php:20
 * @route '/set-password/{token}'
 */
set.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: set.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\SetPasswordController::set
 * @see app/Http/Controllers/Auth/SetPasswordController.php:20
 * @route '/set-password/{token}'
 */
    const setForm = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: set.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\SetPasswordController::set
 * @see app/Http/Controllers/Auth/SetPasswordController.php:20
 * @route '/set-password/{token}'
 */
        setForm.get = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: set.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\SetPasswordController::set
 * @see app/Http/Controllers/Auth/SetPasswordController.php:20
 * @route '/set-password/{token}'
 */
        setForm.head = (args: { token: string | number } | [token: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: set.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    set.form = setForm
/**
* @see \App\Http\Controllers\Auth\SetPasswordController::store
 * @see app/Http/Controllers/Auth/SetPasswordController.php:41
 * @route '/set-password'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/set-password',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\SetPasswordController::store
 * @see app/Http/Controllers/Auth/SetPasswordController.php:41
 * @route '/set-password'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\SetPasswordController::store
 * @see app/Http/Controllers/Auth/SetPasswordController.php:41
 * @route '/set-password'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\SetPasswordController::store
 * @see app/Http/Controllers/Auth/SetPasswordController.php:41
 * @route '/set-password'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\SetPasswordController::store
 * @see app/Http/Controllers/Auth/SetPasswordController.php:41
 * @route '/set-password'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Auth\PasswordController::update
 * @see app/Http/Controllers/Auth/PasswordController.php:13
 * @route '/account/password'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/account/password',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Auth\PasswordController::update
 * @see app/Http/Controllers/Auth/PasswordController.php:13
 * @route '/account/password'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\PasswordController::update
 * @see app/Http/Controllers/Auth/PasswordController.php:13
 * @route '/account/password'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Auth\PasswordController::update
 * @see app/Http/Controllers/Auth/PasswordController.php:13
 * @route '/account/password'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\PasswordController::update
 * @see app/Http/Controllers/Auth/PasswordController.php:13
 * @route '/account/password'
 */
        updateForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const password = {
    request: Object.assign(request, request),
email: Object.assign(email, email),
set: Object.assign(set, set),
store: Object.assign(store, store),
update: Object.assign(update, update),
}

export default password