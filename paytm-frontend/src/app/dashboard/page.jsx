"use client"
import BalanceCard from '@/components/BalanceCard';
import Navbar from '@/components/Navbar';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Dashboard = () => {


  const getUser = async () => {
    try {
      const url = 'https://paytm-wh8p.onrender.com/auth/login/success';
      const response = await axios.get(url,{withCredentials:true});
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token); 
        localStorage.setItem('user',response.data.user)
        localStorage.setItem('email',response.data.email)
      }
    } catch (error) {
      console.log(error)
    }
  }
useEffect(()=>{
  getUser();
},[]);

  return (
    <div className='flex flex-col bg-opacity-0 bg-cover bg-center bg-no-repeat h-screen'  style={{ backgroundImage: `url('/images/Background.png')` }}>
     <Navbar/>
     <div className='flex justify-center items-center h-full w-full'>
      <BalanceCard/>
     </div>
    </div>
  )
}

export default Dashboard
