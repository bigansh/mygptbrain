import React from 'react'

const Button = ({ classes, title, isEmailFocused, onClick }) => {
	return (
		<button
			type='submit'
			className={` text-black text-xl w-full  lg:text-2xl  rounded px-4 py-2  focus:outline-none ${classes}`}
			onClick={onClick}
		>
			{title}
		</button>
	)
}

export default Button
