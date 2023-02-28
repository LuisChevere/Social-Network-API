const router = require('express').Router();
const {
    getThought, 
    getSingleThought, 
    createThought, 
    updateThought, 
    deleteThought, 
    createReaction, 
    deleteReaction} 
    = require('../../controllers/thoughtController');

    // /api/thoughts Get all and Post thought
    router.route('/').get(getThought).post(createThought);
    
    // /api/thoughts/:thoughtId Get one thought, Put and Delete by ID
    router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

    // /api/thoughts/:thoughtId/reactions Post new reactions
    router.route('/:thoughtId/reactions').post(createReaction);

    // /api/thoughts/:thoughtsId/reactions/:reactionId Delete reaction by ID
    router.route('/:thoughtId/reactions/reactionId').delete(deleteReaction)

    module.exports = router;