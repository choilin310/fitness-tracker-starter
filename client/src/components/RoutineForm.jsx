import React from "react";
import { useState, useEffect} from "react";
import { postActivity } from "../api/activities";
export default function RoutineForm() {
  const [routineName, setRoutineName] = useState("");
  const [goal, setGoal] = useState("");
  const [activity, setActivity] = useState("");
  const [description,setDescription] = useState("");

  useEffect(()=>{
    
    
  })
  async function postActivityform(){
    const response = await postActivity(activity,description);
    console.log("activities",response)
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
          <button onClick={(e)=>{e.preventDefault();}}>create routine</button>
        </label>
        <h2>Activities</h2>
        <h3>Create A Activity</h3>
        <div>
          <form action="">
            <label>
              Activity name:{" "}
              <input type="text" placeholder="activity" name="activity-name" value={activity} onChange={(e)=>{setActivity(e.target.value)}}/>
            </label>
            <label>
              Activity description:{" "}
              <textarea type="text" placeholder="..." name="activity-description" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
            </label>
            <button onClick={(e)=>{e.preventDefault();postActivityform();setActivity("");setDescription("");}}>add activity</button>
          </form>

        </div>

        <div className="medium-container" id="activities-input-list">
            list
        </div>

        <button>submit</button>
      </form>
    </div>
  );
}
