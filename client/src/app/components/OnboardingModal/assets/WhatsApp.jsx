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
			d='m17.501 13.747-3-1.5a.563.563 0 0 0-.562.035l-1.47.98a3.984 3.984 0 0 1-1.73-1.73l.98-1.47a.563.563 0 0 0 .035-.562l-1.5-3a.562.562 0 0 0-.504-.313A3.562 3.562 0 0 0 6.188 9.75a8.072 8.072 0 0 0 8.062 8.063 3.562 3.562 0 0 0 3.563-3.563.563.563 0 0 0-.312-.503Zm-3.25 2.94A6.946 6.946 0 0 1 7.312 9.75a2.438 2.438 0 0 1 2.101-2.414l1.187 2.374-.974 1.46a.562.562 0 0 0-.05.528 5.103 5.103 0 0 0 2.725 2.725.563.563 0 0 0 .528-.05l1.46-.974 2.374 1.187a2.437 2.437 0 0 1-2.414 2.101ZM12 2.438a9.563 9.563 0 0 0-8.406 14.128l-1.089 3.269a1.313 1.313 0 0 0 1.66 1.66l3.27-1.09A9.563 9.563 0 1 0 12 2.439Zm0 18c-1.484 0-2.941-.39-4.225-1.132a.57.57 0 0 0-.46-.047l-3.505 1.168a.188.188 0 0 1-.237-.237l1.168-3.502a.562.562 0 0 0-.047-.46A8.437 8.437 0 1 1 12 20.437Z'
		/>
	</svg>
)
export default SvgComponent