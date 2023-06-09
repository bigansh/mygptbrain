import React from 'react'
import NotionSvg from '../assets/NotionSvg'
import OneDriveSvg from '../assets/OneDrive'
import PocketSvg from '../assets/PocketSvg'
import RedditSvg from '../assets/RedditSvg'
import TwitterSvg from '../assets/TwitterSvg'
import WhatsAppSvg from '../assets/WhatsApp'

const Twitter = ({ title, classes = '' }) => {
	let SvgComponentName

	switch (title) {
		case 'notion':
			SvgComponentName = NotionSvg
			break
		case 'onedrive':
			SvgComponentName = OneDriveSvg
			break
		case 'pocket':
			SvgComponentName = PocketSvg
			break
		case 'reddit':
			SvgComponentName = RedditSvg
			break
		case 'twitter':
			SvgComponentName = TwitterSvg
			break
		case 'whatsapp':
			SvgComponentName = WhatsAppSvg
			break
		default:
			SvgComponentName = null
	}

	return (
		<div className='space-y-2'>
			<div className='text-2xl text-center md:text-start'>{title}</div>
			<button
				className={`flex items-center gap-2 text-white text-xl py-2 px-4 rounded space-x-6 ${classes}`}
			>
				<div>connect</div>
				<SvgComponentName />
			</button>
		</div>
	)
}

export default Twitter
