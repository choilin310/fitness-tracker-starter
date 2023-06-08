import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SelectedRoutine() {
  const { routineId } = useParams();
  return (
    <div>
      <h1>Selected Routine! {routineId}</h1>
    </div>
  );
}
