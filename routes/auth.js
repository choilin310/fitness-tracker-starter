const authRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = 10;
const bcrypt = require("bcrypt");
const {requireUser,authRequired} = require("./utils.js")
const { createUser, getUserByUsername } = require("../db/adapters/users.js");


//POST /api/auth/register

authRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    //Check if user already exists
    const _user = await getUserByUsername(username);
    if (_user) {
      next({
        message: "That user already exists!",
        name: "Auth Error",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await createUser({ username, password: hashedPassword });
    delete user.password;
    const token = jwt.sign(user, process.env.JWT_SECRET);

    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });

    res.send(user);
  } catch (error) {
    next(error);
  }
});

authRouter.post("/login",async (req, res, next) => {
  try {
   const{username,password} = req.body;
   const plainPassword = password;
   const _user = await getUserByUsername(username);
   bcrypt.compare(plainPassword,_user.password, function (err,result){
    if (err) {
        // Handle the error
        console.error(err);
        return;
      }
    
      if (result) {
        // Passwords match
        console.log('Password is correct');
      } else {
        // Passwords do not match
        console.log('Password is incorrect');
      }

   })

   
  

  } catch (error) {
    next(error);
  }
});

authRouter.get("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      loggedIn: false,
      message: "Logged Out!",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = authRouter;
