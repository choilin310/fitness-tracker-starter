import React from "react";
import { useState } from "react";
export default function RoutineForm() {
  const [routineName, setRoutineName] = useState("");
  const [goal, setGoal] = useState("");
  const [activity, setActivity] = useState([]);
  return (
    <div>
      <h1>RoutineForm</h1>
      <form action="">
        <label>
          Routine name:{" "}
          <input
            type="text"
            placeholder="routine"
            name="routine-name"
            value={routineName}
            onChange={(e) => {
              setRoutineName(e.target.value);
            }}
          />
        </label>
        <label>
          Goal:{" "}
          <textarea
            type="textarea"
            placeholder="git fit lol"
            name="goal"
            value={goal}
            onChange={(e) => {
              setGoal(e.target.value);
            }}
          />
        </label>
        <h2>Activities</h2>
        <div className="medium-container" id="activities-input-list">
            list
        </div>
        <div>
          <form action="">
            <label>
              Activity name:{" "}
              <input type="text" placeholder="activity" name="activity-name" />
            </label>
            <label>
              duration:{" "}
              <input
                type="number"
                placeholder="1"
                name="duration-time"
                min="1"
              />
              minutes
            </label>
            <label>
              count:{" "}
              <input
                type="number"
                placeholder="1"
                name="duration-time"
                min="1"
              />
              repetitions
            </label>
            <button>add activity</button>
          </form>

        </div>
        <button>submit</button>
      </form>
    </div>
  );
}
