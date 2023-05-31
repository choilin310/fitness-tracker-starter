const {client} = require("/home/cxb94/dev/FitnessTrackerBackend/db/client.js");

async function getRoutineActivityById(routineActivityId) {
  try {
    const {
      rows: [routineActivity],
    } = await client.query(
      `
            SELECT *
            FROM routine_activities
            WHERE id=$1;
       `,
      [routineActivityId]
    );

    const {
      rows: [routine],
    } = await client.query(
      `
        SELECT id, name
        FROM routines
        WHERE id=$1;
    `,
      [routineActivity.routine_id]
    );

    const {
      rows: [activity],
    } = await client.query(
      `
        SELECT id, name
        FROM activities
        WHERE id=$1;
        `,
      [routineActivity.activity_id]
    );
    if (!routineActivity) {
      throw {
        name: "RoutineActivityNotFoundError",
        message: "Could not find a routine_activity with that id",
      };
    }

    routineActivity.routine = routine;
    routineActivity.activity = activity;

    return routineActivity;
  } catch (error) {
    throw error;
  }
}

async function addActivityToRoutine(routine_id, activity_id, count, duration) {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `
            INSERT INTO routine_activities("routine_id", "activity_id", count, duration)
            VALUES($1, $2, $3, $4)
            RETURNING *
            `,
      [routine_id, activity_id, count, duration]
    );

    return routine_activity;
  } catch (error) {
    throw error;
  }
}

async function updateRoutineActivity(routineActivityId, count, duration) {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `
        UPDATE routine_activities
        SET count=$2, duration=$3
        WHERE id=$1
        RETURNING *;
    `,
      [routineActivityId, count, duration]
    );
    return routine_activity;
  } catch (error) {
    throw error;
  }
}

async function destroyRoutineActivity(routineActivityId) {
  try {
    await client.query(
      `
            DELETE from routine_activities
            WHERE id=$1;
        `,
      [routineActivityId]
    );
  } catch (error) {
    throw error;
  }
}

async function getRoutineActivitiesByRoutine(routineId) {
  try {
    const {
      rows: [routine_activities],
    } = await client.query(
      `
        SELECT * FROM routine_activities
        WHERE routine_activities.routine_id = $1;
    `,
      [routineId]
    );
    return routine_activities;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  getRoutineActivitiesByRoutine,
};
