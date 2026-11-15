import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import settings69f00b from './settings'
/**
* @see \App\Http\Controllers\AccountSettingsController::settings
 * @see app/Http/Controllers/AccountSettingsController.php:15
 * @route '/account/settings'
 */
export const settings = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: settings.url(options),
    method: 'get',
})

settings.definition = {
    methods: ["get","head"],
    url: '/account/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AccountSettingsController::settings
 * @see app/Http/Controllers/AccountSettingsController.php:15
 * @route '/account/settings'
 */
settings.url = (options?: RouteQueryOptions) => {
    return settings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AccountSettingsController::settings
 * @see app/Http/Controllers/AccountSettingsController.php:15
 * @route '/account/settings'
 */
settings.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: settings.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AccountSettingsController::settings
 * @see app/Http/Controllers/AccountSettingsController.php:15
 * @route '/account/settings'
 */
settings.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: settings.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AccountSettingsController::settings
 * @see app/Http/Controllers/AccountSettingsController.php:15
 * @route '/account/settings'
 */
    const settingsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: settings.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AccountSettingsController::settings
 * @see app/Http/Controllers/AccountSettingsController.php:15
 * @route '/account/settings'
 */
        settingsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: settings.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AccountSettingsController::settings
 * @see app/Http/Controllers/AccountSettingsController.php:15
 * @route '/account/settings'
 */
        settingsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: settings.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    settings.form = settingsForm
const account = {
    settings: Object.assign(settings, settings69f00b),
}

export default account