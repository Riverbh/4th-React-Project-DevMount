require('dotenv').config()

const {CONNECTION_STRING} = process.env
const Sequalize = require('sequelize')

const sequelize = new Sequalize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    sequelize
}