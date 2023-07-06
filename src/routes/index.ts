import {default as nl} from './nl.json'
import {default as fr} from './fr.json'
import {default as en} from './en.json'
import {Locale} from '@/locales'

const routes = {nl, fr, en}

export type Route = keyof (typeof routes)[Locale]

/**
 * Returns the route in the requested locale
 *
 * @param route
 * @param locale
 * @param routeParams
 * @returns
 */
export const getRoute = (
	route: Route,
	locale: Locale,
	routeParams?: {[key: string]: string}
): (typeof routes)[Locale][Route] | null => {
	let translatedRoute = routes[locale][route] || null
	if (!translatedRoute) return null

	const params = {...(routeParams || {}), locale}
	Object.keys(params).forEach((paramKey) => {
		translatedRoute = translatedRoute!.replaceAll(
			`:${paramKey}`,
			`${params[paramKey as keyof typeof params]}`
		)
	})

	return translatedRoute
}

/**
 * Returns the key of the current translated route
 *
 * @param pathname The current translated pathname, usually coming from usePathname()
 * @param locale Locale
 * @returns
 */
export const getCurrentRouteKey = (
	pathname: string,
	locale: Locale
): Route | null => {
	const localeRoutes = routes[locale]
	const localeRouteKeys = Object.keys(localeRoutes) as Route[]

	const matchingLocaleRouteKey = localeRouteKeys.find((localeRouteKey) => {
		const pathParts = decodeURI(pathname).split('/')
		const valueParts = localeRoutes[localeRouteKey].split('/')
		if (valueParts.length !== pathParts.length) return false

		const keyParts = localeRouteKey.split('/')

		keyParts.forEach((keyPart, index) => {
			if (keyPart.substring(0, 1) === ':') {
				pathParts[index] = keyPart
			}
		})

		return pathParts.join('/') === valueParts.join('/')
	})

	if (!matchingLocaleRouteKey) return null
	return matchingLocaleRouteKey
}
