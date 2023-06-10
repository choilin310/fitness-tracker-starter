const usersRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { getAllUsers, getUserById } = require("../db/adapters/users");
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
    res.send(users);
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

usersRouter.get("/:userid", async(req,res,next)=>{
  const userId = req.params.userid;
  
  try{
    const username = await getUserById(userId);
    if(username){
      res.send(username);
    }else{
      next({
        name: "NoUserFound",
        message: "no user found by that id",
      });
    }
  }catch({name,message}){
    next({name,message});
  }
})

module.exports = usersRouter;
