import React from 'react'
import { Router,useNavigate,Route,Routes, Link} from 'react-router-dom'
import Home from './Home'
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
