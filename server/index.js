require('dotenv').config();
const express = require('express');
const cors = require('cors');

const {PORT} = process.env ;
const {getAllPost, getCurrentUserPosts, addPost, editPost, deletePost} = require('./Controller/posts')
const {register, login} = require('./Controller/auth')
const {isAuthenticated} = require('./Middleware/isAuthenticated')
const {sequelize} = require('./util/database')
const {User} = require('./models/user')
const {Post} = require('./models/post')

const app = express();

User.hasMany(Post)
Post.belongsTo(User)

// Enable CORS middleware & express.json
app.use(express.json())
app.use(cors());

//Auth 
app.post('/register', register)
app.post('/login', login)

//GET POSTs - no auth
app.get('/posts', getAllPost)

//CRUD POSTS - auth required 
app.get('/userposts/:userId', getCurrentUserPosts)
app.post('/posts', isAuthenticated, addPost)
app.put('/posts/:id', isAuthenticated, editPost)
app.delete('/posts/:id', isAuthenticated, deletePost)

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

sequelize.sync()
.then(() => {
    application.listen(PORT, () => console.log(`db sync successful & server running on port ${PORT}`))
})
.catch(err => console.log(err))