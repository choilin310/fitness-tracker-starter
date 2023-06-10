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
  const [headButtons,setHeadButtons] = useState("");
  const Navigate = useNavigate();
  const {user, loggedIn} = useAuth();
  
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
        console.log("login buttons")
        html = (<div>
           <button id="registerButton" onClick = {()=>{Navigate("/register")}}>register</button>
          <button id="signinButton" onClick = {()=>{Navigate("/login")}}>signin</button>
        </div>);
      }else{
        console.log("logout buttons")
        html = (<div>
          <button id="logoutButton" onClick = {()=>{logout();}}>logout</button>
          <button id="profileButton">profile</button>
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
    <div className="app">
    <HeadingOfPage/>
    <PageContainer/>
    <Footer/>
    </div>
    
  
  )
}

export default App
