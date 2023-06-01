const usersRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { getAllUsers } = require("../db/adapters/users");
const { getAllRoutinesByUser } = require("../db/adapters/routines");

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

//GET /api/users/:username/routines
// get a list of public routines for a particular user
usersRouter.get("/:username/routines", async (req, res, next) => {
  const { username } = req.params;
  try {
    const routines = await getAllRoutinesByUser(username);
    if (routines && routines.is_public) {
      res.send({ routines: routines });
    } else {
      next({ name: "NoRoutinesError", message: "No Routines Found" });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = usersRouter;
