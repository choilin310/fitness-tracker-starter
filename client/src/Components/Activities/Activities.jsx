import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { getActivities } from "../../api/activities";
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
      <div id="activities">
        {theseActivities.length ? (
          <section className="activities">
            <h3>All Activities</h3>
            {theseActivities.map(
              (activity) => {
                return (
                  <div className="activity" key={activity.id}>
                    <h4>Activity: {activity.name}</h4>
                    <span className="description">
                      Description: {activity.description}
                    </span>
                  </div>
                );
              },
              [theseActivities]
            )}
          </section>
        ) : (
          <div className="message">
            <h4>No Activities Here!</h4>
          </div>
        )}
      </div>
    </div>
  );
}
