import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const { loggedIn } = useAuth();

  return (
    <div className="home">
      <div>{!loggedIn && <Navigate to="/" replace={true} />}</div>
      <h1>Welcome to the Fitness Tracker</h1>
      <h3>Let`s get Pumped</h3>
    </div>
  );
}
