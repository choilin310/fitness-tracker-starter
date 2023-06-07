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
  try {
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
    const result = await response.json();
    console.log("loginUser result: ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchMyData(token) {
  try {
    const response = await fetch(`${TRACKER_URL}auth/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log("Result form fetchMyData: ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

//need to check on comparing token to my token
export async function fetchUsersRoutines(token, username) {
  try {
    const response = await fetch(`${TRACKER_URL}users/${username}/routines`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log("Result from fetchUsersRoutine: ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
