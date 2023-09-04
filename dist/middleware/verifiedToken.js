const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require('../model/user')
const jwt_decode = require("jwt-decode")

verifyTokenLogin = (req, res, next) => {
    const token = req.headers.authorization
    console.log(token);
    const decodeToken = jwt_decode(token);
    
    try{
        if (token){
            
            let isExpiredToken = false;
            let dateNow = new Date();
            dateNow.setHours(dateNow.getHours() + 7);

            let dateToken = new Date(decodeToken.exp * 1000);

            if (dateToken < dateNow) {
                isExpiredToken = true;
            }if (isExpiredToken === true) {
                res.status(401).json({error: "Expire token"});
            } else {
                next();
            }

        }else {
            res.status(401).json({error: "Do not allow to acces"});
        }
    }catch (error) {
        res.status(401).json({ error: error });
    }
    // let token = req.headers
    // console.log(token);
    // let decode = jwt_decode(req.headers.authorization)
    
    // if(token || token.authorization){
    //     jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    //         if (err) {
    //             res.status(401).json({ error: 'Do not have access to this' });
    //         }
    //     });
    //     next()
   
    // }else{
    //     res.status(401).json({ error: 'Do not have access to this' });
    // }
};

module.exports = [
    verifyTokenLogin
]
