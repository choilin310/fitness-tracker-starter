import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { createRoutine } from "../../api/routines";

export default function CreateRoutineForm({ setRoutine }) {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [message, setMessage] = useState("");

  const { myRoutines, setMyRoutines } = useState();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await createRoutine(name, goal);
      console.log("handleSubmit result", result);

      setMessage(result.message);
      setRoutine(result.routine);

      setMyRoutines([...myRoutines, result.routine]);
      return result;
    } catch (error) {
      setMessage(error.message);
    }
    setName("");
    setGoal("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New Routine</h2>

      <label>
        Name:{" "}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Goal:{" "}
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
      </label>
      <button>Submit</button>
    </form>
  );
}
