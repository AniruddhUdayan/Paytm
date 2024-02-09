"use client"
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
      }
    } catch (error) {
      console.log(error)
    }
  }
useEffect(()=>{
  getUser();
},[]);

  return (
    <div>
      Hello {user?.token}
    </div>
  )
}

export default Dashboard
