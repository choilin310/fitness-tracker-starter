import { Link } from "react-router-dom";

export default function RoutinesSidebar({ myRoutines }) {
  return (
    <div className="bg-slate-400">
      <h1>Routines Sidebar</h1>
      <ul>
        {myRoutines.map((routine) => {
          return (
            <Link key={routine.id} to={`/dashboard/routines/${routine.id}`}>
              <li>{routine.name}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
