import * as dotenv from 'dotenv'

dotenv.config()

import { Sequelize, DataTypes } from 'sequelize'

import userSchema from '../schemas/user/User.js'

import authSchema from '../schemas/user/auth/Auth.js'
import contentSchema from '../schemas/content/Content.js'

import redditSchema from '../schemas/user/auth/platforms/Reddit.js'
import googleSchema from '../schemas/user/auth/platforms/Google.js'
import pocketSchema from '../schemas/user/auth/platforms/Pocket.js'
import twitterSchema from '../schemas/user/auth/platforms/Twitter.js'

export const sequelize = new Sequelize(process.env.POSTGRESQL, {
	dialect: 'postgres',
})

export const User = userSchema(sequelize, DataTypes)

export const Auth = authSchema(sequelize, DataTypes)
export const Content = contentSchema(sequelize, DataTypes)

export const Reddit = redditSchema(sequelize, DataTypes)
export const Pocket = pocketSchema(sequelize, DataTypes)
export const Twitter = twitterSchema(sequelize, DataTypes)
export const Google = googleSchema(sequelize, DataTypes)

/**
 * Function to initialize the database
 */
const postgreConnect = async () => {
	try {
		await sequelize
			.authenticate()
			.then(() => console.log('Connected to DB!'))

		await sequelize
			.sync({ alter: true, force: true })
			.then(console.log('Sync complete!'))
	} catch (error) {
		throw error
	}
}

export default postgreConnect
