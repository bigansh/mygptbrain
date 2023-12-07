/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: '/about/privacy-policy',
				destination:
					'https://public.mygptbrain.com/Privacy-Policy-1be4ad6bbd8145fc96af9955298290ad',
			},
			{
				source: '/about/terms-and-conditions',
				destination:
					'https://public.mygptbrain.com/Terms-and-Conditions-d01ead427fdc477eac800fbd4903a3fd',
			},
			{
				source: '/onboarding/:path*',
				destination: '/onboarding',
			},
			{
				source: '/app/:path*',
				destination: '/app',
			},
		]
	},
}

module.exports = nextConfig
