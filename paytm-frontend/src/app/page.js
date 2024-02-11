
'use client'
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Check if the token is present in localStorage
    const token = localStorage.getItem("token");
  
    if (token) {
      // Token is present, fetch the user's name
      window.location.href = '/dashboard';
    } else{
      window.location.href = '/signin';
    }
  }, []); 
  return (
    <div>Hello</div>
  );
}
