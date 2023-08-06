const { ObjectId } = require('mongoose').Types;
const { Reaction, Thought, User } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.findAll();
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async getOneThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: ' No thought was found with this id'});
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);

            const user = await User.findOneAndUpdate(
                { users: req.params.userId },
                { $push: { users: req.params.userId } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Thought was created but no user was found',
                });
            }

            res.json({ message: 'Thought successfully posted to user' });
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought with this id was found' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            
            if (!thought) {
                res.status(404).json({ message: 'No thought was found with this id' });
            }

            const user = await User.findOneAndUpdate(
                { users: req.params.userId },
                { $pull: { users: req.params.userId } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Thought deleted, but no user found',
                });
            }

            res.json({ message: 'Thought was deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};