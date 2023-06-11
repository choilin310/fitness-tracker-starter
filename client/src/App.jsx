import { useState, useEffect } from "react";
import AuthForm from "./Components/auth/AuthForm";
import "./App.css";
import useAuth from "./hooks/useAuth";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import Landing from "./Components/Landing";
import Activities from "./Components/Activities/Activities";
import Routines from "./Components/Routines/Routines";
import SelectedRoutine from "./Components/Routines/SelectedRoutine";
import Dashboard from "./Components/Dashboard";
import Profile from "./Components/Profile";

function App() {
  const [healthMessage,setHealthMessage] = useState("");
  const [error,setError] = useState(null);
  const [headButtons,setHeadButtons] = useState("");
  const Navigate = useNavigate();
  const {user, loggedIn, setLoggedIn} = useAuth();
  
  useEffect(()=>{
    async function checkHealth(){
      
      try {
        
        const response = await fetch('/api/health');
        const result = await response.json();
        
        setHealthMessage(result.message);
      } catch (error) {
        setError(error)
      }
    }

    async function Buttons(loggedIn){
      let html ="";
      if(!loggedIn){
        
        html = (<div>
           <button id="registerButton" onClick = {()=>{Navigate("/register")}}>register</button>
          <button id="signinButton" onClick = {()=>{Navigate("/login")}}>signin</button>
        </div>);
      }else{
        
        html = (<div>
           <button id="dashboardButton">dashboard</button>
           <button id="profileButton">profile</button>
          <button id="logoutButton" onClick = {()=>{setLoggedIn(logoutUser());}}>logout</button>
        </div>)
      }
      return(
        setHeadButtons(html)
      )
    }
    Buttons(loggedIn);
    checkHealth();
  },[loggedIn])

  

  

  function HeadingOfPage(){

    return(
      <div>
      <p>hello there {user.username}</p>
    <p>{healthMessage}</p>
      <div className="headingContainer">
        <h1>FITNESS TRACKER</h1>
        {headButtons}
        
          <div className='nav'>
            <ul>
              <li><Link to="/">home</Link></li>
              <li><Link to="/activities-and-routines">activities and routines</Link></li>
              <li><Link to="/user-roster">user roster</Link></li>
            </ul>
          </div>               
      </div>
    </div>  
    );

  }
  
  
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
          <Link to="/home" className="link">
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
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
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
    
  
  )
}

export default App
