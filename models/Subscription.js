const { required } = require("joi");
const mongoose = require("mongoose");

const subscripSchema = new mongoose.Schema({

    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true },
    
    // name of sub
    name: {
        type: String,
        required: true},

    // for endertaniment or Education 
    category: { 
        type: String,
        required: true}, 

    // the price
    cost: { 
        type: Number,
        required: true },

    // pay monthly or yearly 
    billingCycle: { 
        type: String,
        enum: ["monthly", "yearly"],
        default: "monthly" },

    // hoe many time use it 
    usageFrequency: { 
        type: Number,
        default: 0 },

    // when you start use it
    startDate: { 
        type: Date,
        default: Date.now },
    
    // last time use it 
    lastUsed: { type: Date }, 

})

module.exports = mongoose.model("Subscription", subscripSchema);