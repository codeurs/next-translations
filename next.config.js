const routes = {
    nl: require('./src/routes/nl.json'),
    fr: require('./src/routes/fr.json'),
    en: require('./src/routes/en.json')
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        const rewrites = new Set()
        Object.keys(routes).forEach(locale => {
            Object.keys(routes[locale]).forEach(destination => {
                const source = encodeURI(routes[locale][destination])
                if (source !== destination)
                    rewrites.add({
                        source, destination
                    })
            })
        })
        return Array.from(rewrites)
    },
	swcMinify: true,
	eslint: {
		dirs: ['src']
	},
    compress: true
}

module.exports = nextConfig
