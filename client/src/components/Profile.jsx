import React from 'react'
import useAuth from '../hooks/useAuth'

export default function Profile() {
    const {user} = useAuth();
  return (
    <div>
        <h1>Profile</h1>
        <div className="large-container">
            <section className="medium-container">
                {/* user info */}
            <h3>{user.username}</h3>
                <img src="" alt="" />
            <h3>About</h3> 
                <ul>
                    <li><span>name:</span></li>
                    <li><span>Region:</span></li>
                    <li><span>Age:</span></li>
                    <li><span>sex:</span></li>
                    <li><span>email:</span></li>
                </ul>
            </section>
            <section className="medium-container">
                {/* user routines */}
            <h3>Personal Workout</h3>
            <ul>
                <li>activities</li>
                <li>routines</li>
            </ul>
            </section>

        </div>
    </div>
  )
}
