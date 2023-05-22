const client = require("./client");
const {
  users,
  activities,
  routines,
  routine_activities,
} = require("./seedData");

async function dropTables() {
  // Drop all tables in order
}

async function createTables() {
  // Define your tables and fields
}

async function populateTables() {
  // Seed tables with dummy data from seedData.js
}

async function rebuildDb() {
  client.connect();
  try {
    await dropTables();
    await createTables();
    await populateTables();
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}

rebuildDb();
