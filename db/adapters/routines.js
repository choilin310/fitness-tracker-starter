const client = require("../client");
const { createActivity, getAllActivities } = require("./activities");

async function createRoutine(creator_id, name, goal, is_public = true) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
                INSERT INTO routines ("creator_id", name, goal, "is_public")
                VALUES ($1, $2, $3, $4)
                RETURNING *;
                `,
      [creator_id, name, goal, is_public]
    );

    return routine;
  } catch (error) {
    console.error(error);
  }
}

async function getRoutineById(routineId) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
            SELECT rts.id, rts."creator_id", rts.name, rts.goal, rts.is_public, 
            CASE WHEN ract."routine_id" IS NULL THEN '[]'::json
            ELSE
            JSON_AGG(
              JSON_BUILD_OBJECT (
                'id', acts.id,
                'name', acts.name,
                'description', acts.description,
                'duration', ract.duration,
                'count', ract.count
              )
            ) END AS activities
            FROM routines rts
            FULL OUTER JOIN routine_activities ract
              ON rts.id = ract."routine_id"
            FULL OUTER JOIN activities acts
              ON ract."activity_id" = acts.id
            JOIN users us
                ON us.id = rts."creator_id"
            WHERE rts.id = $1
            GROUP BY rts.id, ract."routine_id"
      `,
      [routineId]
    );

    if (!routine) {
      throw {
        name: "NoRoutineFoundError",
        message: "Could not find a routine with that routineId",
      };
    }

    const {
      rows: [creator],
    } = await client.query(
      `
            SELECT id, username
            FROM users
            WHERE id=$1;
            `,
      [routine.creator_id]
    );

    routine.creator = creator;

    return routine;
  } catch (error) {
    throw error;
  }
}

async function getRoutinesWithoutActivities() {
  try {
    const { rows: routines } = await client.query(
      `
        SELECT *
        FROM routines
        ORDER BY id;
        `
    );

    return routines;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutines() {
  try {
    const { rows: routines } = await client.query(
      `
            SELECT rts.id, rts."creator_id", rts.name, rts.goal, rts.is_public, 
            CASE WHEN ract."routine_id" IS NULL THEN '[]'::json
            ELSE
            JSON_AGG(
              JSON_BUILD_OBJECT (
                'id', acts.id,
                'name', acts.name,
                'description', acts.description,
                'duration', ract.duration,
                'count', ract.count
              )
            ) END AS activities
            FROM routines rts
            FULL OUTER JOIN routine_activities ract
              ON rts.id = ract."routine_id"
            FULL OUTER JOIN activities acts
              ON ract."activity_id" = acts.id
            GROUP BY rts.id, ract."routine_id"
      `
    );

    return routines;
  } catch (error) {
    throw error;
  }
}

async function getAllPublicRoutines() {
  try {
    const { rows: routines } = await client.query(
      `
            SELECT rts.id, rts."creator_id", rts.name, rts.goal, rts.is_public, 
            CASE WHEN ract."routine_id" IS NULL THEN '[]'::json
            ELSE
            JSON_AGG(
              JSON_BUILD_OBJECT (
                'id', acts.id,
                'name', acts.name,
                'description', acts.description,
                'duration', ract.duration,
                'count', ract.count
              )
            ) END AS activities
            FROM routines rts
            FULL OUTER JOIN routine_activities ract
              ON rts.id = ract."routine_id"
            FULL OUTER JOIN activities acts
              ON ract."activity_id" = acts.id
            WHERE rts.is_public = true
            GROUP BY rts.id, ract."routine_id"
      `
    );
    return routines;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutinesByUser(username) {
  try {
    const { rows: routines } = await client.query(
      `
            SELECT rts.id, rts."creator_id", rts.name, rts.goal, rts.is_public, 
            CASE WHEN ract."routine_id" IS NULL THEN '[]'::json
            ELSE
            JSON_AGG(
              JSON_BUILD_OBJECT (
                'id', acts.id,
                'name', acts.name,
                'description', acts.description,
                'duration', ract.duration,
                'count', ract.count
              )
            ) END AS activities
            FROM routines rts
            FULL OUTER JOIN routine_activities ract
              ON rts.id = ract."routine_id"
            FULL OUTER JOIN activities acts
              ON ract."activity_id" = acts.id
            JOIN users us
                ON us.id = rts."creator_id"
            WHERE us.username = $1
            GROUP BY rts.id, ract."routine_id"
      `,
      [username]
    );
    return routines;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutinesByUserId(id) {
  try {
    const { rows: routines } = await client.query(
      `
            SELECT rts.id, rts."creator_id", rts.name, rts.goal, rts.is_public, 
            CASE WHEN ract."routine_id" IS NULL THEN '[]'::json
            ELSE
            JSON_AGG(
              JSON_BUILD_OBJECT (
                'id', acts.id,
                'name', acts.name,
                'description', acts.description,
                'duration', ract.duration,
                'count', ract.count
              )
            ) END AS activities
            FROM routines rts
            FULL OUTER JOIN routine_activities ract
              ON rts.id = ract."routine_id"
            FULL OUTER JOIN activities acts
              ON ract."activity_id" = acts.id
            JOIN users us
                ON us.id = rts."creator_id"
            WHERE us.id = $1
            GROUP BY rts.id, ract."routine_id"
      `,
      [id]
    );
    return routines;
  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesByActivity(activityId) {
  try {
    const { rows: routines } = await client.query(
      `
            SELECT rts.id, rts."creator_id", rts.name, rts.goal, rts.is_public, 
            CASE WHEN ract."routine_id" IS NULL THEN '[]'::json
            ELSE
            JSON_AGG(
              JSON_BUILD_OBJECT (
                'id', acts.id,
                'name', acts.name,
                'description', acts.description,
                'duration', ract.duration,
                'count', ract.count
              )
            ) END AS activities
            FROM routines rts
            JOIN routine_activities ract
              ON rts.id = ract."routine_id"
            JOIN activities acts
              ON ract."activity_id" = acts.id
            WHERE (rts.is_public = true) AND (ract."activity_id"=$1)
            GROUP BY rts.id, ract."routine_id"
      `,
      [activityId]
    );

    return routines;
  } catch (error) {
    throw error;
  }
}

async function updateRoutine(routineId, name, goal, isPublic) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
                  UPDATE routines 
                  SET name = $2, goal =$3,
                  is_public = $4
                  WHERE id = $1
                  RETURNING *;
              `,
      [routineId, name, goal, isPublic]
    );
    return routine;
  } catch (error) {
    throw error;
  }
}

async function destroyRoutine(routineId) {
  try {
    const { rows: routine_activity } = await client.query(
      `
        DELETE
        FROM routine_activities
        WHERE "routine_id" = $1;
        `,
      [routineId]
    );

    const { row: routine } = await client.query(
      `
        DELETE 
        FROM routines
        WHERE id = $1;
        `,
      [routineId]
    );
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRoutineById,
  getAllRoutines,
  getRoutinesWithoutActivities,
  getAllRoutinesByUserId,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
