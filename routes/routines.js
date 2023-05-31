const routinesRouter = require("express").Router();
const { requireUser } = require(`./utils`);

/*const {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
} = require("./db/adapters");

routinesRouter.get("/", async (req, res, next) => {
  try {
    const allRoutines = await getAllRoutines();

    const routines = allRoutines.filter((routine) => {
      return routine.is_public;
    });
    res.send({ routines });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

routinesRouter.post("/", requireUser, async (req, res, next) => {
  const { name, goal, activities = "" } = req.body;
  const { creator_id } = req.user;

  const actArr = activities.trim().split(/\s+/);
  const routineData = {};

  if (actArr.length) {
    routineData.acts = actArr;
  }

  try {
    routineData.creator_id = creator_id;
    routineData.name = name;
    routineData.goal = goal;
    const routine = await createRoutine(creator_id, name, goal);

    if (routine) {
      res.send({ routine });
    } else {
      next({
        name: `Error`,
        message: `No value in required field`,
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

routinesRouter.patch("/:routineId", requireUser, async (req, res, next) => {
  const { routine_id } = req.params;
  const { name, goal, activities, is_public } = req.body;

  const updateFields = {};

  if (activities && activities.length > 0) {
    updateFields.activities = activities.trim().split(/\s+/);
  }

  if (title) {
    updateFields.name = name;
  }

  if (goal) {
    updateFields.goal = goal;
  }

  if (is_public) {
    updateFields.is_public = is_public;
  }

  try {
    const originalRoutine = await getRoutineById(routine_id);

    if (originalRoutine.creator_id === req.user.id) {
      const updatedRoutine = await updateRoutine(
        routine_id,
        name,
        goal,
        is_public
      );
      res.send({ routine: updatedRoutine });
    } else {
      next({
        name: "UnauthorizedUserError",
        message: "You cannot update a post that is not yours",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

routinesRouter.delete("/:routine_id", requireUser, async (req, res, next) => {
  try {
    const routine = await getRoutineById(req.params.routine_id);

    if (routine && routine.creator_id === req.user.id) {
      const deletedRoutine = await destroyRoutine(routine_id);

      res.send({ routine: deletedRoutine });
    } else {
      next(
        routine
          ? {
              name: "UnauthorizedUserError",
              message: "You cannot delete a post which is not yours",
            }
          : {
              name: "RoutineNotFoundError",
              message: "That routine does not exist",
            }
      );
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});
*/

module.exports = routinesRouter;
