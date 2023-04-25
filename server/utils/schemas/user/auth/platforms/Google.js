import { DataTypes, Sequelize } from 'sequelize'

/**
 * Google schema
 *
 * @param {Sequelize} sequelize
 * @param {DataTypes} DataTypes
 */
const googleSchema = (sequelize, DataTypes) => {
	const Google = sequelize.define('google', {
        auth_token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profile_id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'auths',
				key: 'profile_id',
			},
		},
    })

	return Google
}

export default googleSchema
