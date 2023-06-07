import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { getActivities } from "../api/activities";
import { useNavigate } from "react-router-dom";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [theseActivities, setTheseActivities] = useState(activities);

  useEffect(() => {
    async function getGetActivities() {
      const result = await getActivities();
      console.log("All activities", result.activities);
      setActivities(result.activities);
      setTheseActivities(result.activities);
    }
    getGetActivities();
  }, []);

  return (
    <div id="activities_page">
      <div id="activities"></div>
    </div>
  );
}
