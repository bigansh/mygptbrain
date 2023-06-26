import { AddThreadIcon } from '@/app/assets'
import React, { useState } from 'react'
const FunctionalBtn = ({ title, onClick, icon }) => {
	return (
		<div className='flex items-center justify-between bg-[#DFE8FF80] p-4 rounded-lg'>
			<button
				className='text-black rounded-md text-xl focus:outline-none'
				//onClick={handleAddChat}
			>
				{title}
			</button>
			{icon}
		</div>
	)
}

export default FunctionalBtn
