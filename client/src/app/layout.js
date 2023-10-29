//import { ColorModeScript } from '@chakra-ui/react'
import { TourProvider } from '@reactour/tour'
import './globals.css'
import { Providers } from './providers'
import { Metadata } from 'next'

export const metadata = {
	title: ' myGPTBrain | QnA over your personal data',
	description:
		'Let AI handle the heavy lifting. Connect different sources, upload documents, or include links. Our technology reads for you. Ask questions, get answers from myGPTBrain with the right context. Your queries, our effort, your knowledge.',
	images: [
		{
			url: 'https://i.postimg.cc/d1P9snZf/Untitled-design.png',
		},
	],
	openGraph: {
		type: 'website',
		images: 'https://i.postimg.cc/d1P9snZf/Untitled-design.png',
	},
}

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>
				<Providers>{children}</Providers>
				{/* <ColorModeScript initialColorMode={'light'} /> */}
			</body>
		</html>
	)
}
