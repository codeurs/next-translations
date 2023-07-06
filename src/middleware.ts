import {NextRequest, NextResponse} from 'next/server'
import {Locale, getBrowserLocale, i18n} from './locales'

const PUBLIC_FILE = /\.(.*)$/

export const middleware = (request: NextRequest) => {
	// check if there is any supported locale in the pathname
	const pathname: string = request.nextUrl.pathname

	if (
		pathname.startsWith('/_next') ||
		pathname.startsWith('/__nextjs') ||
		pathname.includes('/api/') ||
		PUBLIC_FILE.test(pathname)
	)
		return

	const pathnameIsMissingLocale: boolean = i18n.locales.every(
		(locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
	)

	// redirect if there is no locale
	if (pathnameIsMissingLocale) {
		const locale: Locale = getBrowserLocale(request)
		return NextResponse.redirect(new URL(`/${locale}`, request.url))
	}
}

export const config = {
	matcher: [
		// Skipp all internal paths (_next)
		'/((?!_next).*)',
		// Only run on root (/) URL
		'/'
	]
}
