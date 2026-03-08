const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
    userName: {
        type : String,
        required : true,
        trim: true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
},
{timestamps: true});

const Auth = mongoose.model("Auth", AuthSchema);
module.exports = Auth;