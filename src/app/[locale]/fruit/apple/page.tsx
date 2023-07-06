import {getDictionary} from '@/locales/dictionaries'
import {Locale} from '@/locales'

export default async function Apple({params}: {params: {locale: Locale}}) {
	const {locale} = params
	const t = await getDictionary(locale)
	return (
		<>
			<h1>{t.apple}</h1>
			<p className="text-9xl">🍏</p>
		</>
	)
}
