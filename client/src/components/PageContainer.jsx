import React from 'react'
import { Router,useNavigate,Route,Routes, Link} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Dashboard from './Dashboard'
import Profile from './Profile'
import RoutineForm from './RoutineForm'

export default function PageContainer() {
  return (
    <div>
      {/* this is where the page content goes for the middle section*/}
      <Routes>
        
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/routineform" element={<RoutineForm/>}/>
      </Routes>  
    </div>
  )
}
