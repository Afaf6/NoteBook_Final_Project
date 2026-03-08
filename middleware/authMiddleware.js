const Auth = require("../models/Auth");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            console.log(token);
            
            const decoded = jwt.verify(
                token, process.env.JWT_SECRET
            );
            console.log(decoded);
            
            req.auth = await Auth.findById(decoded.id).select("-password")
            next();

        } catch (error) {
           res.status(401).json({
            msg: "Not Authorized"
           });
        }
        
    } else {
        res.status(401).json({
            msg: "No Token"
        });
    }  
};
module.exports = protect;