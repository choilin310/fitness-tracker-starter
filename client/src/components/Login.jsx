import { useState } from "react";
import { loginUser} from "../api/user";
import { registerUser } from "../api/user";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function LogIn() {
  const [myUsername, setMyUsername] = useState("");
  const [myPassword, setMyPassword] = useState("");
  const [error, setError] = useState(null);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { setLoggedIn} = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    if (!myUsername.length || !myPassword.length) {
      setError("You must add a valid username and password");
      return;
    }
    try {
      let result;
      if (pathname === "/register") {
        result = await registerUser(myUsername, myPassword);
      } else {
        result = await loginUser(myUsername, myPassword);
      }
      if (result.success) {
        setLoggedIn(true);
        
       navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
    setMyUsername("");
    setMyPassword("");
  }

  return (
    <div className="flex flex-col h-screen justify-center">
      <form onSubmit={handleSubmit}>
        {pathname === "/register" ? (
          <h2 className="text-2xl">Register</h2>
        ) : (
          <h2 className="text-2xl">Login</h2>
        )}
        {error && <p>{error}</p>}
        <label>
          Username:{" "}
          <input
            type="text"
            placeholder="username"
            name="username"
            value={myUsername}
            onChange={(e) =>setMyUsername(e.target.value)}
          />
        </label>

        <label>
          Password:{" "}
          <input
            type="password"
            placeholder="password"
            name="password"
            value={myPassword}
            onChange={(e) => setMyPassword(e.target.value)}
          />
        </label>
        <button className="btn">Submit!</button>
      </form>
      {pathname === "/register" ? (
        <p>
          Already have an account? <Link to="/login">Login Here</Link>
        </p>
      ) : (
        <p>
          Don't have an account? <Link to="/register">Register Here</Link>
        </p>
      )}
    </div>
  );
}
