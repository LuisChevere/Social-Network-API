const { User, Thought } = require("../models");

module.exports = {
    //Gets all users
    getUser(req, res) {
        User.find({})
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    //Get single user
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})
        .populate("thoughts")
        .populate("friends")
        .select("-__v")
        .then((user) =>
        !user
        ? res.status(404).json({message: "No user found with ID!"})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    //creates user
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    //updates user
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            { runValidators: true, new: true}
        )
        .then((user) => 
        !user
        ? res.status(404).json({message: "No user found with ID!"})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    //delete user
    //Bonus: remove users thoughts when deleted
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId})
        .then((user) =>
        !user
        ? res.status(404).json({message: "No user found with ID!"})
        : Thought.deleteMany({_id: {$in: user.Thoughts}})
        )
        .then(() => res.json({message: "User and Thought deleted!"}))
        .catch((err) => res.status(500).json(err));
    },
    //add a friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
            {runValidators: true, new: true}
        )
        .then((user) =>
        !user
        ? res.status(404).json({message: "No user found with ID!"})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    //deletes friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {new: true}
        )
        .then(
            (user) =>
            !user
            ? res.status(404).json({message: "No user found with ID!"})
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    }
}