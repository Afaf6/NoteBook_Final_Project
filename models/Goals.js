const mongoose = require("mongoose");

const GoalSchema =new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Auth",
        required: true,
    },

    title: {
        type: String,
        required: true,
    },
    description: String,
    
    targetValue:{
        type: Number,
        required: true,
    },
    
    currentValue: {
        type: Number,
        required:true,
        default: 0
    },
    
    unit: String,

    priority: {
        type: Number,
        
    },

    deadline: Date,

},
{timestamps: true})

const Goals = mongoose.model ("Goals", GoalSchema)
module.exports = Goals;

