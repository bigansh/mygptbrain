'use client'

import { LeftArrowSvg, RightArrowSvg } from '@/app/assets'
import React, { useState } from 'react'

const SlidableRightSidebar = ({
	isSidebarOpen,
	setIsSidebarOpen,
	handleToggleSidebar,
}) => {
	return (
		<div
			className={`relative z-50 shadow-xl ${
				isSidebarOpen ? 'w-full' : 'w-0'
			}`}
		>
			<button
				onClick={handleToggleSidebar}
				className={`fixed bottom-0 z-10 shadow-xl px-4 py-2 rounded-md ${
					isSidebarOpen
						? 'right-1/4 bg-[#F4F7FF]'
						: 'right-0 bg-white'
				}`}
			>
				{isSidebarOpen ? <LeftArrowSvg /> : <RightArrowSvg />}
			</button>

			<div
				className={`sidebar bg-[#F4F7FF] w-1/4 h-screen  fixed top-0 right-0 transform transition-transform duration-300 ${
					isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				{/* Sidebar content */}
			</div>

			<div
				className={`content pr-64 transition-pr duration-300 ${
					isSidebarOpen ? 'pr-0' : 'pr-64'
				}`}
			>
				{/* Main content */}
			</div>
		</div>
	)
}

export default SlidableRightSidebar
