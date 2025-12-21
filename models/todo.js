const mongoose = require("mongoose");
const { describe } = require("node:test");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    dueDate: {
        type: Date,
    },
    priority: {
        type: [Number],
        enum: [1, 2, 3],
    },
});

module.exports = mongoose.model("Todo", todoSchema);
