const router = require('express').Router();
const {
    getThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtController');

const {
    createReaction,
    removeReaction,
} = require('../../controllers/reactionController');

router.route('/').get(getThoughts).post(createThought);

router
    .route('/:userId/thoughtId')
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:userId/thoughts/:thoughtId/reactions').post(createReaction);

router.route('/:userId/thoughts/:thoughtId/reactions/:reactionId').delete(removeReaction)

module.exports = router;