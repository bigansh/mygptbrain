import * as React from 'react'
const SvgComponent = (props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		stroke='currentColor'
		strokeWidth={0.2}
		className='w-8 h-8 p-1'
		viewBox='0 0 20 19'
		{...props}
	>
		<path
			d='M18.25 4.6875H15.0625V1.5C15.0625 1.1519 14.9242 0.818064 14.6781 0.571922C14.4319 0.325781 14.0981 0.1875 13.75 0.1875H1.75C1.4019 0.1875 1.06806 0.325781 0.821922 0.571922C0.575781 0.818064 0.4375 1.1519 0.4375 1.5V13.5C0.437623 13.6062 0.467799 13.7102 0.524538 13.7999C0.581276 13.8897 0.66226 13.9615 0.758125 14.0072C0.833477 14.0438 0.916212 14.0627 1 14.0625C1.1286 14.0626 1.25334 14.0186 1.35344 13.9378L4.91031 11.0625H4.9375V14.25C4.9375 14.5981 5.07578 14.9319 5.32192 15.1781C5.56806 15.4242 5.9019 15.5625 6.25 15.5625H15.0897L18.6466 18.4378C18.7467 18.5186 18.8714 18.5626 19 18.5625C19.0838 18.5627 19.1665 18.5438 19.2419 18.5072C19.3377 18.4615 19.4187 18.3897 19.4755 18.2999C19.5322 18.2102 19.5624 18.1062 19.5625 18V6C19.5625 5.6519 19.4242 5.31806 19.1781 5.07192C18.9319 4.82578 18.5981 4.6875 18.25 4.6875ZM4.71063 9.9375C4.58202 9.93744 4.45728 9.98145 4.35719 10.0622L1.5625 12.3216V1.5C1.5625 1.45027 1.58225 1.40258 1.61742 1.36742C1.65258 1.33225 1.70027 1.3125 1.75 1.3125H13.75C13.7997 1.3125 13.8474 1.33225 13.8826 1.36742C13.9177 1.40258 13.9375 1.45027 13.9375 1.5V9.75C13.9375 9.79973 13.9177 9.84742 13.8826 9.88258C13.8474 9.91775 13.7997 9.9375 13.75 9.9375H4.71063ZM18.4375 16.8216L15.6428 14.5622C15.5427 14.4814 15.418 14.4374 15.2894 14.4375H6.25C6.20027 14.4375 6.15258 14.4177 6.11742 14.3826C6.08225 14.3474 6.0625 14.2997 6.0625 14.25V11.0625H13.75C14.0981 11.0625 14.4319 10.9242 14.6781 10.6781C14.9242 10.4319 15.0625 10.0981 15.0625 9.75V5.8125H18.25C18.2997 5.8125 18.3474 5.83225 18.3826 5.86742C18.4177 5.90258 18.4375 5.95027 18.4375 6V16.8216Z'
			fill='black'
		/>
	</svg>
)
export default SvgComponent