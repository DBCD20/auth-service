const { User } = require('./model');
const jwt      = require('jsonwebtoken');
const SECRET   = process.env.SECRET_KEY;

exports.signup = async (req, res, next) => {
   try {
    let { id, username, firstname, lastname, jobPost } = await User.create(req.body);

    let token = await jwt.sign({
            id,
            username,
            firstname,
            lastname,
            jobPost
        }, SECRET );

    return res.status(201).json({
        id,
        username,
        firstname,
        lastname,
        jobPost,
        token
    })}
    catch(err){
        if(err.code === 11000){
            err.message = "THAT EMAIL/PASSWORD IS ALREADY TAKEN"
        }
        return next({
            status: 400,
            message: err.message
        })
    }    
}

exports.signin = async function(req, res, next){
   try {
let user = await User.findOne({ username: req.body.username });
        let { id, username, firstname, lastname, jobPost } = user;
        let isMatch = await user.comparePassword(req.body.password);

        if(isMatch){
            let token = await jwt.sign({
                id,
                username,
                firstname,
                lastname,
                jobPost
            }, SECRET );
            
            res.status(200).json({
                id,
                username,
                firstname,
                lastname,
                jobPost,
                token
            })}
            else {
                next({
                    status: 400,
                    message: "USERNAME/PASSWORD IS INCORRECT"
                })
            }
        }
    catch(err){
        return next({
            status: 400,
            message: "USERNAME/PASSWORD IS INCORRECT"
        })
    }
}
exports.updateUser = async (req, res, next) => {
    try {
        let user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false });
        res.status(200).json(user)
    }
    catch(err){
        return next({
            status: 400,
            message: err.message
        })
    }
}
exports.deleteUser = async (req, res, next) => {
    try {
        let user = await User.findByIdAndDelete(req.params.id)
        if(user) res.status(200).json({
            message: "Successfully Deleted!"
        })
    }
    catch(err){
        return next({
            status: 400,
            message: "ACTION NOT ALLOWED"
        })
    }
}
    
    
