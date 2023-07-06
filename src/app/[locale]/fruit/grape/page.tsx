import {Locale} from '@/locales'
import {getDictionary} from '@/locales/dictionaries'

export default async function Grape({params}: {params: {locale: Locale}}) {
	const {locale} = params
	const t = await getDictionary(locale)
	return (
		<>
			<h1>{t.grape}</h1>
			<p className="text-9xl">🍇</p>
		</>
	)
}
