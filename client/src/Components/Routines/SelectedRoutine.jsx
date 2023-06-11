import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRoutine } from "../../api/routines";
import { getActivities } from "../../api/activities";
import DropDown from "../Activities/DropDown";
import useAuth from "../../hooks/useAuth";
import AddActivties from "./AddActivities";

export default function SelectedRoutine() {
  const { routineId } = useParams();
  const [routine, setRoutine] = useState({});
  const [activities, setActivities] = useState([]);
  const [myActivities, setMyActivities] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    async function getGetRoutinesById() {
      const result = await getRoutine(routineId);
      console.log(result);
      setRoutine(result.routine);
      setActivities(result.routine.activities);
    }
    getGetRoutinesById();
  }, []);

  useEffect(() => {
    async function getGetActivities() {
      const result = await getActivities();

      setMyActivities(result.activities);
    }
    getGetActivities();
  }, []);

  return (
    <div>
      <h1>Selected Routine! {routineId}</h1>

      <div className="routine" key={routine.id}>
        <h4>Routine: {routine.name}</h4>

        <span className="goal">Goal: {routine.goal}</span>
        {activities.length ? (
          <section className="activities">
            {activities.map(
              (activity) => {
                return (
                  <div className="activity" key={activity.id}>
                    <span className="activity_name">
                      Activity: {activity.name}
                    </span>
                    <span className="acivity_description">
                      Description: {activity.description}
                    </span>
                    <span className="activity_count">
                      Count: {activity.count}
                    </span>
                    <span className="duration">
                      Duration: {activity.duration}
                    </span>
                  </div>
                );
              },
              [routine.activities]
            )}
          </section>
        ) : (
          <div>
            <h2>No Activities Selected</h2>
          </div>
        )}
      </div>
      {routine.creator_id === user.id && <AddActivties routine={routine} />}
    </div>
  );
}
