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
			d='m.47 10.47 10-10a.75.75 0 0 1 1.06 1.06L2.061 11l9.47 9.47a.75.75 0 0 1-1.06 1.06l-10-10a.75.75 0 0 1 0-1.06Z'
		/>
	</svg>
)
export default SvgComponent
