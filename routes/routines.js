const routinesRouter = require("express").Router();
const { requireUser, authRequired } = require(`./utils`);

const {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  getAllRoutinesByUserId,
  createRoutine,
  updateRoutine,
  destroyRoutine,
} = require("../db/adapters/routines");

routinesRouter.use((req, res, next) => {
  console.log("A request is being made to /routines");
  next();
});

// GET /routines
routinesRouter.get("/", async (req, res, next) => {
  try {
    const routines = await getAllPublicRoutines();

    res.send({ routines });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

routinesRouter.get("/myRoutines", authRequired, async (req, res, next) => {
  try {
    const routines = await getAllRoutinesByUser(req.user.username);
    res.send({ success: true, message: "My Routines", routines });
  } catch (error) {
    next(error);
  }
});

// POST /routines
routinesRouter.post("/", authRequired, async (req, res, next) => {
  const { name, goal } = req.body;
  const { id } = req.user;

  try {
    let creator_id = id;
    console.log("creator_id", creator_id);
    const routine = await createRoutine(creator_id, name, goal);

    res.send({
      success: true,
      message: "Routine posted",
      routine: {
        creator_id: routine.creator_id,
        name: routine.name,
        goal: routine.goal,
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /routines/:routineId
routinesRouter.get("/:routine_id", async (req, res, next) => {
  try {
    const routine = await getRoutineById(req.params.routine_id);
    res.send({
      success: true,
      message: "Found Routine",
      routine,
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /routines/:routineId
routinesRouter.patch("/:routine_id", authRequired, async (req, res, next) => {
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
      res.send({
        success: true,
        message: "Routine updated",
        routine: updatedRoutine,
      });
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

// DELETE /routines/:routine_id
routinesRouter.delete("/:routine_id", authRequired, async (req, res, next) => {
  try {
    const routine = await getRoutineById(req.params.routine_id);

    if (routine && routine.creator_id === req.user.id) {
      const deletedRoutine = await destroyRoutine(routine_id);

      res.send({
        success: true,
        message: "message deleted",
        routine: deletedRoutine,
      });
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

module.exports = routinesRouter;
