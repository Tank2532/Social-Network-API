const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280,
            minLength: 1
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // TODO: getter: format the timestamp on query
        },
        username: {
            type: String,
            required: true
        },
        reactions: {
            // TODO: Array of nested documents created with the reactionSchema
        }
    }
)