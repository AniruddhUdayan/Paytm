"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

const SignIn = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    // Check if the token is present in localStorage
    const token = localStorage.getItem("token");
  
    if (token) {
      // Token is present, fetch the user's name
      window.location.href = '/dashboard';
    } 
  }, []); 

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateForm = () => {
    const errors = {};

    if (!validateEmail(user.email)) {
      errors.email = "Invalid email address";
    }

    if (!validatePassword(user.password)) {
      errors.password = "Password must be at least 6 characters long";
    }

    
    

    

    setValidationErrors(errors);

    return Object.keys(errors).length === 0; // Return true if no errors
  };
  
 
  const onLogin = async () => {
    if (!validateForm()) {
      console.log('err') 
      return; // Do not proceed with signup if there are validation errors
    }
    try {
      setLoading(true);
      const userData = {
        username: user.email,
        password: user.password,
      };
      const response = await axios.post("http://localhost:3001/api/v1/user/signin", userData);
      console.log("Login success", response.data);
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token); 
        localStorage.setItem('user', response.data.user); 
      }
        router.push("/dashboard");
      
    } catch (error) {
      console.log("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
    className="flex justify-center items-center bg-opacity-0 bg-cover bg-center bg-no-repeat h-screen"
    style={{ backgroundImage: `url('/images/Background.png')` }}
  >
    <div className="flex mx-[100px] my-[50px] flex-row rounded-tl-0 rounded-tr-[35px] rounded-br-[35px] rounded-bl-[35px] bg-white w-full max-w-[1114px] p-[31px]">
      <div className="flex flex-col items-center w-full h-auto mr-[32px]">
        <div className="w-[160px] h-[47px]">
          <Image
            src="/images/XeroLogo.png"
            alt="Your Logo"
            width={160}
            height={47}
          />
        </div>
        <div className="w-full h-auto flex flex-col mt-[27px] items-center">
          <div
            className={` text-black text-center  text-[32px] font-bold  capitalize`}
          >
            Welcome!
          </div>
          <div className="flex flex-row mt-[16px]">
            <div className="flex flex-col items-end justify-end w-[150px] h-[21px]">
              <hr className="w-[150px]"></hr>
            </div>

            <div
              className={` w-[152px] h-[21px] text-center font-nunito text-[14px] font-bold leading-6 capitalize`}
              style={{ color: "rgba(0, 0, 34, 0.50)" }}
            >
              Login To Your Account
            </div>
            <div className="flex flex-col items-end justify-end w-[150px] h-[21px]">
              <hr className="w-[150px]"></hr>
            </div>
          </div>
          <div className="flex flex-col mt-[29px] w-[450px]">
         
           
            {validationErrors.email && (
              <div className="text-red-500 text-[12px]">
                {validationErrors.email}
              </div>
            )}
            <input
              className={` p-[13px] h-[45px] border border-gray-300 rounded-lg mb-[24px] focus:outline-none focus:border-gray-300 focus:text-[14px] text-black placeholder:text-[14px]  placeholder:font-semibold  placeholder:capitalize`}
              style={{ color: "rgba(0, 0, 34, 0.50)" }}
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email-Id"
            />
            {validationErrors.password && (
              <div className="text-red-500 text-[12px]">
                {validationErrors.password}
              </div>
            )}
            <input
              className={` p-[13px] h-[45px] border border-gray-300 rounded-lg mb-[24px] focus:outline-none focus:border-gray-300 focus:text-[14px] text-black placeholder:text-[14px]  placeholder:font-semibold  placeholder:capitalize`}
              style={{ color: "rgba(0, 0, 34, 0.50)" }}
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
            />
         
            <button
              onClick={onLogin}
              className="rounded-md border border-gray-300 bg-blue-500 h-[45px]"
            >
              <div
                className={` text-white text-center text-[16px] font-bold capitalize h-[19px]`}
              >
                LOGIN
              </div>
            </button>
          </div>
          <div
            className={` mt-[24px] w-[29px] h-[20px] text-center text-[14px] font-[800] leading-6`}
            style={{ color: "rgba(0, 0, 34, 0.50)" }}
          >
            OR
          </div>
          <div className="mt-[23px] h-[45px] w-[450px] flex gap-[39px]">
            <Link
               href='http://localhost:3001/auth/google/callback'
              className="flex flex-row items-center justify-center gap-[3px] w-[205px] rounded-lg border border-gray-300 bg-white"
            >
              <div
                className={` text-base font-semibold leading-150 capitalize  `}
                style={{ color: "rgba(0, 0, 34, 0.50)" }}
              >
                Sign In With Google
              </div>{" "}
              <Image
                src="/images/Google.png"
                alt="Your Logo"
                width={32}
                height={30}
              />
            </Link>
            <Link
               href='http://localhost:3001/auth/github/callback'
              className="flex flex-row items-center justify-center gap-[6px] w-[205px] rounded-lg border border-gray-300 bg-white"
            >
              <div
                className={` text-base font-semibold leading-150 capitalize  `}
                style={{ color: "rgba(0, 0, 34, 0.50)" }}
              >
                Sign In With Github
              </div>{" "}
              <Image
                src="/images/Github.png"
                alt="Your Logo"
                width={32}
                height={30}
              />
            </Link>
          </div>
          <div
            className={`flex flex-row mt-[28px] w-[224px] h-[19px] text-sm font-normal `}
            style={{ color: "rgba(0, 0, 34, 0.50)" }}
          >
            Dont have an Acoount ?
            <Link
              className="text-blue-600 font-nunito text-sm font-medium ml-[px]"
              href="/signup"
            >
                SIGN UP
            </Link>
          </div>
        </div>
      </div>
      <div className="h-auto border-l border-gray-300 mt-[86px]"></div>
      <div className="w-full flex flex-col h-auto justify-end">
        <div className="">
          <Image
            src="/images/bro.png"
            alt="Your Logo"
            width={500}
            height={326}
          />
        </div>
        <div className=" relative left-[31px] top-8 w-full">
          <Image
            src="/images/wave.png"
            alt="Your Logo"
            width={538}
            height={114}
          />
        </div>
      </div>
    </div>
  </div>
  )
}

export default SignIn
