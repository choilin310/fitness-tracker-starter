import { useParams } from "react-router-dom";

export default function DropDown({ myActivities }) {
  return (
    <div>
      <label>
        <select>
          {myActivities.map((activity) => {
            return (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
}
