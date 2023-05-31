const apiRouter = require("express").Router();
const userRouter = require("./users.js");
const rnaRouter = require("./routine_activities.js");
const activitiesRouter = require("./activities.js");
const routinesRouter = require("./routines.js");
const authRouter = require("./auth.js");

//HEALTH ROUTE
apiRouter.get("/health", (req, res, next) => {
  try {
    res.send("API is Healthy 😎!");
  } catch (error) {
    next(error);
  }
});

// Hook up other Routers ex: router.use('/users', require('./users'))
apiRouter.use("/users", userRouter);
apiRouter.use("/auth", authRouter);
module.exports = apiRouter;
