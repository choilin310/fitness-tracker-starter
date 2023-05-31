<<<<<<< HEAD
const usersRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { getAllUsers } = require("../db/adapters/users");
const { getAllRoutinesByUser } = require("../db/adapters/routines");

// Making request
usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");
  next();
});

//GET /api/users
usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send({
      success: true,
      users: users,
    });
  } catch (error) {
    next(error);
  }
});

//GET /api/users/:username/routines
// get a list of public routines for a particular user
usersRouter.get("/:username/routines", async (req, res, next) => {
  const { username } = req.params;
  try {
    const routines = await getAllRoutinesByUser(username);
    if (routines) {
      res.send(routines);
    } else {
      next({
        name: "NoRoutineError",
        message: "No Routines Found for that user",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = usersRouter;
=======
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
>>>>>>> 12b05e9 (routes wip fixed client and query)
