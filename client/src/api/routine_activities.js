const TRACKER_URL = "http://localhost:3000/api/";

export async function createRoutineActivity(count, duration) {
  try {
    const response = await fetch(`/api/routine_activities`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        count,
        duration,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function patchRoutineActivity(routineActivityId, count, duration) {
  try {
    const response = await fetch(
      `/api/routine_activities/${routineActivityId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          count,
          duration,
        }),
      }
    );
    const result = await response.json();
    console.log("Result from patchRoutineActivity: ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteRoutineActivity(routineActivityId) {
  try {
    const response = await fetch(
      `/api/routine_activities/${routineActivityId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    console.log("Result from Delete RoutineActivity: ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
