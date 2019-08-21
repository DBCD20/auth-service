const jwt       = require('jsonwebtoken');
const SECRET    = process.env.SECRET_KEY;

exports.isLoggedIn = async function(req, res, next){
    try {
        let token = req.headers.authorization.split(" ")[1];    
        jwt.verify(token, SECRET, (err, decoded) => {
            if(decoded) return next();
            else {
                return next({
                    status: 401,
                    message: "PLEASE LOGIN FIRST"
                })
            }
    })}
    catch(err){
        return next({
            status: 401,
            message: "PLEASE LOGIN FIRST"
        })
    }
}