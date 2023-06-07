const TRACKER_URL = "http://localhost:3000/api/";

export async function patchRoutineActivity(
  token,
  routineActivityId,
  count,
  duration
) {
  try {
    const response = await fetch(
      `${TRACKER_URL}routine_activities/${routineActivityId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

export async function deleteRoutineActivity(token, routineActivityId) {
  try {
    const response = await fetch(
      `${TRACKER_URL}routine_activities/${routineActivityId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
