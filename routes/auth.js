const authRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = 10;
const bcrypt = require("bcrypt");
const {
  createUser,
  getUserByUsername,
  getUser,
} = require("../db/adapters/users");

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

authRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await getUserByUsername(username);
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        console.error(err);
        return;
      }
      if (result) {
        console.log("password correct");
        const token = jwt.sign(user, process.env.JWT_SECRET);

        res.cookie("token", token, {
          sameSite: "strict",
          httpOnly: true,
          signed: true,
        });

        res.send({
          success: true,
          message: "You're logged in!",
        });
      } else {
        next({
          name: "IncorrectCredentialsError",
          message: "username or password is incorrect",
        });
      }
    });
    console.log(user);
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
