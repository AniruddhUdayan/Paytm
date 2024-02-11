"use client";
import React,{useState,useEffect} from "react";
import Image from "next/image";

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const [logoutVisible, setLogoutVisible] = useState(false);
 


  useEffect(() => {
    // Check if the token is present in localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Token is present, fetch the user's name
      const storedUserName = localStorage.getItem("user");
      if (storedUserName) {
        setUserName(storedUserName);
      }
    }
  }, [userName]); 

  const handleAccountClick = () => {
    setLogoutVisible(!logoutVisible);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    window.location.href = '/signin';
  }


  return (
    <div className="h-[87px] w-full flex flex-row items-center justify-between">
      <div className="text-[40px] ml-[36px] font-[700]">
        Pay<span className="text-blue-500">tm</span>
      </div>
      <div className="flex w-auto h-[50px] flex-row items-center gap-[18px] mr-[36px]">
       
        <div className="ml-[25px] flex flex-row cursor-pointer"  onClick={handleAccountClick}>
          {userName}
          
          <Image
            src="/images/expand.png"
            alt="Your Logo"
            width={24}
            height={24}
          />
         
        </div>
        {logoutVisible && (
            <div className="absolute right-[125px] top-[70px] bg-white border border-solid border-gray-300 rounded-md p-2 shadow-md" onClick={logoutHandler}>
              Logout
            </div>
          )}
        <div
          className={`flex justify-center items-center w-[54px] h-[54px] flex-shrink-0 rounded-[10px] bg-[#F9F9F9] shadow-md hover:shadow-none transition-shadow cursor-pointer`}
         
        >
          <div>
            <Image
              src="/images/account.png"
              alt="Your Logo"
              width={32}
              height={32}
            />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
