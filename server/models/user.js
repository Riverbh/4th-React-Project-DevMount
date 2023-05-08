require('dotenv').config()

const { DataTypes } = require('sequelize');
const {sequelize} = require('../util/database')

module.exports = {  
    User: sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username: DataTypes.STRING,
        hashedPass: DataTypes.STRING,
    })
}   