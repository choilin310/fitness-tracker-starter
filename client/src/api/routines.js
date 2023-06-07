const TRACKER_URL = "http://localhost:3000/api/";

export async function getRoutines() {
  try {
    const response = await fetch(`${TRACKER_URL}routines`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Trouble fetching routines", error);
  }
}

export async function getRoutine(routine_id) {
  try {
    const response = await fetch(`${TRACKER_URL}routines/${routine_id}`);
    const result = await response.json();
    console.log("result from getRoutine: ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function createRoutine(token, name, goal, is_public) {
  try {
    const response = await fetch(`${TRACKER_URL}routines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        routine: {
          name,
          goal,
          is_public,
        },
      }),
    });
    const result = await response.json();
    console.log("result from makeRoutine: ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function patchRoutine(token, routine_id, name, goal, is_public) {
  try {
    const response = await fetch(`${TRACKER_URL}routines/${routine_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        routine: {
          name,
          goal,
          is_public,
        },
      }),
    });
    const result = await response.json();
    console.log("result form patch routine: ", result);
    if (token) {
      return result;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function deleteRoutine(token, routine_id) {
  try {
    const response = await fetch(`${TRACKER_URL}routines/${routine_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log("result from deleteRoutine: ", result);
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export async function postRoutineActivity(id, activity_id, count, duration) {
  try {
    const response = await fetch(`${TRACKER_URL}routines/${id}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        activity_id,
        count,
        duration,
      }),
    });
    const result = await response.json();
    console.log("result from postRoutineActivity: ", response);
    return result;
  } catch (error) {
    console.error(error);
  }
}
