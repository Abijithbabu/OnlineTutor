const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    image: {
        type: String,
    },
    language: {
        type: String,
        default: "English",
    },
    subject: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    availableDays: {
        type: [Number],
        required: true 
      },
    time: {
        type: Array,
    },
    subscription_type: {
        type: String,
        enum: ["Free", "Paid"],
        default: "Free",
    },
    amount: {
        type: Number 
    },
    subscribers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    ],
    likes: {
        type: Array
    }
},
    {
        timestamps: true,
    });

module.exports = mongoose.model("Courses", courseSchema);