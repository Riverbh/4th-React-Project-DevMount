const { DataTypes } = require('sequelize')
const {sequelize} = require('../util/database')

module.exports = {
    Post: sequelize.define('post', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        privateStatus: DataTypes.BOOLEAN,
    })
}