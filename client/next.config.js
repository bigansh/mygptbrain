/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: '/about/privacy-policy',
				destination:
					'https://public.mygptbrain.com/Privacy-Policy-1be4ad6bbd8145fc96af9955298290ad',
				permanent: false,
			},
			{
				source: '/about/terms-and-conditions',
				destination:
					'https://public.mygptbrain.com/Terms-and-Conditions-d01ead427fdc477eac800fbd4903a3fd',
				permanent: false,
			},
			{
				source: '/onboarding/:path',
				destination: '/onboarding',
				permanent: true,
			},
			{
				source: '/app/:path',
				destination: '/app',
				permanent: true,
			},
		]
	},
}

module.exports = nextConfig
