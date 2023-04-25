import { DataTypes, Sequelize } from 'sequelize'

import { Auth, Content } from '../../connections/postgreConnect.js'

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
		},
		profile_id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
		},
	})

	Auth.belongsTo(User)
	Content.belongsTo(User)

	User.hasOne(Auth, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
	User.hasMany(Content, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })

	return User
}

export default userSchema
