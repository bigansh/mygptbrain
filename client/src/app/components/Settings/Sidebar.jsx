import { CreditCardIcon, PuzzleIcon, UserIcon } from '@heroicons/react/outline'
import { useState } from 'react'

const Sidebar = ({ activeButton, handleButtonClick }) => {
	return (
		<div className='flex flex-col items-start justify-start h-fit bg-[#F4F7FF]'>
			<ul className='flex flex-col list-none p-0 gap-4'>
				<SidebarItem
					activeButton={activeButton}
					onClick={() => handleButtonClick('account')}
					title='Account'
					icon={<UserIcon className='w-6 h-6' />}
				/>
				<SidebarItem
					activeButton={activeButton}
					onClick={() => handleButtonClick('platform')}
					title='Platform'
					icon={<PuzzleIcon className='w-6 h-6' />}
				/>
				<SidebarItem
					activeButton={activeButton}
					onClick={() => handleButtonClick('billing')}
					title='Billing'
					icon={<CreditCardIcon className='w-6 h-6' />}
				/>
			</ul>
		</div>
	)
}

export default Sidebar

const SidebarItem = ({ activeButton, onClick, title, icon }) => {
	return (
		<li className='flex-grow'>
			<button
				className={`p-4 rounded w-full text-left text-xl ${
					activeButton === title.toLowerCase()
						? 'bg-[#DFE8FF] text-black'
						: ''
				}`}
				onClick={onClick}
			>
				<div className='flex items-start justify-between space-x-10'>
					<div>{title}</div>
					{icon}
				</div>
			</button>
		</li>
	)
}
