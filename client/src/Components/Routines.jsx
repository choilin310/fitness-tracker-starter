import React, { useState, useEffect } from "react";
import { getRoutines } from "../api/routines";
import useAuth from "../hooks/useAuth";

export default function Routines() {
  const { user, token } = useAuth();

  const [routines, setRoutines] = useState([]);
  const [theseRoutines, setTheseRoutines] = useState(routines);

  useEffect(() => {
    async function getGetRoutines() {
      const result = await getRoutines();
      console.log("Result from getGetRoutines: ", result.routines);
      setRoutines(result.routines);
      setTheseRoutines(result.routines);
    }
    getGetRoutines();
  }, []);

  return (
    <div id="Routines_page">
      <div id="Routines"></div>
    </div>
  );
}
