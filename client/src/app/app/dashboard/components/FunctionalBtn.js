import { useColors } from '@/utils/colors'
import { Button, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
const FunctionalBtn = ({ title, onClick, icon, disabled }) => {
	const { base, base800, base700, base600, text } = useColors()
	return (
		<Button
			cursor={'pointer'}
			onClick={onClick}
			_hover={{ bg: base600 }}
			isDisabled={disabled}
			bg={base700}
			w={'100%'}
			justifyContent={'space-between'}
			fontWeight={'400'}
			isTruncated
		>
			<Text textAlign={'initial'} isTruncated>
				{title}
			</Text>
			{icon}
		</Button>
	)
}

export default FunctionalBtn
