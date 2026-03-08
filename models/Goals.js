const mongoose = require("mongoose");

const GoalSchema =new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        res:"Auth",
        require: true,
    },

    title: {
        type: String,
        require: true,
    },
    description: String,
    
    targetValue:{
        type: Number,
        require: true,
    },
    
    currentValue: {
        type: Number,
        require:true,
    },
    
    unit: String,

    priority: {
        type: Number,
        default: 0
    },

    deadline: Date,

},
{timestamps: true})

const Goals = mongoose.model ("Goals", GoalSchema)
module.exports = Goals;

