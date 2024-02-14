"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
// import { Nunito } from "next/font/google";

// const nunito = Nunito({ subsets: ["latin"] });

const SignUp = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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

    if (user.password !== user.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!user.firstname.trim()) {
      errors.firstname = "First name is required";
    }

    if (!user.lastname.trim()) {
      errors.lastname = "Last name is required";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0; // Return true if no errors
  };
  const onSignup = async () => {
    if (!validateForm()) {
      return; // Do not proceed with signup if there are validation errors
    }

    try {
      setLoading(true);
      const userData = {
        username: user.email,
        firstName: user.firstname,
        lastName: user.lastname,
        password: user.password,
      };
      const response = await axios.post("https://paytm-wh8p.onrender.com/api/v1/user/signup", userData);
      console.log("Signup success", response.data);

    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token); 
      localStorage.setItem('user', response.data.user); 
      localStorage.setItem('email', response.data.email); 
    }
      router.push("/dashboard");
    } catch (error) {
      console.log("Signup failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const signInGoogle = async() => {
try {
  const response = await axios.get('https://paytm-wh8p.onrender.com/auth/google/callback')
  if (response.data && response.data.token) {
    localStorage.setItem('token', response.data.token); 
    localStorage.setItem('user', response.data.user); 
    localStorage.setItem('email', response.data.email); 
  }
    router.push("/signin");
} catch (error) {
  console.log("Signup failed", error.message);
}finally {
  setLoading(false);
}
  }


  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length >= 8 &&
      user.firstname.trim() !== "" &&
      user.lastname.trim() !== ""
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);


  return (
    <div
      className="flex justify-center items-center bg-opacity-0 bg-cover bg-center bg-no-repeat h-screen"
      style={{ backgroundImage: `url('/images/Background.png')` }}
    >
      <div className="flex mx-[100px] my-[50px] flex-row rounded-tl-0 rounded-tr-[35px] rounded-br-[35px] max-sm:rounded-tl-[35px] rounded-bl-[35px] bg-white w-full sm:max-w-[1114px] max-w-[350px] p-[31px]">
      <div className="flex flex-col items-center w-full h-auto sm:mr-[32px]">
          <div className="w-[160px] h-auto flex justify-center items-center">
          <div className="text-[40px]  font-[700]">
        Pay<span className="text-blue-500">tm</span>
      </div>
          </div>
          <div className="w-full h-full flex flex-col  items-center">
            <div
              className={` text-black text-center  text-[32px] font-bold  capitalize`}
            >
              Hello!
            </div>
            <div className="flex flex-row mt-[16px]">
              <div className="max-sm:hidden flex flex-col items-end justify-end w-[150px] h-[21px]">
                <hr className="w-[150px]"></hr>
              </div>

              <div
                className={` w-[152px] h-[21px] text-center font-nunito text-[14px] font-bold leading-6 capitalize`}
                style={{ color: "rgba(0, 0, 34, 0.50)" }}
              >
                Create your account
              </div>
              <div className="max-sm:hidden flex flex-col items-end justify-end w-[150px] h-[21px]">
                <hr className="w-[150px]"></hr>
              </div>
            </div>
            <div className="flex flex-col mt-[29px] w-[310px] sm:w-[450px]">
              {validationErrors.firstname && (
                <div className="text-red-500 text-[12px]">
                  {validationErrors.firstname}
                </div>
              )}
              <input
                className={` p-[13px] h-[45px] border border-gray-300 rounded-lg mb-[24px] focus:outline-none focus:border-gray-300 focus:text-[14px] text-black placeholder:text-[14px]  placeholder:font-semibold  placeholder:capitalize`}
                style={{ color: "rgba(0, 0, 34, 0.50)" }}
                id="firstname"
                type="text"
                value={user.firstname}
                onChange={(e) =>
                  setUser({ ...user, firstname: e.target.value })
                }
                placeholder="First Name"
              />

              {validationErrors.lastname && (
                <div className="text-red-500 text-[12px]">
                  {validationErrors.lastname}
                </div>
              )}
              <input
                className={` p-[13px] h-[45px] border border-gray-300 rounded-lg mb-[24px] focus:outline-none focus:border-gray-300 focus:text-[14px] text-black placeholder:text-[14px]  placeholder:font-semibold  placeholder:capitalize`}
                style={{ color: "rgba(0, 0, 34, 0.50)" }}
                id="lastname"
                type="text"
                value={user.lastname}
                onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                placeholder="Last Name"
              />
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
              {validationErrors.confirmPassword && (
                <div className="text-red-500 text-[12px]">
                  {validationErrors.confirmPassword}
                </div>
              )}
              <input
            onSignu    className={` p-[13px] h-[45px] border border-gray-300 rounded-lg mb-[24px] focus:outline-none focus:border-gray-300 focus:text-[14px] text-black placeholder:text-[14px]  placeholder:font-semibold  placeholder:capitalize`}
                style={{ color: "rgba(0, 0, 34, 0.50)" }}
                id="password"
                type="password"
                value={user.confirmPassword}
                onChange={(e) =>
                  setUser({ ...user, confirmPassword: e.target.value })
                }
                placeholder="Confirm Password"
              />
              <button
                onClick={onSignup}
                className="rounded-md border border-gray-300 bg-blue-500 h-[45px]"
              >
                <div
                  className={` text-white text-center text-[16px] font-bold capitalize h-[19px]`}
                >
                  SIGN UP
                </div>
              </button>
            </div>
            <div
              className={` mt-[24px] w-[29px] h-[20px] text-center text-[14px] font-[800] leading-6`}
              style={{ color: "rgba(0, 0, 34, 0.50)" }}
            >
              OR
            </div>
            <div className="mt-[23px] h-[45px] w-auto flex gap-[20px] sm:gap-[39px]">
            <Link
               href='https://paytm-wh8p.onrender.com/auth/google/callback'
              className="flex flex-row items-center justify-center gap-[3px]  rounded-lg border border-gray-300 bg-white"
            >
              <div
                className={` sm:text-base text-[10px] p-2 font-semibold leading-150 capitalize  `}
                style={{ color: "rgba(0, 0, 34, 0.50)" }}
              >
                Sign Up With Google
              </div>{" "}
              <Image
                src="/images/Google.png"
                alt="Your Logo"
                width={32}
                height={30}
                className=""
              />
            </Link>
            <Link
               href='https://paytm-wh8p.onrender.com/auth/github/callback'
              className="flex flex-row items-center justify-center gap-[6px]  rounded-lg border border-gray-300 bg-white"
            >
              <div
                className={` sm:text-base text-[10px] p-2  font-semibold leading-150 capitalize  `}
                style={{ color: "rgba(0, 0, 34, 0.50)" }}
              >
                Sign Up With Github
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
              Already have an Acoount ? {" "}
              <Link
                className="text-blue-600 font-nunito text-sm font-medium ml-[1px]"
                href="/signin"
              >
                LOGIN
              </Link>
            </div>
          </div>
        </div>
        <div className="max-sm:hidden h-auto border-l border-gray-300 mt-[86px]"></div>
        <div className="w-full flex flex-col justify-end">
          <div className="">
            <Image
              src="/images/bro.png"
              alt="Your Logo"
              width={500}
              height={326}
            />
          </div>
          <div className="relative left-[31px] top-8 w-full">
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
  );
};

export default SignUp;
