import React from 'react'

export  default async function logout() {
  try{
    const response = await fetch("http://localhost:3000/api/auth/logout")
  const result = response.json()
  console.log("logout result",result);
  return result;
  }catch(error){
    console.error(error)
  }
}
