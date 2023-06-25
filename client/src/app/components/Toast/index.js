// Hey, I am toast component
const Toast = (props) => {
	return (
		<div className='toast-message-container'>
			<div className='side-bar'></div>
			<div id='toast-message' className='toast-message'>
				{/* Message to be added here */}
				{props.message}
			</div>
			{/* Static Styling */}
			<style jsx>{`
				.toast-message {
					flex: 1;
					background-color: #fff;
					padding: 15px 10px;
					border-radius: 4px;
					font-family: 'Open Sans', sans-serif;
				}
				.side-bar {
					padding: 10px;
					border-radius: 4px;
				}
			`}</style>
			{/* Dynamic Styling */}
			<style jsx>{`
				@keyframes SlideInOut {
					0% {
						transform: translateY(0);
						opacity: 0;
					}
					${props.transitionPercentage}% {
						transform: translateY(-40px);
						opacity: 1;
					}
					${100 - props.transitionPercentage}% {
						transform: translateY(-40px);
						opacity: 1;
					}
					100% {
						transform: translateY(0px);
						opacity: 0;
					}
				}
				.toast-message-container {
					color: ${props.color || 'grey'};
					max-width: 400px;
					background: ${props.color || 'grey'};
					box-shadow: 0px 0px 30px #0000001f;
					margin: 0px auto;
					border-radius: 4px;
					display: flex;
					animation: SlideInOut ${props.duration}s ease-in-out;
				}
			`}</style>
		</div>
	)
}
