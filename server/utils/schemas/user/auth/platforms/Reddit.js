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
        access_token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reddit_id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'auths',
				key: 'reddit_id',
			},
		},
    })

	return Reddit
}

export default redditSchema
