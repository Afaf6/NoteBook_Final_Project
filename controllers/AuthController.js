const Auth = require("../models/Auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const registerAuth = async(req, res) => {
    try {
        const {userName, email, password} =req.body;

        if (!userName || !email || !password) {
            return res.status(400).json({
                msg: "Missing Data"
            });
        };

        const existUser = await Auth.findOne({email});

        if (existUser) return res.status(400).json({
            msg: "Email Alreay Exist"
        });

        const hashingPassword = await bcrypt.hash(password, 10);

        const user = await Auth.create({
            userName,
            email,
            password : hashingPassword,
        });

        res.status(201).json({
            msg: "Create Account Successfly",
            data: {
                id: user._id,
                userName: user.userName,
                email: user.email
            }
        });
    } catch (error) {
    console.error(error);
    return res.status(500).json({
        msg: "Failed to Create Account"
    });
}
};
const loginAuth = async(req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                msg: "Email, Passwor Require"})
        }
        
        const auth = await Auth.findOne({email});

        if(!auth) {
            return res.status(400).json({
                msg: "Accont not found Please create accont"});
        }
        console.log("User Found");

        const matchPassowerd = await bcrypt.compare(password, auth.password);

        if(!matchPassowerd) {
            return res.status(400).json({
                msg: "Incorrect Passowrd"
            });
        };

        const token = jwt.sign(
            {
                id: auth._id,
                email: auth.email
            },
             process.env.JWT_SECRET, 
            {
                expiresIn: "1d"
            })

        res.status(200).json({
            msg: "Login Success",
            token,
        })
    } catch (error) {
    console.error(error);
    return res.status(500).json({
        msg: "Login Failed"
    });
}
};


module.exports = {
    registerAuth,
    loginAuth,
}
