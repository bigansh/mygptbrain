import { ChatIconSvg } from '@/app/assets'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PiChatsThin } from 'react-icons/pi'

const SingleThread = ({ chatState , icon }) => {
	return (
		<div>
			{chatState.map((item, index) => (
				<button
					key={item.id}
					className={`grid grid-cols-[24px_1fr] items-center justify-start  space-x-4 w-full hover:bg-[#DFE8FF] p-4 rounded-lg cursor-pointer`}
				>
					{icon}

					<div className='text-xl truncate text-left'>
						{item.name}
					</div>
				</button>
			))}
		</div>
	)
}

export default SingleThread

// currentChatContext === item.id ? 'bg-[#DFE8FF]' : ''
