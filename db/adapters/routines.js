const {client} = require("/home/cxb94/dev/FitnessTrackerBackend/db/client.js");
const { createActivity, getAllActivities } = require("./activities.js");

async function getRoutineById(routineId) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
        SELECT * 
        FROM routines
        WHERE id=$1;
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

    const { rows: activities } = await client.query(
      `
        SELECT acts.name
        FROM activities acts
        WHERE acts.id IN (
            SELECT ract."activity_id"
            FROM routine_activities ract
            WHERE ract."routine_id" = $1
        )
        ORDER BY acts.id;
        `,
      [routineId]
    );

    routine.activities = activities;
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
        FROM routines;
        `
    );

    return routines;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutines() {
  try {
    /*const { rows: routines } = await client.query(
      `
          SELECT DISTINCT rts.id, rts."creator_id", rts.name, rts.goal, (
              SELECT ARRAY_AGG(acts.name)
              FROM activities acts
                  INNER JOIN routine_activities ract
                      ON acts.id = ract."activity_id"
              WHERE rts.id = ract."routine_id"
              )
              as activities
          FROM routines rts;
          `
    );*/

    const { rows: routines } = await client.query(
      `
            SELECT DISTINCT rts.id, rts."creator_id", rts.name, rts.goal, rts.is_public, (
                SELECT ARRAY_AGG(acts.name ORDER BY acts.id)
                FROM activities acts
                    INNER JOIN routine_activities ract
                        ON acts.id = ract."activity_id"
                WHERE rts.id = ract."routine_id"
                )
                as activities
            FROM routines rts;
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
                SELECT DISTINCT rts.id, rts."creator_id", rts.name, rts.goal, rts.is_public, (
                    SELECT ARRAY_AGG(acts.name ORDER BY acts.id)
                    FROM activities acts
                        INNER JOIN routine_activities ract
                            ON acts.id = ract."activity_id"
                    WHERE rts.id = ract."routine_id"
                    )
                    as activities
                FROM routines rts
                WHERE rts.is_public = true;
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
            SELECT DISTINCT rts.id, rts."creator_id", rts.name, rts.goal, rts.is_public, (
                SELECT ARRAY_AGG(acts.name ORDER BY acts.id)
                    FROM activities acts
                        INNER JOIN routine_activities ract
                            ON acts.id = ract."activity_id"
                    WHERE rts.id = ract."routine_id"
            )
            as activities
            FROM routines rts
            INNER JOIN users us
                ON us.id = rts."creator_id"
            WHERE us.username = $1;
            `,
      [username]
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
            SELECT DISTINCT rts.id, rts."creator_id", rts.name, rts.goal, rts.is_public, (
                SELECT ARRAY_AGG(acts.name ORDER BY acts.id)
                    FROM activities acts
                        INNER JOIN routine_activities ract
                            ON acts.id = ract."activity_id"
                    WHERE rts.id = ract."routine_id"
            )
            as activities
            FROM routines rts
                INNER JOIN routine_activities ract
                    ON ract."routine_id"=rts.id
            WHERE (rts.is_public = true) AND (ract."activity_id"=$1); 
            `,
      [activityId]
    );
    return routines;
  } catch (error) {
    throw error;
  }
}

async function createRoutine(creator_id, name, goal) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
                INSERT INTO routines("creator_id", name, goal )
                VALUES($1, $2, $3)
                RETURNING *;
                `,
      [creator_id, name, goal]
    );

    return routine;
  } catch (error) {
    console.error(error);
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
    const {
      row: [routine],
    } = await client.query(
      `
            
            `
    );
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRoutineById,
  getAllRoutines,
  getRoutinesWithoutActivities,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
};
