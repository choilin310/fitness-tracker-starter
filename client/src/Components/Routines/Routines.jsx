import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRoutines } from "../../api/routines";
import CreateRoutineForm from "./CreateRoutineForm";
import useAuth from "../../hooks/useAuth";

export default function Routines() {
  const { user } = useAuth();

  const [routines, setRoutines] = useState([]);
  const [theseRoutines, setTheseRoutines] = useState(routines);

  const [routine, setRoutine] = useState();

  useEffect(() => {
    async function getGetRoutines() {
      const result = await getRoutines();
      console.log("result get all routiens", result.routines);
      setRoutines(result.routines);
      setTheseRoutines(result.routines);
    }
    getGetRoutines();
  }, [routine]);

  return (
    <div id="Routines_page">
      <div id="routines">
        {theseRoutines.length ? (
          <section className="routines">
            <h3>All Routines</h3>
            {theseRoutines.map(
              (routine) => {
                return (
                  <Link
                    key={routine.id}
                    to={`/dashboard/routines/${routine.id}`}
                  >
                    <li>{routine.name}</li>
                  </Link>
                );
              },
              [theseRoutines]
            )}
          </section>
        ) : (
          <div className="message">
            <h4>No Routines</h4>
          </div>
        )}
      </div>
      {user && <CreateRoutineForm setRoutine={setRoutine} />}
    </div>
  );
}

/*               <div className="routine" key={routine.id}>
                    <h4>Routine: {routine.name}</h4>

                    <span className="goal">Goal: {routine.goal}</span>
                    <section className="activities">
                      {routine.activities.map(
                        (activity) => {
                          return (
                            <div className="activity" key={activity.id}>
                              <span className="activity_name">
                                Activity: {activity.name}
                              </span>
                              <span className="acivity_description">
                                Description: {activity.description}
                              </span>
                            </div>
                          );
                        },
                        [routine.activities]
                      )}
                    </section>
                  </div>
                  
                  */
