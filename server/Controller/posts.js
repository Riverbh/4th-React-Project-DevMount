require('dotenv').config()


module.exports = {
    getAllPost: (req, res) => {
        console.log('Get all Post')
    },

    getCurrentUserPosts: (req, res) => {
        console.log('Get Current User Post')
    },

    addPost: (req, res) => {
        console.log('Add Post')
    },

    editPost: (req, res) => {
        console.log('Edit Post')
    },

    deletePost: (req, res) => {
        console.log('Delete Post')
    }
}

