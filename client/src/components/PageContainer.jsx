import React from 'react'
import { Router,useNavigate,Route,Routes, Link} from 'react-router-dom'
import LandingPage from './LandingPage'
import Home from './Home'
import Register from './Register'
import RegisterForm from './RegisterForm'
import Login from './Login'

export default function PageContainer() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>  
    </div>
  )
}
