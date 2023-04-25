import { DataTypes, Sequelize } from 'sequelize'

/**
 * Content schema
 * 
 * @param {Sequelize} sequelize 
 * @param {DataTypes} DataTypes 
 */
const contentSchema = (sequelize, DataTypes) => {
    const Content = sequelize.define('content', {
        source: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        heading: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profile_id: {
            type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'users',
				key: 'profile_id',
			},
        }
    })

    return Content
}

export default contentSchema