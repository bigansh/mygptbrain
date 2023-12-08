'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import ProductIllustration from '../assets/productIllustration.png'
import { ArrowRight, CheckCircleIcon } from '../icons'
import ProfileLexFridman from '../assets/personas/lex_fridman.png'
import ProfilePaulGraham from '../assets/personas/paul_graham.png'
import ProfileSamAltman from '../assets/personas/sam_altman.png'
import ProfileTaylorSwift from '../assets/personas/taylor_swift.png'
import ProfileTimUrban from '../assets/personas/tim_urban.png'
import InfiniteIcon from '../icons/Infinity.svg'
import FadersIcon from '../icons/Faders.svg'
import FilesIcon from '../icons/Files.svg'
import GoogleChromeIcon from '../icons/GoogleChrome.svg'
import RobotIcon from '../icons/Robot.svg'
import TranslateIcon from '../icons/Translate.svg'
import ProLabel from '../assets/proLabel.svg'
import FreeLabel from '../assets/freeLabel.svg'
import BgGrid from '../assets/grid.svg'
import './tailwind.css'
import { useRouter } from 'next/navigation'

function LandingPage() {
	const personas = [
		{
			name: 'paul graham',
			image: ProfilePaulGraham,
		},
		{
			name: 'lex fridman',
			image: ProfileLexFridman,
		},
		{
			name: 'taylor swift',
			image: ProfileTaylorSwift,
		},
		{
			name: 'sam altman',
			image: ProfileSamAltman,
		},
		{
			name: 'tim urban',
			image: ProfileTimUrban,
		},
	]

	const features = [
		{
			id: 1,
			title: 'multiple file type support',
			description:
				'you are not limited to uploading a particular document type. you can add links to articles & youtube videos. you can upload pdfs, office files, zip files, etc. we also support images.',
			icon: InfiniteIcon,
		},
		{
			id: 2,
			title: 'chatting with multiple documents',
			description:
				'by uploading multiple documents to the platform, the app allows you to simultaneously query multiple documents at once. all your queries are  analyzed and relevant documents are selected and displayed to in the sources tab.',
			icon: FilesIcon,
		},
		{
			id: 3,
			title: 'one click save with the extension',
			description:
				'we also have a chrome extension that you can use to instantly save links from blogs, rss feed, github readmes, youtube video, and more. just click on the extension and the link is automatically stored on the dashboard.',
			icon: GoogleChromeIcon,
		},
		{
			id: 4,
			title: 'using prompt instructions',
			description:
				'you can set upto 3 custom prompt instructions that you can use for your chat. using custom prompt instructions allow you to get answers in your desired form. you can also change the default prompt template for all the chats.',
			icon: RobotIcon,
		},
		{
			id: 5,
			title: 'stay in sync with platforms',
			description:
				'users can connect platforms like reddit, google drive, pocket, notion, etc., to stay in sync with all the documents and links present on those platforms. the app automatically syncs your documents once you connect them.',
			icon: FadersIcon,
		},
		{
			id: 6,
			title: 'multiple language models',
			description:
				'we provide you with an option to choose from an array of language models. ranging from model provided by openai like gpt3.5 & gpt4; as well as models by google, cohere, etc. we also support open source models like llama2, etc.',
			icon: TranslateIcon,
		},
	]

	const router = useRouter()
	useEffect(() => {
		if (localStorage.getItem('x-session-token')) {
			router.push('/app')
		}
	}, [])

	return (
		<main className='min-h-screen relative bg-white text-black w-screen overflow-x-hidden'>
			<div className='pt-28 relative z-20 space-y-[60px] px-4 w-screen'>
				{/* hero section */}
				<section className='flex flex-col gap-5 justify-center items-center'>
					<h1 className='text-2xl md:text-4xl'>myGPTBrain</h1>
					<p className='text-black/50 max-w-xl text-center'>
						gain comprehensive insights tailored to your inquiries
						from pdfs, office files, and various sources such as
						google drive, notion, and beyond.
					</p>

					<Link
						href={'/onboarding'}
						className='flex items-center bg-primary rounded-md p-2.5 gap-2.5'
					>
						let's get started
						<ArrowRight fill={'black'} />
					</Link>

					<img src={ProductIllustration.src} className='md:p-12' />
				</section>

				<hr className='border-primary/50 h-[2px] -mx-4' />

				{/* personas */}
				<section className='flex flex-col gap-5 justify-center items-center'>
					<h2 className='text-2xl md:text-4xl text-center'>
						personas
					</h2>

					<div className='max-w-[620px] flex flex-col-reverse md:flex-row gap-10'>
						<div className='space-y-5'>
							<p className='text-black/50'>
								chat with our special character personas. we
								have devised for you, a special place where you
								can chat with your favourite celebrities and
								personalities.
							</p>
							<p className='text-black/50'>
								all your queries will be answered based on the
								creations by specific personas. blogs, music
								lyrics, etc. answers will contain specific
								quotes directly from the source.
							</p>
							<Link
								href={'/personas'}
								className='inline-flex items-center bg-primary rounded-md p-2.5 gap-2.5'
							>
								explore personas
								<ArrowRight fill={'black'} />
							</Link>
						</div>

						{/* personas list */}
						<div className='w-full p-2.5 bg-primary/50 rounded-md space-y-2.5'>
							{personas.map((personas) => (
								<div
									key={personas.name}
									className='bg-[#DFE8FF] p-2.5 rounded-md shrink-0 flex items-center gap-2.5'
								>
									<img
										src={personas.image.src}
										alt={personas.name}
										width={32}
										height={32}
									/>
									<p>{personas.name}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<hr className='border-primary/50 h-[2px] -mx-4' />

				{/* features */}
				<section className='flex flex-col gap-5 items-center justify-center'>
					<h2 className='text-2xl md:text-4xl text-center'>
						features
					</h2>

					<div className='max-w-[946px] grid md:grid-cols-2 gap-2.5'>
						{features.map((feature) => (
							<div
								key={feature.id}
								className='p-2.5 bg-primary/50 flex flex-col rounded-md space-y-2.5'
							>
								<div className='flex items-center gap-2.5 md:text-xl shrink-0'>
									<img src={feature.icon.src} />
									<h2>{feature.title}</h2>
								</div>
								<p className='bg-primary p-2.5 rounded-md h-full'>
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</section>

				<hr className='border-primary/50 h-[2px] -mx-4' />

				{/* pricing */}
				<section className='flex pb-[60px] flex-col gap-5 items-center justify-center'>
					<h2 className='text-2xl md:text-4xl text-center'>
						pricing
					</h2>

					<div className='gap-2.5 flex flex-col md:flex-row rounded-md w-full md:w-auto'>
						{/* pro */}
						<div className='bg-primary/50 p-2.5 rounded-md'>
							<div className='p-2.5 bg-primary/50 space-y-2.5 rounded-md'>
								<div className='items-center text-xl flex gap-2.5'>
									<h2>myGPTBrain</h2>
									<img src={ProLabel.src} className='mt-1' />
								</div>

								{/* benefits */}
								<div className='space-y-2.5'>
									<div className='flex items-center gap-2.5 p-2.5 bg-primary rounded-md'>
										<CheckCircleIcon fill={'black'} />
										unlimited chats
									</div>
									<div className='flex items-center gap-2.5 p-2.5 bg-primary rounded-md'>
										<CheckCircleIcon fill={'black'} />
										unlimited documents
									</div>
									<div className='flex items-center gap-2.5 p-2.5 bg-primary rounded-md'>
										<CheckCircleIcon fill={'black'} />
										platform support
									</div>
									<div className='flex items-center gap-2.5 p-2.5 bg-primary rounded-md'>
										<CheckCircleIcon fill={'black'} />
										prompt templates
									</div>
									<div className='flex items-center gap-2.5 p-2.5 bg-primary rounded-md'>
										<CheckCircleIcon fill={'black'} />
										multiple llms
									</div>
								</div>
							</div>
						</div>

						{/* free */}
						<div className='bg-primary/50 p-2.5 rounded-md'>
							<div className='p-2.5 space-y-2.5 rounded-md'>
								<div className='items-center text-xl flex gap-2.5'>
									<h2>myGPTBrain</h2>
									<img src={FreeLabel.src} className='mt-1' />
								</div>

								{/* benefits */}
								<div className='space-y-2.5'>
									<div className='flex items-center gap-2.5 p-2.5 bg-primary rounded-md'>
										<CheckCircleIcon fill={'black'} />2
										chats & documnts
									</div>
									<div className='flex items-center gap-2.5 p-2.5 bg-primary rounded-md'>
										<CheckCircleIcon fill={'black'} />
										chrome extension
									</div>
									<div className='flex items-center gap-2.5 p-2.5 bg-primary rounded-md'>
										<CheckCircleIcon fill={'black'} />
										multiple file types
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* footer */}
				<footer className='space-y-10 lg:space-y-0 lg:grid grid-cols-4 bg-primary p-8 -mx-4'>
					<a
						href='https://www.producthunt.com/posts/mygptbrain?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-mygptbrain'
						target='_blank'
					>
						<img
							src='https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=412183&theme=light&period=daily'
							alt='myGPTBrain - QnA&#0032;over&#0032;your&#0032;personal&#0032;data&#0032;&#0038;&#0032;bookmarks | Product Hunt'
							width='250'
							height='54'
						/>
					</a>

					<div className='space-y-2.5'>
						<p>about</p>
						<div className='flex text-black/50 text-sm flex-col gap-2.5'>
							<Link
								href={
									'https://public.mygptbrain.com/user-guide'
								}
							>
								user guide
							</Link>
							<Link
								href={
									'https://public.mygptbrain.com/privacy-policy'
								}
							>
								privacy policy
							</Link>
							<Link
								href={
									'https://public.mygptbrain.com/terms-of-service'
								}
							>
								terms and conditions
							</Link>
						</div>
					</div>

					<div className='space-y-2.5'>
						<p>social media</p>
						<div className='flex text-black/50 text-sm flex-col gap-2.5'>
							<Link href={'https://twitter.com/mygptbrain'}>
								twitter
							</Link>
							<Link href={'https://instagram.com/mygptbrain'}>
								instagram
							</Link>
							<Link
								href={
									'https://www.producthunt.com/products/mygptbrain'
								}
							>
								product hunt
							</Link>
						</div>
					</div>

					<div className='space-y-2.5'>
						<p>contact us</p>
						<div className='flex text-black/50 text-sm flex-col gap-2.5'>
							<Link href={'https://twitter.com/mygptbrain'}>
								twitter
							</Link>
							<Link href={'mailto:support@mygptbrain.com'}>
								email id
							</Link>
						</div>
					</div>
				</footer>
			</div>

			<div className='w-screen overflow-x-hidden z-10 absolute top-0 left-0'>
				<img
					src={BgGrid.src}
					className=' min-w-[1000px] mx-auto h-full'
				/>
			</div>
		</main>
	)
}

export default LandingPage
