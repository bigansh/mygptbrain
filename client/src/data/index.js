export const llmButtons = [
	{
		title: 'chatgpt',
		llmTypeValue: 'ChatGPT',
		iconSrc: '/gpt.png',
		isPro: false,
	},
	{
		title: 'palm2',
		llmTypeValue: 'PaLM',
		iconSrc: '/palm.png',
		isPro: false,
	},
	{
		title: 'chatgpt4',
		llmTypeValue: 'GPT4',
		iconSrc: '/gpt.png',
		isPro: true,
	},
	{
		title: 'cohere',
		llmTypeValue: 'Cohere',
		iconSrc: '/cohere.png',
		isPro: true,
	},
	// {
	// 	title: 'claude',
	// 	llmTypeValue: 'claude',
	// 	iconSrc: '/claude.png',
	// 	isPro: true,
	// },
]

export const filterButtons = [
	{
		title: 'Notion',
		value: 'notion',
	},
	{
		title: 'Drive',
		value: 'drive',
	},
	{
		title: 'Reddit',
		value: 'reddit',
	},
	{
		title: 'Uploads',
		value: 'uploads',
	},
	{
		title: 'All',
		value: 'All',
	},
]

export const sendTypeButtons = [
	{
		title: 'Stuff',
	},
	{
		title: 'Map Reduce',
	},
	{
		title: 'Refine',
	},
]

export const personalDirectory = [
	{
		key: 1,
		name: 'Paul Graham',
		image: '/paul.png',
		placeholder: {
			user: 'hey paul, can you teach me something?',
			llm: 'hey buddy, sure! what do you wanna learn about? i will quote some of my blogs to help you learn better.',
		},
	},
	{
		key: 2,
		name: 'Taylor Swift',
		image: '/taylor.png',
		placeholder: {
			user: 'hey taylor, can you answer something for me?',
			llm: 'sure, babe! what would you like to know? i will take references from my songs and then help you answer your question. ',
		},
	},
	{
		key: 3,
		name: 'Wait But Why',
		image: '/wbw.png',
		placeholder: {
			user: 'hey tim, can you tell me something?',
			llm: 'sure, what would you like to know? i will add some cues from my blog & answer your query better.',
		},
	},
	{
		key: 4,
		name: 'Lex Fridman',
		image: '/lex.png',
		placeholder: {
			user: 'hey, tell me something...',
			llm: 'what should we discuss? i will try to reference my conversation in various podcasts so we can make this interesting.',
		},
	},
]

export const placeholderData = {
	chat_array: [
		{
			llm: `hey there! i'm here to make your life easier. i can provide you with summaries, bullet points, definitions, whatever, based on the data you give me. think of me as your personal chatgpt assistant, ready to answer all your questions within your context. ask me anything you want!

To make sure i give you accurate results, please keep in mind that my knowledge is limited to what you provide. unfortunately, i can't access the internet, but you can enhance my capabilities by connecting additional platforms using this link. you can also fine-tune my performance by filtering the documents i should refer to in the settings menu on the right.

feel free to customize your experience by changing the thread's name, the model i use to answer, and a few other settings. let's get started and make the most out of our conversation!`,
			user: 'hey mygptbrain, what all can you do?',
		},
	],
}
