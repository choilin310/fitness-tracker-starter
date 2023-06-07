import React from 'react'
import { Router,useNavigate,Route,Routes, Link} from 'react-router-dom'
import LandingPage from './LandingPage'
import Register from './Register'
import Login from './Login'

export default function PageContainer() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/signin" element={<Login/>}/>
      </Routes>  
    </div>
  )
}
