const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Auth",
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    month: {
        type: String,
        require: true
    }
},{timestamps: true})

module.exports = mongoose.model("Income", incomeSchema);