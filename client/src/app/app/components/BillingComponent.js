import { getUser } from '@/api'
import { Flex, Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const BillingComponent = () => {
	const { data } = useQuery({
		queryKey: ['user'],
		queryFn: getUser,
	})
	return (
		<Flex height={'100%'} flexDir={'column'} alignItems={'flex-start'}>
			<Text
				paddingBlock={6}
				pb={0}
				paddingInline={4}
				fontSize={'xl'}
				fontWeight={'400'}
			>
				subscriptions
			</Text>
			<Text
				paddingBlock={6}
				pt={0}
				paddingInline={4}
				fontSize={'md'}
				fontWeight={'400'}
			>
				please use the email that you use this account with
			</Text>

			<>
				<script
					async
					src='https://js.stripe.com/v3/pricing-table.js'
				></script>
				<stripe-pricing-table
					pricing-table-id={process.env.NEXT_PUBLIC_STRIPE_TABLE_ID}
					publishable-key={process.env.NEXT_PUBLIC_PUBLISHABLE_KEY}
					customer-email={data.email}
				></stripe-pricing-table>
			</>
		</Flex>
	)
}

export default BillingComponent
