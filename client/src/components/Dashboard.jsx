import React from "react";
import { useEffect, useState} from "react";
import { getRoutines } from "../api/routines";
import { fetchUserById } from "../api/user";

export default function Dashboard() {
    const[routinesList,setRoutinesList] = useState("");
  useEffect(() => {
    async function getAllRoutines() {
      const response = await getRoutines();
      console.log(response);
      const result = response.routines;
        const listpromise = result.map( async (routine)=>{
            const user =  await fetchUserById(routine.creator_id)
            console.log("testing",user)
            return(
                <div className="small-container" id="routine-card" key={routine.id}>
                <img src="" alt="" />
                <p>{user}</p>
                <p>{routine.name}</p>
                <p>{routine.goal}</p>
                <p>Activities:{routine.activities}</p>
            </div>
            )
            
        })
        const list = await Promise.all(listpromise)
        console.log("response.routines",list);
        setRoutinesList(list);
    }
    getAllRoutines();
    console.log("routinelist:",routinesList)
  },[]);
  return (
    <div>
      <h1>Dashboard</h1>
      <button id="build-routine-button">build a Routine</button>
      <section className="large-container">
        <h3>Public Routines</h3>
        {routinesList}
      </section>
    </div>
  );
}
