import { DataTypes, Sequelize } from 'sequelize'

/**
 * Google schema
 *
 * @param {Sequelize} sequelize
 * @param {DataTypes} DataTypes
 */
const googleSchema = (sequelize, DataTypes) => {
	const Google = sequelize.define('google', {
        access_token: {
            type: DataTypes.STRING,
            allowNull: false
        },
		refresh_token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        google_id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'auths',
				key: 'google_id',
			},
		},
    })

	return Google
}

export default googleSchema
