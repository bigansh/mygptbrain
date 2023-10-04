import { useColors } from '@/utils/colors'
import { Button, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
const FunctionalBtn = ({
	title,
	onClick,
	icon,
	disabled,
	enabled = false,
	isPro = false,
}) => {
	const { base, base800, base700, base600, text } = useColors()
	return (
		<Button
			cursor={'pointer'}
			onClick={onClick}
			_hover={{ bg: enabled ? base800 : base600 }}
			isDisabled={disabled}
			bg={enabled ? base800 : base700}
			w={'100%'}
			justifyContent={'space-between'}
			fontWeight={'400'}
			isTruncated
		>
			<Text textAlign={'initial'} isTruncated display={'flex'} gap={2}>
				{title}
				{isPro && (
					<Text
						fontStyle={'italic'}
						style={{
							background:
								'linear-gradient(243deg, #D4AF37 8.38%, rgba(212, 175, 55, 0.46) 101.34%)',
							'background-clip': 'text',
							'-webkit-background-clip': 'text',
							'-webkit-text-fill-color': 'transparent',
							'backdrop-filter': 'blur(2.5px)',
						}}
					>
						pro
					</Text>
				)}
			</Text>
			{icon}
		</Button>
	)
}

export default FunctionalBtn
