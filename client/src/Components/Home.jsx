import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const { loggedIn } = useAuth();
  if (!loggedIn) {
    <Navigate to="/" replace={true} />;
  }
  return (
    <div className="home">
      <h1>Welcome to the Fitness Tracker</h1>
      <h3>Let`s get Pumped</h3>
    </div>
  );
}
