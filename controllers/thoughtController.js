const { User, Thought } = require("../models");

module.exports = {
    //Get all thoughts
    getThought(req, res) {
        Thought.find({})
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    //Gets a single thought
    getSingleThough(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select("-__V")
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No Thought with this ID" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a thought and push created thought's _id to the associated users thoughts array field
    createThought(req, res) {
        Thought.create(req.body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: req.body.userId},
                {$push: { thoughts: _id}},
                {new: true}
            );
        })
        .then((thought) => 
        !thought
        ? res.status(404).json({message: "No user found with ID!"})
        :res.json(thought)
        )
        .catch((err) => res.status(500).json(err))
    },
    //updates a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, New: true}
        )
        .then((user) =>
        !user
        ? res.status(404).json({message: "No thought found with ID!"})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    
}