

const { User } = require('../models/user')
const { Post } = require('../models/post')

module.exports = {
    getAllPost: async (req, res) => {
        try {
            const post = await Post.findAll({
                where: {privateStatus: false},
                include: [{
                    model: User,
                    required: true,
                    attribute: ['username']
                }]
             })
              res.status(200).send(post)
        } catch (err) {
            console.log("ERROR IN getAllPost")
            console.log(err)
            res.sendStatus(400)
        }
    },

    getCurrentUserPosts: async (req, res) => {
        try {
            const { userId } = req.params
            const post = await Post.findAll({
                where: {userId: userId},
                include: [{
                    modelL: User,
                    required: true,
                    attribute: ['username']
                }]
            })
        } catch (err) {
            console.log("ERROR IN getCurrentUserPosts")
            console.log(err)
            res.sendStatus(400)
        }
    },

    addPost: async (req, res) => {
        try {
            const {title, content, status, userId} = req.body
            await Post.create({title, content, privateStatus: status, userId})
            res.sendStatus(200)
        } catch (err) {
            console.log('ERROR IN getCurrentUserPosts')
            console.log(err)
            res.sendStatus(400)
        }
    },

    editPost: async (req, res) => {
        try {
            const {id} = req.params
            const {status} = req.body
            await Post.update({privateStatus: status}), {
                where: {id: +id}
            }
            res.sendStatus(200)
        } catch (err) {
            console.log("ERROR IN editPost")
            console.log(err)
            res.sendStatus(400)
        }
    },

    deletePost: async (req, res) => {
        try {
            const {id} = req.params
            await Post.destroy({where: {id: +id}})
            res.sendStatus(200)
        } catch (err) {
            console.log("ERROR IN deletePost")
            console.log(err)
            res.sendStatus(400)
        }
    }
}

