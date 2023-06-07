import { useState, useEffect } from "react";
import "./App.css";
import useAuth from "./hooks/useAuth";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import LogIn from "./Components/Login";
import RegisterForm from "./Components/RegisterForm";
import Activities from "./Components/Activities";
import Routines from "./Components/Routines";

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
        <Link to="/" className="links">
          Home
        </Link>
        <Link to="/logIn" className="log">
          Log In/Out
        </Link>
        <Link to="/register" className="log">
          Register
        </Link>
        <Link to="/routines" className="links">
          Routines
        </Link>
        <Link to="/activities" className="links">
          Activities
        </Link>
      </div>
      <div id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logIn/*" element={<LogIn />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/routines" element={<Routines />} />
          <Route path="/activities" element={<Activities />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
