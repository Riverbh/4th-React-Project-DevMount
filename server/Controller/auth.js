require('dotenv').config()

const {SECERT} = process.env
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../models/user')

const createToken = (username, id) => {
      // Define the payload object for the JWT
    const payload = {
        username,
        id
    };

    // Define the options object for the JWT
    const options = {
        expiresIn: '2 days'
    }

     // Sign the JWT using the payload, the secret key, and the options
    const token = jwt.sign(payload, SECRET, options);

     // Return the signed JWT
    return token;
}

module.exports = {
    register: async (req, res) => {
        try {
            const {username, password} = req.body
            const foundUser = await User.findOne({where: {username: username}})
            if (foundUser) {
                res.status(400).send('cannot create user')
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password, salt)
                const newUser = await User.create({username: username, hashedPass: hash})
                const token = createToken(newUser.dataValues.username, newUser.dataValues.id)
                console.log('New User:', newUser)
                const exp = Date.now() + 1000 * 60 * 60 * 48
                res.status(200).send({
                    username: newUser.dataValues.username,
                    userId: newUser.dataValues.id,
                    token,
                    exp
                })
            }
        } catch (err) {
            console.log("Error In register")
            console.log(err)
            res.sendStatus(400)
        }
    },

    login: async (req, res) => {
        try {   
            const {username, password} = req.body
            const foundUser = await User.findOne({where: {username}})
            if(foundUser) {
                const isAuthenticated = bcrypt.compareSync(password, foundUser.hashedPass)

                if (isAuthenticated) {
                    const token = createToken(foundUser.dataValues.username, foundUser.dataValues.id)
                    const exp = Date.now() + 1000 * 60 * 60 * 48
                    res.status(200).send({
                        username: foundUser.dataValues.username,
                        userId: foundUser.dataValues.id,
                        token,
                        exp
                    })
                } else {
                    res.status(400).send("cannot log in")
                }
            } else {
                res.status(400).send("cannot log in")
            }
        }catch (err) {
            console.log("Error In register")
            console.log(err)
            res.sendStatus(400)
        }
    }
}