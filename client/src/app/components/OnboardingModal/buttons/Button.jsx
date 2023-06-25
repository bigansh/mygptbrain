import React from 'react'
import NotionSvg from '../assets/NotionSvg'
import OneDriveSvg from '../assets/OneDrive'
import PocketSvg from '../assets/PocketSvg'
import RedditSvg from '../assets/RedditSvg'
import TwitterSvg from '../assets/TwitterSvg'
import WhatsAppSvg from '../assets/WhatsApp'
import { connectPlatform, getUser } from '@/api'
import { useQuery } from '@tanstack/react-query'

const Buttons = ({ title, classes = '' }) => {
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
			<div className='text-xl text-center md:text-start'>{title}</div>
			<button
				className={`flex items-center gap-12 text-white text-md py-2 px-4 rounded space-x-6 ${classes}`}
				onClick={() =>
					connectPlatform({
						platform: title,
						profileId: '02088239-b2cf-4bad-b265-9ddb965a9c54',
					})
				}
			>
				<div>connect</div>
				<SvgComponentName />
			</button>
		</div>
	)
}

export default Buttons
