import { Button, useDisclosure } from '@chakra-ui/react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalCloseButton,
} from '@chakra-ui/react'

function isValidHttpUrl(str) {
	const pattern = new RegExp(
		'^(https?:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$', // fragment locator
		'i'
	)
	return pattern.test(str)
}

export default isValidHttpUrl

export const upgradeFunction = ({ status, usernextFunc, onOpen }) => {
	status == false ? onOpen() : usernextFunc()
}

export const PaymentModal = ({ isPaymentModalOpen, onPaymentModalClose }) => {
	return (
		<Modal
			onClose={onPaymentModalClose}
			isOpen={isPaymentModalOpen}
			isCentered
		>
			<ModalOverlay />
			<ModalContent pb={4} bg={'white'} text={'black'}>
				<ModalCloseButton color={'black'} />
				<ModalBody mt={0}>
					<stripe-pricing-table
						pricing-table-id={
							process.env.NEXT_PUBLIC_STRIPE_TABLE_ID
						}
						publishable-key={
							process.env.NEXT_PUBLIC_PUBLISHABLE_KEY
						}
					></stripe-pricing-table>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}
