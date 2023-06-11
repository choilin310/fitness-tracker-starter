const ractsRouter = require("express").Router();
const {
  addActivityToRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  getRoutineActivityById,
} = require(`../db/adapters/routine_activities`);
const { getRoutineById } = require("../db/adapters/routines");
const { authRequired } = require("./utils");

ractsRouter.use((req, res, next) => {
  console.log("A request is being made to activity_routines");
  next();
});

//POST api/routine_activities
//attach a single activity to routine. Prevent duplication on (routine_id, activity_id)
ractsRouter.post("/", async (req, res, next) => {
  const { routine_id, activity_id, duration, count } = req.body;
  const { routine } = req.routine;
  const { activity } = req.activity;
  const ractData = {};

  try {
    ractData.routine_id = routine_id;
    ractData.activity_id = activity_id;
    ractData.duration = duration;
    ractData.count = count;
    const ract = await addActivityToRoutine(
      routine_id,
      activity_id,
      duration,
      count
    );

    if (routine.id === routine_id || activity.id === activity_id) {
      next({
        name: "DuplicationError",
        message: "Cannot duplicate an activity in a routine",
      });
    } else if (ract) {
      res.send({ ract });
    } else {
      next({
        name: `Error`,
        message: `Null value in required field`,
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//PATCH api/routine_activities/:routineActivityId (**)
ractsRouter.patch(
  "/:routine_activity_id",
  authRequired,
  async (req, res, next) => {
    const { routine_activity_id } = req.params;
    const { duration, count } = req.body;

    const updateFields = {};

    if (duration) {
      updateFields.duration = duration;
    }
    if (count) {
      updateFields.count = count;
    }

    try {
      const originalRoutineActivity = await getRoutineActivityById(
        routine_activity_id
      );
      const routine = await getRoutineById(originalRoutineActivity.routine_id);
      if (routine.creator_id === req.user.id) {
        const updatedRoutineActivity = await updateRoutineActivity(
          routine_activity_id,
          count,
          duration
        );
        res.send({ routine_activity: updatedRoutineActivity });
      } else {
        next({
          name: "UnauthorizedUserError",
          message: "You cannot update a routine activity that is not yours",
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

//DELETE api/routine_activities/:routineActivityId (**)
ractsRouter.delete(
  "/:routine_activity_id",
  authRequired,
  async (req, res, next) => {
    const { routine_activity_id } = req.params;
    try {
      const routineActivity = await getRoutineActivityById(routine_activity_id);
      const routine = await getRoutineById(routineActivity.routine_id);
      if (routineActivity && routine.creator_id === req.user.id) {
        const deletedRoutineActivity = await destroyRoutineActivity(
          routine_activity_id
        );
        res.send({ routineActivity: deletedRoutineActivity });
      } else {
        next(
          routineActivity
            ? {
                name: "UnauthorizedUserError",
                message:
                  "You cannot delete a routine activity which is not yours",
              }
            : {
                name: "RoutineActivityNotFoundError",
                message: "That routine activity does not exist",
              }
        );
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

module.exports = ractsRouter;
