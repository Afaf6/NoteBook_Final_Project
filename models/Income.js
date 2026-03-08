const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Auth",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    month: {
        type: String,
        required: true,
        enum: ["January","February","March","April","May","June","July","August","September","October","November","December"]
    }
},{timestamps: true})

module.exports = mongoose.model("Income", incomeSchema);