const client = require("../client");

async function getActivityById(activityId) {
  // getActivityById(activityId)
  // return the activity
  try {
    const {
      rows: [activity],
    } = await client.query(`
        SELECT * from activities WHERE id=${activityId}
        ORDER BY id;
        `);
    if (!activity) {
      return null;
    }
    return activity;
  } catch (error) {
    throw error;
  }
}

async function getAllActivities() {
  // getAllActivities( )
  // select and return an array of all activities

  try {
    const { rows } = await client.query(`
        SELECT id, name, description
        FROM activities
        ORDER BY id;
      `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function createActivity(actObj) {
  // createActivity(name, description)
  // return the new activity

  try {
    const {
      rows: [activity],
    } = await client.query(
      `
          INSERT INTO  activities (name, description) 
          VALUES($1, $2) 
          ON CONFLICT (name) DO NOTHING 
          RETURNING *;
        `,
      [actObj.name.toLowerCase(), actObj.description]
    );

    return activity;
  } catch (error) {
    throw error;
  }
}

async function updateActivity(activityId, name, description) {
  // don't try to update the id
  // do update the name and description
  // return the updated activity

  try {
    const {
      rows: [activity],
    } = await client.query(
      `
            UPDATE activities 
            SET name = $2, description =$3 
            WHERE id = $1
            RETURNING *;
        `,
      [activityId, name, description]
    );
    return activity;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
};
