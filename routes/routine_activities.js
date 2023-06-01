const ractsRouter = require("express").Router();
const {
  addActivityToRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
} = require(`../db/adapters/routine_activities`);

ractsRouter.use((req, res, next) => {
  console.log("A request is being made to activity_routines");
  next();
});

//POST /routine_activities
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

//PATCH /routine_activities/:routineActivityId (**)

//DELETE /routine_activities/:routineActivityId (**)

module.exports = ractsRouter;
