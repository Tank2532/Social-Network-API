const { ObjectId } = require('mongoose').Types;
const { Reaction, Thought, User } = require('../models');

module.exports = {
    async addFriend(req, res) {
        console.log('You are adding a friend to your friendslist');
        console.log(req.body);

        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $addToSet: { friendsList: req.body } },
                { runValidators: true, new: true }
            );

            if (!friend) {
                return res
                    .status(404)
                    .json({ message: 'No user found with that id :(' });
            }

            res.json(friend);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $pull: { friend: { friendId: req.params.friendId } } },
                { runValidators: true, new: true }
            );

            if (!friend) {
                return res
                    .status(404)
                    .json({ message: 'No user found with this id' });
            }

            res.json(friend);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};