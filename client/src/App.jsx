/* eslint-disable no-unused-vars */
import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import useAuth from './hooks/useAuth';
import './App.css'
import { Router,useNavigate,Route,Routes, Link} from 'react-router-dom'
import logout from './components/logout';



import PageContainer from './components/PageContainer'
import Footer from './components/Footer'

function App() {
  const [healthMessage,setHealthMessage] = useState("");
  const [error,setError] = useState(null);
  const Navigate = useNavigate();
  const {user} = useAuth();
  
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
    checkHealth();
  },[])

  function HeadingOfPage(){

    return(
      <div>
      <p>hello there </p>
    <p>{healthMessage}</p>
      <div className="headingContainer">
        <h1>FITNESS TRACKER</h1>
        {/* {user && user.username ? (
          <div id="user">
            {user.username.length > 10
              ? `Hi, ${user.username.substring(0, 8)}..`
              : `Hi, ${user.username}`}
          </div>
        ) : (
          <div id="user">Hi, Guest!</div>
        )} */}
        <button id="registerButton" onClick = {()=>{Navigate("/register")}}>register</button>
        <button id="signinButton" onClick = {()=>{Navigate("/login")}}>signin</button>
        <button id="logoutButton" onClick = {()=>{logout();}}>logout</button>
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
    <div className="app">
    <HeadingOfPage/>
    <PageContainer/>
    <Footer/>
    </div>
    
  
  )
}

export default App
