import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AccountSettingsController::edit
 * @see app/Http/Controllers/AccountSettingsController.php:15
 * @route '/account/settings'
 */
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/account/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AccountSettingsController::edit
 * @see app/Http/Controllers/AccountSettingsController.php:15
 * @route '/account/settings'
 */
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AccountSettingsController::edit
 * @see app/Http/Controllers/AccountSettingsController.php:15
 * @route '/account/settings'
 */
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AccountSettingsController::edit
 * @see app/Http/Controllers/AccountSettingsController.php:15
 * @route '/account/settings'
 */
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AccountSettingsController::edit
 * @see app/Http/Controllers/AccountSettingsController.php:15
 * @route '/account/settings'
 */
    const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AccountSettingsController::edit
 * @see app/Http/Controllers/AccountSettingsController.php:15
 * @route '/account/settings'
 */
        editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AccountSettingsController::edit
 * @see app/Http/Controllers/AccountSettingsController.php:15
 * @route '/account/settings'
 */
        editForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\AccountSettingsController::updateProfile
 * @see app/Http/Controllers/AccountSettingsController.php:34
 * @route '/account/settings/profile'
 */
export const updateProfile = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateProfile.url(options),
    method: 'patch',
})

updateProfile.definition = {
    methods: ["patch"],
    url: '/account/settings/profile',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\AccountSettingsController::updateProfile
 * @see app/Http/Controllers/AccountSettingsController.php:34
 * @route '/account/settings/profile'
 */
updateProfile.url = (options?: RouteQueryOptions) => {
    return updateProfile.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AccountSettingsController::updateProfile
 * @see app/Http/Controllers/AccountSettingsController.php:34
 * @route '/account/settings/profile'
 */
updateProfile.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateProfile.url(options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\AccountSettingsController::updateProfile
 * @see app/Http/Controllers/AccountSettingsController.php:34
 * @route '/account/settings/profile'
 */
    const updateProfileForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateProfile.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AccountSettingsController::updateProfile
 * @see app/Http/Controllers/AccountSettingsController.php:34
 * @route '/account/settings/profile'
 */
        updateProfileForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateProfile.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateProfile.form = updateProfileForm
const AccountSettingsController = { edit, updateProfile }

export default AccountSettingsController