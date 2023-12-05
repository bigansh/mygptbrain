import { useColors } from '@/utils/colors'
import { Button, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
const FunctionalBtn = ({
	title,
	onClick,
	icon,
	disabled,
	className = '',
	enabled = false,
	isPro = false,
	bg = false,
}) => {
	const { base, base800, base700, base600, text } = useColors()
	const ex = enabled ? base800 : base700
	return (
		<Button
			cursor={'pointer'}
			onClick={onClick}
			_hover={{ bg: bg ? 'transparent' : ex }}
			isDisabled={disabled}
			bg={bg ? 'transparent' : ex}
			w={'100%'}
			justifyContent={'space-between'}
			fontWeight={'400'}
			isTruncated
			rounded={'0px'}
			className={className}
		>
			<Text textAlign={'initial'} isTruncated display={'flex'} gap={2}>
				{title}
				{isPro && (
					<Text
						fontStyle={'italic'}
						px={2}
						fontWeight={'500'}
						style={{
							background:
								'linear-gradient(243deg, #D4AF37 8.38%, rgba(212, 175, 55, 0.46) 101.34%)',
							'background-clip': 'text',
							'-webkit-background-clip': 'text',
							'-webkit-text-fill-color': 'transparent',
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
