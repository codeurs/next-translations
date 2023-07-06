'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {Route, getCurrentRouteKey, getRoute} from '@/routes'
import {Locale, i18n} from '@/locales'

const Nav: React.FC<{locale: Locale; dict: {[key: string]: string}}> = ({
	locale,
	dict
}) => {
	const pathname = usePathname()
	const activeRoute = getCurrentRouteKey(pathname, locale)
	const navKeys = Object.keys(dict) as (keyof typeof dict)[]
	return (
		<nav className="flex items-center justify-between flex-wrap p-6">
			<ul className="flex">
				{navKeys.map((fruitKey) => {
					const currentFruit: string = dict[fruitKey]
					const currentRoute: string = `/:locale/${
						fruitKey === 'carrot' ? 'vegetables' : 'fruit'
					}/${fruitKey}`
					const currentLocaleRoute = getRoute(currentRoute as Route, locale)
					if (!currentLocaleRoute) return null

					const isActiveRoute = activeRoute === currentRoute
					return (
						<li key={fruitKey} className="mr-6">
							<Link
								href={currentLocaleRoute}
								className={[
									'text-blue-500 hover:text-blue-800',
									(isActiveRoute && 'font-bold') || undefined
								].join(' ')}
								aria-current={isActiveRoute}
							>
								{currentFruit}
							</Link>
						</li>
					)
				})}
			</ul>
			{activeRoute && (
				<ul className="flex">
					{i18n.locales.map((l) => (
						<li key={l} className="ml-6">
							<Link
								href={getRoute(activeRoute, l)!}
								className={(l === locale && 'font-bold') || undefined}
								aria-current={l === locale}
							>
								{l.toUpperCase()}
							</Link>
						</li>
					))}
				</ul>
			)}
		</nav>
	)
}

export default Nav
