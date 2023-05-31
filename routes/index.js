<<<<<<< HEAD
const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
=======
const apiRouter = require("express").Router();
const userRouter = require("./users.js");
const rnaRouter = require("./routine_activities.js");
const activitiesRouter = require("./activities.js");
const routinesRouter = require("./routines.js");
>>>>>>> 12b05e9 (routes wip fixed client and query)

//HEALTH ROUTE
apiRouter.get("/health", (req, res, next) => {
  try {
    res.send({
      message: "Api is up and healthy",
    });
  } catch (error) {
    next(error);
  }
});

//Auth Router
const authRouter = require("./auth");
router.use("/auth", authRouter);

// Hook up other Routers ex: router.use('/users', require('./users'))
<<<<<<< HEAD
const usersRouter = require("./users");
router.use("/users", usersRouter);
const routinesRouter = require("./routines");
router.use("/routines", routinesRouter);
const routine_activities = require("./routine_activities");
router.use("/routine_activities", routine_activities);
const activities = require("./activities");
router.use("/activities", activities);

router.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message,
  });
});

module.exports = router;
=======
apiRouter.use("/users", userRouter);
module.exports = apiRouter;
>>>>>>> 12b05e9 (routes wip fixed client and query)
