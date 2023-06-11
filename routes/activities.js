const activitiesRouter = require("express").Router();
const {
  getAllActivities,
  createActivity,
  updateActivity,
} = require("../db/adapters/activities");
const { getPublicRoutinesByActivityId } = require(`../db/adapters/routines`);
const { requireUser } = require(`./utils`);

activitiesRouter.use((req, res, next) => {
  console.log("A request is being made to /activities");
  next();
});

//GET /api/activities
activitiesRouter.get("/", async (req, res) => {
  const activities = await getAllActivities();

  res.send({
    success: true,
    message: "Got Activities",
    activities,
  });
});

//POST /api/activities
activitiesRouter.post("/", requireUser, async (req, res, next) => {
  const { name, description } = req.body;
  const activitiesObj = {};
  try {
    activitiesObj.name = name;
    activitiesObj.description = description;
    const activity = await createActivity(activitiesObj);

    if (activity) {
      res.send({
        success: true,
        message: "Activity created",
        activity,
      });
    } else {
      next({
        name: "Error",
        message: `Null value in required field`,
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//PATCH api/activities/:activity_id
activitiesRouter.patch("/:activity_id", requireUser, async (req, res, next) => {
  const { activity_id } = req.params;
  const { name, description } = req.body;

  const updateFields = {};

  if (name) {
    updateFields.name = name;
  }
  if (description) {
    updateFields.description = description;
  }

  try {
    const updatedActivity = await updateActivity(
      activity_id,
      name,
      description
    );
    res.send({ activity: updatedActivity });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//GET /activities/:activity_id/routines
activitiesRouter.get("/:activity_id/routines", async (req, res, next) => {
  const { activity_id } = req.params;

  try {
    const routines = await getPublicRoutinesByActivityId(activity_id);

    if (routines) {
      res.send({ routines: routines });
    } else {
      next({
        name: "Error",
        message: "No posts matching that activity_id",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = activitiesRouter;
