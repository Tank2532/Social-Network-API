const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            // TODO: Trimmed
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // TODO: Match email address (mongoose)
        },
        thoughts: [
            {
            // TODO: Array of id referencing thought model
            },
        ],
        friends: [
            {
            // TODO: Array of id referencing User model
            }
        ]
    }
);

const User = model('user', userSchema);

module.exports = User;