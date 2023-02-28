 const router = require('express').Router();

 const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// /api/users Get all and Post
router.route('/').get(getUser).post(createUser);

// /api/users/:userId Get one use, Put and delete by user ID
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId Post and Delete a friend by ID
router.route('/:userId/friends/:friendId').get(addFriend).delete(deleteFriend);

module.exports = router;