import { useState } from "react";
import { postActivity } from "../../api/activities";

export default function createActivity() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [activities, setActivities] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await postActivity(name, description);
      console.log(result);
      setMessage(result.message);
      setActivities(result);
    } catch (error) {
      setMessage(error.message);
    }
    setName("");
    setDescription("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <h3>Create an Activity</h3>

      <label>
        Name:{" "}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Description:{" "}
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button>Submit</button>
    </form>
  );
}
