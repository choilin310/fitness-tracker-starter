import { patchRoutine } from "../../api/routines";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { getRoutine } from "../../api/routines";
import { useState, useEffect } from "react";

export default function EditRoutine() {
  const { routineId } = useParams();
  const { user } = useAuth();

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function getGetRoutine() {
      const result = await getRoutine(routineId);
    }
  });
}

//patchRoutine(routine_id, name, goal, is_public)
