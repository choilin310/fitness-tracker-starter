export default function DropDown({ allActivities, onChange }) {
  return (
    <div>
      <label>
        <select onChange={onChange}>
          {allActivities.map((activity) => {
            return (
              <option
                key={activity.id}
                value={JSON.stringify({
                  id: activity.id,
                  name: activity.name,
                  description: activity.description,
                })}
              >
                {activity.name}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
}
