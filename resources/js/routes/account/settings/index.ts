import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\AccountSettingsController::profile
 * @see app/Http/Controllers/AccountSettingsController.php:34
 * @route '/account/settings/profile'
 */
export const profile = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: profile.url(options),
    method: 'patch',
})

profile.definition = {
    methods: ["patch"],
    url: '/account/settings/profile',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\AccountSettingsController::profile
 * @see app/Http/Controllers/AccountSettingsController.php:34
 * @route '/account/settings/profile'
 */
profile.url = (options?: RouteQueryOptions) => {
    return profile.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AccountSettingsController::profile
 * @see app/Http/Controllers/AccountSettingsController.php:34
 * @route '/account/settings/profile'
 */
profile.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: profile.url(options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\AccountSettingsController::profile
 * @see app/Http/Controllers/AccountSettingsController.php:34
 * @route '/account/settings/profile'
 */
    const profileForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: profile.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AccountSettingsController::profile
 * @see app/Http/Controllers/AccountSettingsController.php:34
 * @route '/account/settings/profile'
 */
        profileForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: profile.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    profile.form = profileForm
const settings = {
    profile: Object.assign(profile, profile),
}

export default settings