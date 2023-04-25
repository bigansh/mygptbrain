import { DataTypes, Sequelize } from 'sequelize'

import { Google, Pocket, Reddit, Twitter } from '../../../connections/postgreConnect.js'


/**
 * Auth schema
 *
 * @param {Sequelize} sequelize
 * @param {DataTypes} DataTypes
 */
const authSchema = (sequelize, DataTypes) => {
	const Auth = sequelize.define('auth', {
		reddit_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		twitter_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		pocket_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		google_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		password_salt: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		profile_id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'users',
				key: 'profile_id',
			},
		},
	})

	Reddit.belongsTo(Auth)
	Pocket.belongsTo(Auth)
	Twitter.belongsTo(Auth)
	Google.belongsTo(Auth)

	Auth.hasOne(Reddit, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
	Auth.hasOne(Pocket, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
	Auth.hasOne(Twitter, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
	Auth.hasOne(Google, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })

	return Auth
}

export default authSchema
