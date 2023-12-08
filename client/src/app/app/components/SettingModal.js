'use client'
import React, { useState } from 'react'
import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalCloseButton,
	Flex,
	Box,
	Heading,
	Text,
	Grid,
} from '@chakra-ui/react'
import { useColors } from '@/utils/colors'
import {
	AccountComponent,
	PlatformComponent,
	BillingComponent,
	PreferencesComponent,
} from '@/app/app/components'
import { BillingIcon, PlatformIcon, UserIcon, PreferencesIcon } from '@/icons'
import { useRouter } from 'next/navigation'
import { useUserData } from '@/app/query-hooks'
const SettingModal = ({ isOpenSetting, onCloseSetting }) => {
	const { base, base800, text } = useColors()
	const router = useRouter()
	const [activeButton, setActiveButton] = useState('account')

	const handleButtonClick = (button) => {
		setActiveButton(button)
	}

	const { data: userData } = useUserData()

	let childComponent
	switch (activeButton) {
		case 'account':
			childComponent = <AccountComponent />
			break
		case 'platform':
			childComponent = <PlatformComponent />
			break
		case 'preferences':
			childComponent = <PreferencesComponent />
			break
		case 'billing':
			childComponent = <BillingComponent />
			break
		default:
			childComponent = null
	}
	return (
		<Modal
			size={['full', '6xl']}
			isOpen={isOpenSetting}
			onClose={onCloseSetting}
		>
			<ModalOverlay
				backdropFilter='blur(2px)'
				//bg='rgba(123, 130, 148, 0.2)'
			/>
			<ModalContent mx={[0, 4]}>
				<ModalCloseButton />
				<ModalBody p={0}>
					<Grid
						h={['100vh', '80vh']}
						templateColumns={'1fr 4fr'}
						rounded={'lg'}
						overflow={'hidden'}
						display={['flex', 'grid']}
						flexDir={['column', 'row']}
					>
						<Flex
							flexDir='column'
							bg={base800}
							p={[2, 5]}
							h={['auto', '100%']}
							gap={2}
						>
							<Heading
								fontSize={'2xl'}
								fontWeight={'500'}
								mb={4}
								p={[2, 0]}
							>
								setting
							</Heading>
							<Flex
								display={['grid', 'flex']}
								gridTemplateColumns={'1fr 1fr'}
								flexDir={['row', 'column']}
								gap={[0, 2]}
							>
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
									onClick={() =>
										handleButtonClick('preferences')
									}
									title='preferences'
									icon={<PreferencesIcon fill={text} />}
								/>
								<SidebarItem
									activeButton={activeButton}
									cursor={'pointer'}
									onClick={() =>
										handleButtonClick('platform')
									}
									title='platform'
									icon={<PlatformIcon fill={text} />}
								/>
								<SidebarItem
									activeButton={activeButton}
									cursor={'pointer'}
									onClick={() =>
										!userData?.userMetadata
											?.subscription_status
											? handleButtonClick('billing')
											: router.push(
													`https://billing.stripe.com/p/login/${process.env.NEXT_PUBLIC_BILLING_PORTAL}?prefilled_email=${userData.email}`
											  )
									}
									title='billing'
									icon={<BillingIcon fill={text} />}
								/>
							</Flex>
						</Flex>
						<Flex bg={base} overflow={'scroll'}>
							{childComponent}
						</Flex>
					</Grid>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

export default SettingModal

const SidebarItem = ({
	title,
	icon,
	onClick,
	activeButton,
	disabled = false,
}) => {
	const { base800, base700, base600 } = useColors()
	return (
		<Button
			onClick={!disabled && onClick}
			bg={activeButton == title ? base700 : base800}
			_hover={{ bg: base600 }}
			opacity={disabled ? 0.5 : 1}
			cursor={disabled ? 'not-allowed' : 'pointer'}
			w={'100%'}
			justifyContent={'space-between'}
			fontWeight={'400'}
			fontSize={['sm', 'md']}
			disabled={disabled}
			textAlign={['center', 'left']}
			m={'auto'}
			px={[1, 4]}
			isTruncated
		>
			<Text textAlign={['center', 'left']} margin={['auto', 'unset']}>
				{title}
			</Text>
			<Box display={['none', 'block']}>{icon}</Box>
		</Button>
	)
}
