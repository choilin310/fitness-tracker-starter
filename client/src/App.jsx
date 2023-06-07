import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Router,useNavigate,Route,Routes, Link} from 'react-router-dom'
import Register from './components/Register'
import PageContainer from './components/PageContainer'
import Footer from './components/Footer'

function App() {
  const [healthMessage,setHealthMessage] = useState("");
  const [error,setError] = useState(null);
  const Navigate = useNavigate();
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
      <p>hello there</p>
    <p>{healthMessage}</p>
      <div className="headingContainer">
        <h1>FITNESS TRACKER</h1>
        <button id="registerButton" onClick = {()=>{Navigate("/register")}}>register</button>
        <button id="signinButton" onClick = {()=>{Navigate("/login")}}>signin</button>
          <div className='nav'>
            <ul>
              <li><Link to="/">home</Link></li>
              <li><Link to="/activities-and-routines">activities and routines</Link></li>
              <li><Link to="/usre-roster">user roster</Link></li>
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
