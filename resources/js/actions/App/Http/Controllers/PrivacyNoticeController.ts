import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PrivacyNoticeController::__invoke
 * @see app/Http/Controllers/PrivacyNoticeController.php:10
 * @route '/aviso-de-privacidad'
 */
const PrivacyNoticeController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: PrivacyNoticeController.url(options),
    method: 'get',
})

PrivacyNoticeController.definition = {
    methods: ["get","head"],
    url: '/aviso-de-privacidad',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PrivacyNoticeController::__invoke
 * @see app/Http/Controllers/PrivacyNoticeController.php:10
 * @route '/aviso-de-privacidad'
 */
PrivacyNoticeController.url = (options?: RouteQueryOptions) => {
    return PrivacyNoticeController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PrivacyNoticeController::__invoke
 * @see app/Http/Controllers/PrivacyNoticeController.php:10
 * @route '/aviso-de-privacidad'
 */
PrivacyNoticeController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: PrivacyNoticeController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PrivacyNoticeController::__invoke
 * @see app/Http/Controllers/PrivacyNoticeController.php:10
 * @route '/aviso-de-privacidad'
 */
PrivacyNoticeController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: PrivacyNoticeController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PrivacyNoticeController::__invoke
 * @see app/Http/Controllers/PrivacyNoticeController.php:10
 * @route '/aviso-de-privacidad'
 */
    const PrivacyNoticeControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: PrivacyNoticeController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PrivacyNoticeController::__invoke
 * @see app/Http/Controllers/PrivacyNoticeController.php:10
 * @route '/aviso-de-privacidad'
 */
        PrivacyNoticeControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: PrivacyNoticeController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PrivacyNoticeController::__invoke
 * @see app/Http/Controllers/PrivacyNoticeController.php:10
 * @route '/aviso-de-privacidad'
 */
        PrivacyNoticeControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: PrivacyNoticeController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    PrivacyNoticeController.form = PrivacyNoticeControllerForm
export default PrivacyNoticeController