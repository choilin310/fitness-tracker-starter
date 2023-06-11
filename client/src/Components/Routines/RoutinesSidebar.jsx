import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function RoutinesSidebar({ myRoutines }) {
  return (
    <div className="bg-slate-400">
      <h3>Routines Sidebar</h3>
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
