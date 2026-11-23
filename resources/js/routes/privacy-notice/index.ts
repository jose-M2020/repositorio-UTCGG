import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PrivacyNoticeController::__invoke
 * @see app/Http/Controllers/PrivacyNoticeController.php:10
 * @route '/aviso-de-privacidad'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/aviso-de-privacidad',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PrivacyNoticeController::__invoke
 * @see app/Http/Controllers/PrivacyNoticeController.php:10
 * @route '/aviso-de-privacidad'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PrivacyNoticeController::__invoke
 * @see app/Http/Controllers/PrivacyNoticeController.php:10
 * @route '/aviso-de-privacidad'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PrivacyNoticeController::__invoke
 * @see app/Http/Controllers/PrivacyNoticeController.php:10
 * @route '/aviso-de-privacidad'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PrivacyNoticeController::__invoke
 * @see app/Http/Controllers/PrivacyNoticeController.php:10
 * @route '/aviso-de-privacidad'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PrivacyNoticeController::__invoke
 * @see app/Http/Controllers/PrivacyNoticeController.php:10
 * @route '/aviso-de-privacidad'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PrivacyNoticeController::__invoke
 * @see app/Http/Controllers/PrivacyNoticeController.php:10
 * @route '/aviso-de-privacidad'
 */
        showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const privacyNotice = {
    show: Object.assign(show, show),
}

export default privacyNotice