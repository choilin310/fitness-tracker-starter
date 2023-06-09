const TRACKER_URL = "http://localhost:3000/api/";

export async function registerUser(username, password) {
  try {
    const response = await fetch(`${TRACKER_URL}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await response.json();
    console.log("Result from post user: ", result);
    return result;
  } catch (error) {
    console.error("trouble posting user", error);
  }
}

export async function loginUser(username, password) {
  const response = await fetch(`${TRACKER_URL}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  console.log("COOKIE?",response)
  const { success, message, data } = await response.json();
  if (!success) {
    throw {
      message,
    };
  }
  return { success, message, data };
}

export async function fetchMyData() {
  const response = await fetch(`http://localhost:5173/api/auth/me`);
  const { success, message, user } = await response.json();
  if (!success) {
    throw {
      message,
    };
  }
  return {
    success,
    message,
    user,
  };
}

//need to check on comparing token to my token
export async function fetchUsersRoutines(token, username) {
  try {
    const response = await fetch(`${TRACKER_URL}users/${username}/routines`);
    const result = await response.json();
    console.log("Result from fetchUsersRoutine: ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
