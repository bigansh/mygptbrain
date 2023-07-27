'use client'
import React, { useState } from 'react'
import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Lorem,
	Flex,
	Heading,
	Grid,
} from '@chakra-ui/react'
import FunctionalBtn from './FunctionalBtn'
import { useColors } from '@/utils/colors'
import { GoCreditCard } from 'react-icons/go'
import { PiPuzzlePiece } from 'react-icons/pi'
import { AiOutlineUser } from 'react-icons/ai'
import {
	AccountComponent,
	PlatformComponent,
	BillingComponent,
} from '@/app/app/dashboard/components'
import { BillingIcon, PlatformIcon, UserIcon } from '@/icons'
const SettingModal = ({ isOpenSetting, onCloseSetting }) => {
	const { base, base800, base700, base600, text } = useColors()
	const [activeButton, setActiveButton] = useState('account')

	const handleButtonClick = (button) => {
		setActiveButton(button)
	}

	let childComponent
	switch (activeButton) {
		case 'account':
			childComponent = <AccountComponent />
			break
		case 'platform':
			childComponent = <PlatformComponent />
			break
		case 'billing':
			childComponent = <BillingComponent />
			break
		default:
			childComponent = null
	}
	return (
		<Modal size={'6xl'} isOpen={isOpenSetting} onClose={onCloseSetting}>
			<ModalOverlay
				backdropFilter='blur(2px)'
				//bg='rgba(123, 130, 148, 0.2)'
			/>
			<ModalContent>
				<ModalCloseButton />
				<ModalBody p={0}>
					<Grid
						h={'80vh'}
						templateColumns={'1fr 4fr'}
						rounded={'lg'}
						overflow={'hidden'}
					>
						<Flex
							h={'100%'}
							flexDir='column'
							bg={base800}
							p={5}
							height={'100%'}
							gap={2}
						>
							<Heading fontSize={'2xl'} fontWeight={'500'} mb={4}>
								setting
							</Heading>
							<SidebarItem
								activeButton={activeButton}
								cursor={'pointer'}
								onClick={() => handleButtonClick('account')}
								title='account'
								icon={<UserIcon fill={text} />}
							/>
							<SidebarItem
								activeButton={activeButton}
								cursor={'pointer'}
								onClick={() => handleButtonClick('platform')}
								title='platform'
								icon={<PlatformIcon fill={text} />}
							/>
							<SidebarItem
							disabled={true}
								activeButton={activeButton}
								cursor={'pointer'}
								onClick={() => handleButtonClick('billing')}
								title='billing'
								icon={<BillingIcon fill={text} />}
							/>
						</Flex>
						<Flex bg={base}>{childComponent}</Flex>
					</Grid>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

export default SettingModal

const SidebarItem = ({ title, icon, onClick, activeButton , disabled = false }) => {
	const { base, base800, base700, text, base600 } = useColors()
	return (
		<Button
			cursor={'pointer'}
			onClick={!disabled && onClick}
			bg={activeButton == title ? base700 : base800}
			_hover={{ bg: base600 }}
			opacity={disabled ? 0.5 : 1}
			cursor={disabled ? 'not-allowed' : 'pointer'}
			w={'100%'}
			// _active={{ background: base800 }}
			justifyContent={'space-between'}
			fontWeight={'400'}
			disabled={disabled}
		>
			{title}
			{icon}
		</Button>
	)
}
