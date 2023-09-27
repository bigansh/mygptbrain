import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_ID)

export default stripe
