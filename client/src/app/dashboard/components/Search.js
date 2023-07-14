import { useColors } from '@/utils/colors'
import {
	InputGroup,
	Input,
	InputRightElement,
	Button,
	useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import { GoSearch } from 'react-icons/go'

const Search = ({ title, searchTerm, setSearchTerm }) => {
	const { base, base800, base700, text } = useColors()
	return (
		<InputGroup size='md' background={base700}>
			<Input
				pr='4.5rem'
				type='text'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder={title}
			/>
			<InputRightElement width='4.5rem'>
				<Button h='1.75rem' size='sm' bg={'transparent'}>
					<GoSearch fontSize={24} />
				</Button>
			</InputRightElement>
		</InputGroup>
		//   <div className="flex items-start p-4 bg-[#DFE8FF80] rounded-lg justify-between">
		//     <input

		//       className="border-0 py-0 text-xl bg-opacity-50 w-4/5 bg-transparent focus:shadow-none focus-within:shadow-none"
		//     />

		//   </div>
	)
}

export default Search
