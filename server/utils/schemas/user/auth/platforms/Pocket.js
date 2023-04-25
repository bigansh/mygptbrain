import { DataTypes, Sequelize } from 'sequelize'

/**
 * Pocket schema
 *
 * @param {Sequelize} sequelize
 * @param {DataTypes} DataTypes
 */
const pocketSchema = (sequelize, DataTypes) => {
	const Pocket = sequelize.define('pocket', {
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

	return Pocket
}

export default pocketSchema
