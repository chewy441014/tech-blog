const router = require('express').Router();
const { Comment } = require('../../models');

// CRUD operations for comment routes

// create 
router.post('/', async (req, res) => {
    try{
        const comment = await Comment.create({text: req.body.text, userId: req.session.userId, postId: req.body.postId});
        res.status(200).json(comment);
    } catch(err) {
        res.status(500).json(err);
    }
});

// get 
router.get('/', async (req, res) => {
    try{
        const comments = await Comment.findAll({
            where: {
                userId: req.session.userId
            }
        });
        res.status(200).json(comments);
    } catch(err) {
        res.status(500).json(err)
    }
});

// update
router.put('/:id', async (req, res) => {
    try{
        const updatedComment = await Comment.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        if (!updatedComment[0]) {
            res.status(404).json({message: `no comment found with id ${req.params.id}`});
        } else {
            res.status(200).json(updatedComment);
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

// delete
router.delete('/:id', async (req, res) => {
    try{
        const deletedComment = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        if (deletedComment.affectedRows === 0) {
            res.status(404).json({message: `no comment found with id ${req.params.id}`});
        } else {
            res.status(200).json(deletedComment);
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;