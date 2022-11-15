const router = require('express').Router();
const { Comment, Post, User } = require('../models');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const postResponse = await Post.findAll({
      include: [User],
    });

    const posts = postResponse.map((post) => post.get({ plain: true }));
    console.log({posts, loggedIn: req.session.loggedIn})
    res.render('all', {posts, loggedIn: req.session.loggedIn});
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one post
router.get('/post/:id', async (req, res) => {
  try {
    const postResponse = await Post.findByPk(req.params.id, {
      include: [User, {
        model: Comment, 
        include: [User]
      }],
    });
    const post = postResponse.get({ plain: true });
    res.render('post', {post, loggedIn: req.session.loggedIn});
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// Signup route
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup')
})

module.exports = router;
