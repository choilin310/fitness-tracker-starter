import { useState, useEffect } from "react";
import AuthForm from "./Components/Auth/AuthForm";
import "./App.css";
import useAuth from "./hooks/useAuth";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import LogIn from "./Components/Login";
import RegisterForm from "./Components/RegisterForm";
import Activities from "./Components/Activities/Activities";
import Routines from "./Components/Routines/Routines";
import SelectedRoutine from "./Components/Routines/SelectedRoutine";
import Dashboard from "./Components/Dashboard";
import Profile from "./Components/Profile";

function App() {
  const { user } = useAuth();
  const [healthMessage, setHealthMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function checkAPIHealth() {
      try {
        const response = await fetch("/api/health");
        const result = await response.json();
        console.log(result);
        setHealthMessage(result.message);
      } catch (error) {
        setError(error);
      }
    }
    checkAPIHealth();
  }, []);

  //{error & <p>{JSON.stringify(error, null, 2)}</p>}
  //{healthMessage && <p>{healthMessage}</p>}
  return (
    <div className="App">
      <div id="header">
        {user && user.username ? (
          <div id="user">
            {user.username.length > 10
              ? `Hi, ${user.username.substring(0, 8)}..`
              : `Hi, ${user.username}`}
          </div>
        ) : (
          <div id="user">Hi, Guest!</div>
        )}
        <div className="links">
          <Link to="/" className="link">
            Home
          </Link>
          <Link to="/dashboard" className="link">
            Dashboard
          </Link>
        </div>
        <div className="logs">
          <Link to="/logIn" className="log">
            Log In/Out
          </Link>
          <Link to="/register" className="log">
            Register
          </Link>
        </div>
      </div>
      <div id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/activities" element={<Activities />} />
          <Route path="/dashboard/routines" element={<Routines />} />
          <Route path="/logIn/*" element={<AuthForm />} />
          <Route path="/register" element={<AuthForm />} />
          <Route
            path="/dashboard/routines/:routineId"
            element={<SelectedRoutine />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
