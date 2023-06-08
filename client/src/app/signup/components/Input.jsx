import React from 'react'

const Input = ({
	label,
	type,
	value,
	onChange,
	onFocus = () => {},
	onBlur = () => {},
	placeholder,
	className = '',
}) => {
	return (
		<div className='space-y-1'>
			<label
				htmlFor={label}
				className='block text-3xl text-black mb-1 font-poppins'
			>
				{label}
			</label>
			<input
				type={type}
				value={value}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				placeholder={placeholder}
				className={
					`
				w-full border  rounded-md py-2 px-3 bg-[#DFE8FF80] bg-opacity-50 focus:border-[#DFE8FF80] focus:border-1 lg:text-2xl text-xl text-black
				` + className
				}
			/>
		</div>
	)
}

export default Input
