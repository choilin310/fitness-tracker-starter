export default function DropDown({ myActivities }) {
  return (
    <div>
      <label>
        <select>
          {myActivities.map((activity) => {
            return <option value={activity.id}>{activity.name}</option>;
          })}
        </select>
      </label>
    </div>
  );
}
