const client = require("../client");
const { activities } = require("../seedData");

async function createRoutine({ name, goal, activities = [] }) {
    try {
        const {
            rows: [routine],
        } = await client.query(
            `
            INSERT INTO routines("creatorId", name, goal )
            VALUES($1, $2, $3)
            RETURNING *;
            `,
            [creatorId, name, goal]
        );
        const activityList = await createActivies(activities);

        return await addActivitiesToRoutine(routine.id, activityList)
    } catch(error) {s
        console.error(error)
    }
}

async function getAllRoutines() {
    try {
        const { rows: routineIds } = await client.query(`
            SELECT id
            FROM routines;
        `);
        console.log("Routine Id's: ", routineIds);
        const routines = await Promise.all(
            routineIds.map((routine) => getRoutineById(routine.id))
        );
        return routines;
    } catch (error) {
        throw error
    }
}

async function updateRoutines()

async function getRoutineById(routineId) {
    try {
        const {
            rows: [routine],
        } = await client.query(
            `
            SELECT * 
            FROM routines
            WHERE id=$1;
            `, [routineId]
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
            `, [routine.creatorId]
        );
        routine.activities = activities
        routine.creator = creator;

        return routine;
    } catch (error) {
        throw error;
    }
}

async function getRoutineByRoutineName(routine) {
    
}

module.exports = {createRoutine, getAllRoutines, getRoutineById, updateRoutines, getRoutineByRoutineName}