const client = require("./client");
const {
  users,
  activities,
  routines,
  routine_activities,
} = require("./seedData");
const {
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  getUser,
} = require("./adapters/users");
const {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
} = require("./adapters/routines");
const {
  createActivity,
  getActivityById,
  getAllActivities,
  updateActivity,
} = require("./adapters/activities.js");
const {
  getRoutineActivityById,
  addActivityToRoutine,
} = require("./adapters/routine_activities");

async function dropTables() {
  // Drop all tables in order
  try {
    console.log("Starting to drop tables...");

    await client.query(`
    DROP TABLE IF EXISTS routine_activities;
    DROP TABLE IF EXISTS activities;
    DROP TABLE IF EXISTS routines;
    DROP TABLE IF EXISTS users;
    `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  // Define your tables and fields
  try {
    console.log("Starting to build tables...");

    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE routines (
        id SERIAL PRIMARY KEY,
        "creator_id" INTEGER REFERENCES users(id),
        name VARCHAR(255) UNIQUE NOT NULL,
        goal TEXT NOT NULL,
        is_public BOOLEAN DEFAULT true
      );
    `);

    await client.query(`
      CREATE TABLE  activities(
        id SERIAL PRIMARY KEY,
        name varchar(255) UNIQUE NOT NULL,
        description text NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE routine_activities (
        id SERIAL PRIMARY KEY,
        "routine_id" INTEGER REFERENCES routines(id),
        "activity_id" INTEGER REFERENCES activities(id),
        duration INTEGER,
        count INTEGER
      );
    `);

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function populateTables() {
  // Seed tables with dummy data from seedData.js
  const populateUsers = users.map(async (user) => await createUser(user));
  const populateRoutines = routines.map(
    async (routine) =>
      await createRoutine(routine.creator_id, routine.name, routine.goal)
  );
  const populateActivities = activities.map(
    async (act) => await createActivity(act)
  );
  const populateRoutineActivities = routine_activities.map(
    async (ra) =>
      await addActivityToRoutine(
        ra.routine_id,
        ra.activity_id,
        ra.count,
        ra.duration
      )
  );
}

async function rebuildDb() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await populateTables();
    //USERS...
    console.log("---------------Users----------------");
    console.log("Calling getAllUsers");
    const users = await getAllUsers();
    console.log("Result:", users);

    console.log("Calling getUserById with 1");
    const result = await getUserById(1);
    console.log("Result:", result);

    console.log("Calling getUserByusername with chris");
    const result2 = await getUserByUsername("chris");
    console.log("Result:", result2);

    console.log("Calling getuser with hanz");
    const result3 = await getUser("hanz", "test3");
    console.log("Result:", result3);

    //Activities..
    console.log("////////////////// tetsting Activities///////////////////");
    console.log("Calling getAllActivities");
    const activities = await getAllActivities();
    console.log("Result:", activities);

    console.log("Calling getActivityById with 1");
    const result4 = await getActivityById(1);
    console.log("Result:", result4);

    console.log("Calling UpdateActivity");
    const result5 = await updateActivity(1, "armwrestle", "test your might");
    console.log("Result:", result5);

    //Routine_Activities......
    console.log("------------Routine_Activities-------------");

    console.log("Get Routine_Activity By Id 1");
    const routine_activity_1 = await getRoutineActivityById(1);
    console.log("Routine_activity_1: ", routine_activity_1);

    //ROUTINES..
    console.log("---------------Routines-----------------");

    console.log("Creating a Routine");
    const createdRoutine = await createRoutine(
      3,
      "Cardio Day",
      "Kill Me Now!!"
    );
    console.log("Created Routine: ", createdRoutine);

    console.log("Calling getRoutineById of 1");
    const routine1 = await getRoutineById(1);
    console.log("Routine 1: ", routine1);

    console.log("Calling getRoutinesWithoutActivities");
    const routines_No_Activities = await getRoutinesWithoutActivities();
    console.log("Routines Without Activities: ", routines_No_Activities);

    console.log("Calling getAllRoutines");
    const routines = await getAllRoutines();
    console.log("Routines: ", routines);

    console.log("Calling getPublicRoutines");
    const publicRoutines = await getAllPublicRoutines();
    console.log("publicRoutines: ", publicRoutines);

    console.log("Calling getAllRoutinesByUser");
    const allRoutinesByUser = await getAllRoutinesByUser("cedric");
    console.log("AllUserRoutines: ", allRoutinesByUser);

    console.log("Calling getPublicRoutinesByActivity of 2");
    const PublicRoutinesByActivity2 = await getPublicRoutinesByActivity(2);
    console.log("Public Routines By Activity: ", PublicRoutinesByActivity2);

    console.log("Calling Update Routine");
    const updatedRoutine = await updateRoutine(
      2,
      "Cheat Day",
      "Eat food",
      true
    );
    console.log("updatedRoutine: ", updatedRoutine);
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}

rebuildDb();

//hello
