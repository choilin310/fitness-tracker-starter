import React from 'react'
import { getRoutine } from '../api/routines'

export default async function RoutineActivitiesCard(props) {
    console.log("in card",props);
    if(props != undefined){
        const routine = await getRoutine(props.currentRoutine)

  return (
    <div className="medium-container" id="routines-activities-card">
        RoutineActivitiesCard
        <p># <span>{routine.id}</span></p>
        <p>{routine.name}</p>
        <p>{routine.goal}</p>
    </div>
  )
    }else{
        return
    }
    
}
