const mongoose = require("mongoose");

const habitsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    frequency: {
        type: String,
        enum: ["daily", "weekly"],
        default: "daily"
    },
    
    description: String,
    
    completedDates: [ { type: Date } ]

},
{timestamps: true})

const Habit = mongoose.model ("Habit", habitsSchema)
module.exports = Habit;