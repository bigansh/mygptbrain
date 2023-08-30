// import {  } from '@chakra-ui/next-js'
import { Container, Flex, List, ListItem, Text } from '@chakra-ui/react'
import { ProductHuntBanner } from '@/assets'
import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
	return (
		<Flex
			backgroundColor='#DFE8FF80'
			paddingY='16'
			paddingX='24'
			justifyContent='space-between'
			gap='24'
			flexDirection={['column', 'row']}
			alignItems={['center', 'start']}
		>
			<div>
				<a
					href='https://www.producthunt.com/posts/mygptbrain?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-mygptbrain'
					target='_blank'
				>
					<img
						src='https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=412183&theme=neutral'
						alt='myGPTBrain - QnA&#0032;over&#0032;your&#0032;personal&#0032;data&#0032;&#0038;&#0032;bookmarks | Product Hunt'
						style={{ width: '250px', height: '54px' }}
						width='250'
						height='54'
					/>
				</a>
			</div>
			<Flex gap={['8', '24']} color='black'>
				<Container width='unset'>
					<Text paddingBottom='1'>about</Text>
					<List>
						<ListItem fontSize='sm'>
							<Link href='https://public.mygptbrain.com/privacy-policy'>
								privacy policy
							</Link>
						</ListItem>
						<ListItem fontSize='sm'>
							<Link href='https://publuc.mygptbrain.com/terms-of-service'>
								terms and conditions
							</Link>
						</ListItem>
					</List>
				</Container>
				<Container width='unset'>
					<Text paddingBottom='1'>social media</Text>
					<List>
						<ListItem fontSize='sm'>
							<Link href='https://twitter.com/myGPTBrain'>
								twitter
							</Link>
						</ListItem>
						<ListItem fontSize='sm'>
							<Link href='https://producthunt.com/mygptbrain'>
								product hunt
							</Link>
						</ListItem>
					</List>
				</Container>
				<Container width='unset'>
					<Text paddingBottom='1'>contact us</Text>
					<List>
						<ListItem fontSize='sm'>
							<Link href='https://twitter.com/myGPTBrain'>
								twitter
							</Link>
						</ListItem>
						<ListItem fontSize='sm'>
							<Link href='mailto:support@mygptbrain.com'>
								email id
							</Link>
						</ListItem>
					</List>
				</Container>
			</Flex>
		</Flex>
	)
}
