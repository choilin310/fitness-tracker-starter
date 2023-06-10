import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/user";
import useAuth from "../hooks/useAuth";

export default function Nav() {
  const { setLoggedIn, loggedIn } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    setLoggedIn(!loggedIn);
    navigate("/");
  }
  //col-span-2 flex flex-row justify-evenly items-center bg-slate-300"
  return (
    <nav className="nav">
      <Link to="/dashboard/profile">My Profile</Link>
      <Link to="/dashboard/activities">Activities</Link>
      <Link to="/dashboard/routines">Routines</Link>
      <button onClick={handleLogout}>Log Out</button>
    </nav>
  );
}
