const client = require("../client");

async function getRoutineActivityById(routineActivityId) {
  try {
    /*const {
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
    );*/

    const {
      rows: [routineActivity],
    } = await client.query(
      `
      SELECT ract.id as id, ract."routine_id" as routine_id, ract.activity_id as activity_id, ract.duration as duration, ract.count as count,
      CASE WHEN ract."routine_id" IS NULL THEN '[]'::json
      ELSE
      JSON_AGG(
        JSON_BUILD_OBJECT (
          'id', rts.id,
          'creator_id', rts."creator_id",
          'name', rts.name,
          'goal', rts.goal,
          'is_public', rts.is_public
        )
      ) END AS routine,
      CASE WHEN ract."routine_id" IS NULL THEN '[]'::json
      ELSE
      JSON_AGG(
        JSON_BUILD_OBJECT (
          'id', acts.id,
          'name', acts.name,
          'description', acts.description
        )
      ) END AS activities
      FROM routine_activities ract
      FULL OUTER JOIN routines rts
          ON rts.id = ract."routine_id"
      FULL OUTER JOIN activities acts
          ON acts.id = ract."activity_id"
      WHERE ract.id = $1
      GROUP BY ract.id, rts.id, acts.id
      `,
      [routineActivityId]
    );
    if (!routineActivity) {
      throw {
        name: "RoutineActivityNotFoundError",
        message: "Could not find a routine_activity with that id",
      };
    }

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
        WHERE routine_activities.routine_id = $1
        ORDER BY id;
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
