import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import RoutinesSidebar from "./Routines/RoutinesSidebar";
import useAuth from "../hooks/useAuth";
import Nav from "./Nav";
import Footer from "./Footer";
import { fetchMyRoutines } from "../api/routines";

export default function Dashboard() {
  const { loggedIn } = useAuth();
  const [myRoutines, setMyRoutines] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    } else {
      async function getMyRoutines() {
        const routines = await fetchMyRoutines();
        console.log("my routines in dashboard: ", routines);
      }
      getMyRoutines();
    }
  }, [loggedIn]);

  return (
    <div className="grid grid-cols-layout grid-rows-layout">
      <Nav />
      <RoutinesSidebar myRoutines={myRoutines} />
      <Outlet context={{ myRoutines, setMyRoutines }} />
      <Footer />
    </div>
  );
}
