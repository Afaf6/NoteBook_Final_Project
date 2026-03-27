const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true 
    },

    title: { 
        type: String,
        required: true 
    },

    amount: { 
        type: Number,
        required: true 
    },

    category: { 
        type: String,
        default: "all" 
    },

    date: { 
        type: Date,
        default: Date.now 
    },
});

module.exports = mongoose.model("Expense", expenseSchema);