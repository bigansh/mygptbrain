import { useColors } from '@/utils/colors'
import { Button, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
const FunctionalBtn = ({ title, onClick, icon }) => {
	const { base, base800, base700, base600, text } = useColors()
	return (
		<Button
			cursor={'pointer'}
			onClick={onClick}
			_hover={{ bg: base600 }}
			bg={base700}
			w={'100%'}
			justifyContent={'space-between'}
			fontWeight={'400'}
		>
			{title}
			{icon}
		</Button>

		// <div className="flex items-center justify-between bg-[#DFE8FF80] p-4 rounded-lg">
		//   <button
		//     className="text-black rounded-md text-xl focus:outline-none"
		//     cursor={'pointer'} onClick={cursor={'pointer'} onClick}
		//   >
		//     {title}
		//   </button>
		//   {icon}
		// </div>
	)
}

export default FunctionalBtn
