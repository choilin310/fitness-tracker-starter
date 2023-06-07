import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Router,Navigate,Route,Routes} from 'react-router-dom'
import Register from './components/Register'

function App() {
  const [healthMessage,setHealthMessage] = useState("");
  const [error,setError] = useState(null);
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

  function Landingpage(){

    return(
      <div>
      <p>hello there</p>
    <p>{healthMessage}</p>
      <div className="headingContainer">
        <h1>FITNESS TRACKER</h1>
        <button id="registerButton" onClick = {()=>{<Navigate to="/api/users/register"/>}}>register</button>
        <button id="signinButton" onClick = {()=>{<Navigate to="/api/users/login"/>}}>signin</button>
          <div className='nav'>
            <ul>
              <li>home</li>
              <li>activities and routines</li>
              <li>user roster</li>
            </ul>
          </div>               
      </div>
      <div className="BodyContainer">
        <section id="headlinerArticle">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam eum non nulla veniam, temporibus laboriosam minus ut voluptatibus, omnis obcaecati voluptatum quod consequatur vero beatae recusandae consectetur consequuntur aspernatur ex!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam eum non nulla veniam, temporibus laboriosam minus ut voluptatibus, omnis obcaecati voluptatum quod consequatur vero beatae recusandae consectetur consequuntur aspernatur ex!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam eum non nulla veniam, temporibus laboriosam minus ut voluptatibus, omnis obcaecati voluptatum quod consequatur vero beatae recusandae consectetur consequuntur aspernatur ex!</p>
          <img src="" alt="" />

        </section>

      </div>
      <div className="footerContainer">
        <div id="contactInfo">
          <p>phone:555-555-5555</p>
          <p>email:email@email.com</p>
          <p>location:address</p>
          <a href="">careers</a>
        </div>
        <div id="socialMedia">
          <a href="">image of twitter</a>
          <a href="">image of instagram</a>
          <a href="">image of facebook</a>
          <a href="">image of youtube</a>
        </div>

      </div>
    
    </div>  
    );

  }
  
  <Routes>
    <Route path="/api/users/register" element={<Register/>}/>
  </Routes>
  return (
    <Landingpage/>
  )
}

export default App
