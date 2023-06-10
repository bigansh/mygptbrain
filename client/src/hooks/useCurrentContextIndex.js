import { useSelector } from 'react-redux'

const useCurrentContextIndex = () => {
	const currentChatContext = useSelector(
		(state) => state.chat.currentChatContext
	)

	const chatContexts = useSelector((state) => state.chat.chatContexts)

	const currentContextIndex = chatContexts.findIndex(
		(ctx) => ctx.id === currentChatContext
	)

	return currentContextIndex
}

export default useCurrentContextIndex
