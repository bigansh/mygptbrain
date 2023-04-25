import { DataTypes, Sequelize } from 'sequelize'

/**
 * Reddit schema
 *
 * @param {Sequelize} sequelize
 * @param {DataTypes} DataTypes
 */
const redditSchema = (sequelize, DataTypes) => {
	const Reddit = sequelize.define('reddit', {
        refresh_token: {
            type: DataTypes.STRING,
            allowNull: false
        },
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

	return Reddit
}

export default redditSchema
