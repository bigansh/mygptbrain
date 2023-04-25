import { DataTypes, Sequelize } from 'sequelize'

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
			unique: true
		},
		twitter_id: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: true
		},
		pocket_id: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: true
		},
		google_id: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: true
		},
		password_salt: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: true
		},
		profile_id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			unique: true,
			references: {
				model: 'users',
				key: 'profile_id',
			},
		},
	})

	return Auth
}

export default authSchema
