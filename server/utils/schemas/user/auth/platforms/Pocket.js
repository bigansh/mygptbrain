import { DataTypes, Sequelize } from 'sequelize'

/**
 * Pocket schema
 *
 * @param {Sequelize} sequelize
 * @param {DataTypes} DataTypes
 */
const pocketSchema = (sequelize, DataTypes) => {
	const Pocket = sequelize.define('pocket', {
		access_token: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		pocket_id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'auths',
				key: 'pocket_id',
			},
		},
	})

	return Pocket
}

export default pocketSchema
