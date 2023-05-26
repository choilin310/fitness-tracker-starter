const client = require("../client");

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

module.exports = { getRoutineActivityById, addActivityToRoutine };
