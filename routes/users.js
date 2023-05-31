require("dotenv").config();
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = process.env;
const express = require("express");
const userRouter = express.Router();
const{requireUser} = require("./utils.js")
const {getUserByUsername, createUser} = require("../db/adapters/users.js");

userRouter.use('/',async(req,res,next)=>{
    console.log("you are in USERS API");
    next();
})

userRouter.post("/register",async(req,res,next)=>{
    console.log("probe 1");
    const {username, password} = req.body;
    try {
        
        const _user = await getUserByUsername(username);
        if(_user){
            next({name: 'UserExistError',
            message:'A user by that username already exists'});  
        }
        const user = await createUser({username,password})
    const token = jwt.sign({id: user.id,username},JWT_SECRET,{expiresIn: '1w'});
    res.send({message:'Thank you for signing up!',token})

        
    } catch ({name,message}) {
        next({name,message});
    }
});

userRouter.get("/me",requireUser,async(req,res,next)=>{

});







module.exports = userRouter;