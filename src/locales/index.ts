import {match} from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import {NextRequest} from 'next/server'

export const i18n = {
	defaultLocale: 'nl',
	locales: ['nl', 'fr', 'en']
} as const

export type Locale = (typeof i18n)['locales'][number]

export const getBrowserLocale = (request: NextRequest): Locale => {
	const acceptLanguageHeader: string | null =
		request.headers.get('accept-language')
	const headerLanguages: string[] = acceptLanguageHeader
		? new Negotiator({
				headers: {'accept-language': acceptLanguageHeader}
		  }).languages()
		: []
	return match(
		headerLanguages,
		i18n.locales as unknown as string[],
		i18n.defaultLocale
	) as Locale
}
