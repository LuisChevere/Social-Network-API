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
    
}