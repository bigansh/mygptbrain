import { DataTypes, Sequelize } from 'sequelize'

/**
 * User schema
 *
 * @param {Sequelize} sequelize
 * @param {DataTypes} DataTypes
 */
const userSchema = (sequelize, DataTypes) => {
	const User = sequelize.define('user', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		profile_id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			unique: true
		},
	})

	return User
}

export default userSchema
