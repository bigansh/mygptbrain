import { Container, Flex, List, ListItem, Text } from '@chakra-ui/react'

export function Footer() {
	return (
		<Flex
			backgroundColor='#DFE8FF80'
			paddingY='16'
			paddingX='24'
			justifyContent='space-between'
		>
			<Container
				backgroundColor='white'
				borderRadius='lg'
				borderWidth='thin'
				borderColor='orange'
				width='fit-content'
				alignSelf='start'
				justifySelf='start'
				paddingY='2'
				paddingX='4'
			>
				<div></div>
				<Container fontWeight='bold' color='orange'>
					<Text>#1 Product of the Day</Text>
					<Text fontSize='x-small'>May 08, 2022</Text>
				</Container>
			</Container>
			<Flex gap='24' color='black'>
				<Container>
					<Text paddingBottom='1'>about</Text>
					<List>
						<ListItem fontSize='sm'>privacy policy</ListItem>
						<ListItem fontSize='sm'>terms and conditions</ListItem>
					</List>
				</Container>
				<Container>
					<Text paddingBottom='1'>social media</Text>
					<List>
						<ListItem fontSize='sm'>twitter</ListItem>
						<ListItem fontSize='sm'>product hunt</ListItem>
					</List>
				</Container>
				<Container>
					<Text paddingBottom='1'>contact us</Text>
					<List>
						<ListItem fontSize='sm'>twitter</ListItem>
						<ListItem fontSize='sm'>email id</ListItem>
					</List>
				</Container>
			</Flex>
		</Flex>
	)
}
