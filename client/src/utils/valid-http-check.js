import { Button, useDisclosure } from '@chakra-ui/react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
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
	status == true ? onOpen() : usernextFunc()
}

export const PaymentModal = ({ isPaymentModalOpen, onPaymentModalClose }) => {
	return (
		<Modal
			onClose={onPaymentModalClose}
			isOpen={isPaymentModalOpen}
			isCentered
		>
			<ModalOverlay />
			<ModalContent pb={4}>
				<ModalHeader>Pay Pay</ModalHeader>
				<ModalCloseButton />
				<ModalBody mt={0}>
					<stripe-pricing-table
						className='green'
						pricing-table-id='prctbl_1NuDELSItRikWRCiwkkTpwBo'
						publishable-key='pk_live_51N456YSItRikWRCiUrt8boF6w21p5R164Rog5R34A3M9b8uHiMwYiKEH35MCZZHU9vuC4P0LdNI2DYCkDeO9tybn00KTSj3dAb'
					></stripe-pricing-table>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}
