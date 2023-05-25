const client = require("./client");
const {
  users,
  activities,
  routines,
  routine_activities,
} = require("./seedData");
const {createUser, getAllUsers,getUserById,getUserByUsername,getUser} = require("/home/cxb94/dev/FitnessTrackerBackend/db/adapters/users.js");
const {createActivity, getActivityById, getAllActivities, updateActivity} = require("/home/cxb94/dev/FitnessTrackerBackend/db/adapters/activities.js");
async function dropTables() {
  // Drop all tables in orderrs
  try {
    console.log("Starting to drop tables...");

    // have to make sure to drop in correct order
    await client.query(`
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS activities;
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
      CREATE TABLE  activities(
        id SERIAL PRIMARY KEY,
        name varchar(255) UNIQUE NOT NULL,
        description text NOT NULL
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
  const populateUsers = users.map(async user => await createUser(user));
  const populateActivities = activities.map(async act => await createActivity(act));
}

async function rebuildDb() {
  client.connect();
  try {
    await dropTables();
    await createTables();
    await populateTables();
    console.log("Calling getAllUsers");
    const users = await getAllUsers();
    console.log("Result:", users);

    console.log("Calling getUserById with 1");
    const result = await getUserById(1);
    console.log("Result:", result);

    console.log("Calling getUserByusername with chris");
    const result2 = await getUserByUsername('chris');
    console.log("Result:", result2);

    console.log("Calling getuser with hanz");
    const result3 = await getUser("hanz","test3");
    console.log("Result:", result3);
    console.log("////////////////// tetsting Activities///////////////////");
    console.log("Calling getAllActivities");
    const activities = await getAllActivities();
    console.log("Result:", activities);

    console.log("Calling getActivityById with 1");
    const result4 = await getActivityById(1);
    console.log("Result:", result4);

    console.log("Calling UpdateActivity");
    const result5 = await updateActivity(1,"armwrestle","test your might");
    console.log("Result:", result5);

  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}

rebuildDb();

//hello
