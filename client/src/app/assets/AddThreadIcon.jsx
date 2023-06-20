import * as React from 'react'
const SvgComponent = (props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		fill='none'
		viewBox='0 0 18 18'
		{...props}
	>
		<path
			fill='#000'
			d='M17.813 9a.563.563 0 0 1-.563.563H9.562v7.687a.562.562 0 1 1-1.124 0V9.562H.75a.562.562 0 1 1 0-1.124h7.688V.75a.562.562 0 1 1 1.124 0v7.688h7.688a.562.562 0 0 1 .563.562Z'
		/>
	</svg>
)
export default SvgComponent
