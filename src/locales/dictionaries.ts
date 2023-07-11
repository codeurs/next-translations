import 'server-only'
import type {Locale} from '.'

const dictionaries = {
	nl: () => import('./nl.json').then((module) => module.default),
	fr: () => import('./fr.json').then((module) => module.default),
	en: () => import('./en.json').then((module) => module.default)
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
