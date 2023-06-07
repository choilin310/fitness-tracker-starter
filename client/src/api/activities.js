const TRACKER_URL = "http://localhost:3000/api/";

export async function getActivities() {
  try {
    const response = await fetch(`${TRACKER_URL}activities`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log("Result from getActivities: ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function postActivity(token, name, description) {
  try {
    const response = await fetch(`${TRACKER_URL}activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        activity: {
          name,
          description,
        },
      }),
    });
    const result = await response.json();
    console.log("Result from postActivity: ", result);
    if (token) {
      return result;
    }
  } catch (error) {
    console.error(error);
  }
}

//added activity_id even though they didn't have it
export async function patchActivity(token, activity_id, name, description) {
  try {
    const response = await fetch(`${TRACKER_URL}activities/${activity_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        activity: {
          name,
          description,
        },
      }),
    });
    const result = await response.json();
    console.log("result from patchActivity: ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getPublicActivityRoutines(activity_id) {
  try {
    const response = await fetch(
      `${TRACKER_URL}activities/${activity_id}/routines`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    console.log("Result from get PublicActivityRoutines: ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
