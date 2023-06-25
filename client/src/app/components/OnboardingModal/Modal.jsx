import { useState } from 'react'

const Modal = ({ isOpen, onClose, title, children }) => {
	const [isClosing, setIsClosing] = useState(false)
	const [activeButton, setActiveButton] = useState('')

	const handleClose = () => {
		setIsClosing(true)
		setTimeout(() => {
			onClose()
			setIsClosing(false)
		}, 300)
	}

	if (!isOpen) {
		return null
	}

	

	return (
		<div className='fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50'>
			<div className='fixed inset-0 bg-white opacity-40'></div>
			<div className='flex align-middle justify-center items-center z-50 bg-white h-[80%] w-[80%] shadow-lg rounded-lg relative'>
				<button
					type='button'
					class='absolute text-gray-400 bg-transparent  hover:text-gray-900 rounded-lg text-md p-6 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white right-0 top-0'
					onClick={handleClose}
				>
					<svg
						aria-hidden='true'
						class='w-5 h-5'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							fill-rule='evenodd'
							d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
							clip-rule='evenodd'
						></path>
					</svg>
				</button>
				{children}
			</div>
		</div>
	)
}

export default Modal
