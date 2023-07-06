import {Locale} from '@/locales'

export default async function Home({params}: {params: {locale: Locale}}) {
	return (
		<>
			<h1>Welcome home</h1>
		</>
	)
}
