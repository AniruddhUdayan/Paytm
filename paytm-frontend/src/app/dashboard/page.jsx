"use client"
import Navbar from '@/components/Navbar';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
  const [user,setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = 'http://localhost:3001/auth/login/success';
      const response = await axios.get(url,{withCredentials:true});
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token); 
        localStorage.setItem('user',response.data.user)
      }
    } catch (error) {
      console.log(error)
    }
  }
useEffect(()=>{
  getUser();
},[]);

  return (
    <div className='flex  bg-opacity-0 bg-cover bg-center bg-no-repeat h-auto xl:h-screen'  style={{ backgroundImage: `url('/images/Background.png')` }}>
     <Navbar/>
    </div>
  )
}

export default Dashboard
