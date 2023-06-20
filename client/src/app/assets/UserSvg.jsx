import * as React from 'react'
const SvgComponent = (props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={41}
		height={41}
		fill='none'
		{...props}
	>
		<path
			fill='#000'
			d='M20.5.18A20.32 20.32 0 1 0 40.82 20.5 20.344 20.344 0 0 0 20.5.18ZM9.232 34.445a13.15 13.15 0 0 1 22.536 0 17.89 17.89 0 0 1-22.536 0Zm4.495-15.539a6.773 6.773 0 1 1 13.546 0 6.773 6.773 0 0 1-13.546 0ZM33.55 32.78a15.445 15.445 0 0 0-7.969-6.252 9.165 9.165 0 1 0-10.16 0 15.445 15.445 0 0 0-7.969 6.252 17.93 17.93 0 1 1 26.098 0Z'
		/>
	</svg>
)
export default SvgComponent
