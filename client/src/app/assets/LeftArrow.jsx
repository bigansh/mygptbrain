import * as React from 'react'
const SvgComponent = (props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={12}
		height={22}
		fill='none'
		{...props}
	>
		<path
			fill='#000'
			d='m11.53 11.53-10 10a.75.75 0 0 1-1.06-1.06L9.939 11 .469 1.53A.75.75 0 0 1 1.53.47l10 10a.75.75 0 0 1 0 1.06Z'
		/>
	</svg>
)
export default SvgComponent
