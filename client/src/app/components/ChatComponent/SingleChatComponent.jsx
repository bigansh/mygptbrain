import { GPTBrain, UserSvg } from '@/app/assets'
import Image from 'next/image'
import React from 'react'

const SingleChatComponent = ({ message }) => {
	return (
		<div
			className={` flex items-start justify-start space-x-4 py-8 px-6 ${
				message.sender === 'user'
					? 'bg-[#DFE8FF80] bg-opacity-50 text-white '
					: 'bg-white'
			}`}
		>
			<div>
				{message.sender === 'user' ? (
					<UserSvg />
				) : (
					<div className=''>
						<Image
							src={GPTBrain}
							alt='GPTBrain Logo'
							className='scale-110'
						/>
					</div>
				)}
			</div>

			<div className={`rounded-lg p-2 w-full `}>
				<p className='text-xl text-black'>{message.text}</p>
			</div>
		</div>
	)
}

export default SingleChatComponent
