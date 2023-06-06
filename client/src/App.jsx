import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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

  return (
    <div>
    <p>hello there</p>
    <p>{healthMessage}</p>
    </div>
  )
}

export default App
