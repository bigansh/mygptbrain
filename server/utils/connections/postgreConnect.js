import * as dotenv from 'dotenv'

dotenv.config()

import { Sequelize, DataTypes } from 'sequelize'

import userSchema from '../schemas/user/User.js'

export const sequelize = new Sequelize(process.env.POSTGRESQL, {
	dialect: 'postgres',
})

export const User = userSchema(sequelize, DataTypes)

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
