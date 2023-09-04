const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require('../model/user')
const jwt_decode = require("jwt-decode")

verifyToken = (req, res, next) => {

        let token = req.headers
        console.log(token);
        if(token || token.authorization){
            console.log("test");
            let decode = jwt_decode(req.headers.authorization)
            console.log(decode)
            if(decode.role === "Admin") {
                next()
            }else {
                return res.status(401).json({ error: "Do not have role to access" });
            }

        }
    
};

module.exports = [
    verifyToken
]
    


  
