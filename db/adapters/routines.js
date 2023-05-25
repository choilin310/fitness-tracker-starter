const client = require("../client");
const { activities } = require("../seedData");
const { createActivity } = require("./activities");

async function createRoutine(creator_id, name, goal) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
            INSERT INTO routines(creator_id, name, goal )
            VALUES($1, $2, $3)
            RETURNING *;
            `,
      [creator_id, name, goal]
    );
    console.log("Routine in createRoutine", routine);
    return routine;

    /*const activityList = await createActivity(activities);

    return await addActivitiesToRoutine(routine.id, activityList);*/
  } catch (error) {
    console.error(error);
  }
}

async function getAllRoutines() {
  try {
    const { rows: routineIds } = await client.query(`
            SELECT creator_id, name, goal
            FROM routines;
        `);
    console.log("Routine Id's: ", routineIds);
    //const routines = await Promise.all(
    //routineIds.map((routine) => getRoutineById(routine.id))
    //);
    return routineIds;
  } catch (error) {
    throw error;
  }
}

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
    routine.activities = activities;
    routine.creator = creator;

    return routine;
  } catch (error) {
    throw error;
  }
}

module.exports = { createRoutine, getAllRoutines, getRoutineById };
