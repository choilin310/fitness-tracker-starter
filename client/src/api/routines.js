export async function getRoutines() {
  try {
    const response = await fetch(`/api/routines`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Trouble fetching routines", error);
  }
}

export async function getRoutine(routine_id) {
  try {
    const response = await fetch(`/api/routines/${routine_id}`);
    const result = await response.json();
    console.log("result from getRoutine: ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchMyRoutines() {
  try {
    const response = await fetch("/api/routines/myRoutines");
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function createRoutine(name, goal) {
  try {
    const response = await fetch(`/api/routines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        goal,
      }),
    });
    const result = await response.json();
    console.log("result from makeRoutine: ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function patchRoutine(routine_id, name, goal, is_public) {
  try {
    const response = await fetch(`/api/routines/${routine_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
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

export async function deleteRoutine(routine_id) {
  try {
    const response = await fetch(`/api/routines/${routine_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
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
    const response = await fetch(`/api/routines/${id}/activities`, {
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
