const router = require('express').Router();
const { Post } = require('../../models');

// CRUD operations for post routes

// create
router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({title: req.body.title, text: req.body.text, userId: req.session.userId})
        res.status(200).json(newPost)
    } catch(err) {
        res.status(500).json(err)
    }
});

// get-route already created for dashboard

// update by id
router.put('/:id', async (req, res) => {
    try{
        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.id,
            }
        });
        if (updatedPost.affectedRows === 0) {
            res.status(404).json(updatedPost);
        } else {
            res.status(200).json(updatedPost);
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

// delete
router.delete('/:id', async (req, res) => {
    try{
        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        if (deletedPost.affectedRows === 0) {
            res.status(404).json(deletedPost)
        } else {
            res.status(200).json(deletedPost)
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;