const TRACKER_URL = "http://localhost:3000/api/";

export async function registerUser(username, password) {
  try {
    const response = await fetch(`api/auth/register`, {
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
    console.log("Result from register user: ", result);
    return result;
  } catch (error) {
    console.error("trouble posting user", error);
  }
}

export async function loginUser(username, password) {
  try {
    const response = await fetch(`api/auth/login`, {
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

export async function logout() {
  const response = await fetch(`api/auth/logout`);
  const { success, message } = await response.json();
  if (!success) {
    throw {
      message,
    };
  }
  return {
    success,
    message,
  };
}

export async function fetchMyData() {
  try {
    const response = await fetch("/api/auth/me");
    const result = await response.json();
    console.log("Result from fetchMyData: ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

//need to check on comparing token to my token
export async function fetchUsersRoutines(username) {
  try {
    const response = await fetch(`api/users/${username}/routines`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log("Result from fetchUsersRoutine: ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
