const {
  client,
} = require("/home/cxb94/dev/FitnessTrackerBackend/db/client.js");
async function createUser(userObj) {
  console.log("probe 2");
  try {
    const {
      rows: [user],
    } = await client.query(
      `
          INSERT INTO users(username, password) 
          VALUES($1, $2) 
          ON CONFLICT (username) DO NOTHING 
          RETURNING *;
        `,
      [userObj.username, userObj.password]
    );
    console.log("createuser log:", user);
    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
        SELECT id, username, password
        FROM users;
      `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getUser(username, password) {
  // getUser(username, password)
  // this should be able to verify the password against the hashed password
  //still need to make it check againt hashed password, but does check for password.
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT id, username from users WHERE username=$1 AND password=$2;
        `,
      [username, password]
    );
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    throw error;
  }
}
async function getUserById(id) {
  // getUserById(id)
  // select a user using the user's ID. Return the user object.
  // do NOT return the password

  try {
    const {
      rows: [user],
    } = await client.query(`
        SELECT username from users WHERE id=${id}
        `);
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    throw error;
  }
}
async function getUserByUsername(username) {
  // getUserByUsername(username)
  // select a user using the user's username. Return the user object.
  try {
    console.log("testing username string", username);
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT * from users WHERE username=$1;
        `,
      [username]
    );
    if (!user) {
      console.log("userByUsername log;", user);
      return null;
    }
    return user;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  getUser,
};
