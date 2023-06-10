import React from "react";
import { useState, useEffect } from "react";
import { postActivity } from "../api/activities";
import { createRoutine } from "../api/routines";

import { getRoutine } from "../api/routines";

export default function RoutineForm() {
  const [routineName, setRoutineName] = useState("");
  const [goal, setGoal] = useState("");
  const [activity, setActivity] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [currentRoutine, setCurrentRoutine] = useState("");
  const [rnaTrigger, setRnaTrigger] = useState(false);
  const [rnaHTML, setrnaHTML] = useState("");

  useEffect(() => {
    async function buildRoutineActivities() {
      if (currentRoutine != "") {
        console.log("in card", currentRoutine);
        const routine = await getRoutine(currentRoutine);
        console.log("routin for card:",routine)
        let html = (
            <div className="medium-container" id="routines-activities-card">
            RoutineActivitiesCard
            <p>
              # <span>{currentRoutine}</span>
            </p>
            <p>Name:{routine.name}</p>
            <p>Goal:{routine.goal}</p>
          </div>
        )
        return (
          setrnaHTML(html)
        );
      } else {
        return;
      }
    }
    buildRoutineActivities()
  },[currentRoutine])
    
  async function postActivityform() {
    const response = await postActivity(activity, description);
    console.log("activities", response);
  }
  async function postRoutineForm() {
    const response = await createRoutine(routineName, goal, isPublic);
    console.log("created routine:", response.routine.id);
    setCurrentRoutine(response.routine.id);
  }

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
        <label>
          public:{" "}
          <input
            type="checkbox"
            name="public-check"
            value={isPublic}
            onChange={(e) => {
              setIsPublic(e.target.checked);
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              postRoutineForm();
              setRoutineName("");
              setGoal("");
              setIsPublic("");
              
            }}
          >
            create routine
          </button>
        </label>
        <h2>Activities</h2>
        <h3>Create A Activity</h3>
        <div>
          <form action="">
            <label>
              Activity name:{" "}
              <input
                type="text"
                placeholder="activity"
                name="activity-name"
                value={activity}
                onChange={(e) => {
                  setActivity(e.target.value);
                }}
              />
            </label>
            <label>
              Activity description:{" "}
              <textarea
                type="text"
                placeholder="..."
                name="activity-description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </label>
            <button
              onClick={(e) => {
                e.preventDefault();
                postActivityform();
                setActivity("");
                setDescription("");
              }}
            >
              add activity
            </button>
          </form>
        </div>

        <div className="medium-container" id="activities-input-list">
          list
          {rnaHTML}
        </div>

        <button>submit</button>
      </form>
    </div>
  );
}
