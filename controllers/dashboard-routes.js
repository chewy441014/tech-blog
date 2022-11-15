const router = require('express').Router();
const { Comment, Post, User } = require('../models');

// shows all posts by the user
router.get('/', async (req, res) => {
    try {
        const myPosts = await Post.findAll({
            where: {
                userId: req.session.userId
            }
        });
        const posts = myPosts.map((post) => post.get({plain: true}));
        res.render('dashboard', {posts, loggedIn: req.session.loggedIn});
    } catch(err) {
        res.redirect('login');
    }
});

// allows the user to create a new post
router.get('/new-post', (req, res) => {
    try {
        res.render('new-post', {loggedIn: req.session.loggedIn});
    } catch(err) {
        res.status(500).json(err);
    }
});

// allows the user to edit a post
router.get('/edit-post/:id', async (req, res) => {
    try {
        const postResponse = await Post.findByPk(req.params.id);
        const post = postResponse.get({plain: true});
        res.render('edit-post', {post, loggedIn: req.session.loggedIn});
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router;