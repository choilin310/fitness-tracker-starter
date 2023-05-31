const usersRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { getAllUsers } = require("../db/adapters/users");

// Making request
usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");
  res.send({ message: "Users coming soon" });
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

/*usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      next({
        name: "UsernameAlreadyExistsError",
        message: "A user by that username already exists",
      });
    }
    const user = await createUser({
      username,
      password,
    });
  } catch (error) {
    throw error;
  }
});*/

module.exports = usersRouter;
