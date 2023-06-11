import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Landing() {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate("/dashboard");
    }
  }, [loggedIn, navigate]);

  return (
    <div className="landing">
      <div>
        <h2>Welcome to Fitness Traccker!</h2>
        <h3>Let's Get Pumped!!!</h3>
        <h4>Signup or Login to begin your Fitness Journey</h4>
      </div>
      <nav>
        <Link to="/register">
          <button>Register</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </nav>
    </div>
  );
}
