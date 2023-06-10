import * as React from 'react'
const SvgComponent = (props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={24}
		height={24}
		fill='none'
		{...props}
	>
		<path
			fill='#fff'
			d='M20.25 3.938h-4.5a.562.562 0 1 0 0 1.124h1.688V17.31L10.242 4.23a.562.562 0 0 0-.493-.293h-6a.563.563 0 1 0 0 1.126h1.688v13.875H3.75a.563.563 0 0 0 0 1.125h4.5a.563.563 0 0 0 0-1.125H6.562V6.69l7.195 13.08a.562.562 0 0 0 .493.293H18a.562.562 0 0 0 .563-.563V5.062h1.687a.562.562 0 1 0 0-1.125ZM6.952 5.062h2.465l7.631 13.875h-2.465L6.952 5.063Z'
		/>
	</svg>
)
export default SvgComponent
