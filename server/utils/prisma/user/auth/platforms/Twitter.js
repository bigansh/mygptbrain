import { DataTypes, Sequelize } from 'sequelize'

/**
 * Twitter schema
 *
 * @param {Sequelize} sequelize
 * @param {DataTypes} DataTypes
 */
const twitterSchema = (sequelize, DataTypes) => {
	const Twitter = sequelize.define('twitter', {
        refresh_token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        auth_token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        twitter_id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'auths',
				key: 'twitter_id',
			},
		},
    })

	return Twitter
}

export default twitterSchema
