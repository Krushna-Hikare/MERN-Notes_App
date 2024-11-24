import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'

export default function Navbar({userInfo}) {
  const navigate= useNavigate();

  const onLogout=()=>{
    localStorage.clear()
    navigate("/login");
  };




  return (
    <div className=" bg-gradient-to-r from-black to-white flex items-center justify-between px-6 py-2 drop-shadow">
        <h2 className='text-xl font-medium text-white py-2'>Notes</h2>
        
        <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>
    </div>
  )
}
