import { patchRoutine } from "../../api/routines";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { getRoutine } from "../../api/routines";
import { getActivities } from "../../api/activities";
import { useState, useEffect } from "react";
import DropDown from "../Activities/DropDown";

export default function AddActivties({ routine }) {
  const { routineId } = useParams();
  const { user } = useAuth();

  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState();
  const [allActivities, setAllActivities] = useState([]);

  useEffect(() => {
    async function getGetActivities() {
      const result = await getActivities();

      setAllActivities(result.activities);
      console.log("all activities", result.activities);
    }
    getGetActivities();
  }, []);

  useEffect(() => {
    console.log("activity", activity);
  }, [activity]);

  function handleChange(e) {
    setActivity(JSON.parse(e.target.value));
  }

  return (
    <form>
      <DropDown allActivities={allActivities} onChange={handleChange} />
    </form>
  );
}
