import React from 'react';
import { useState, useEffect, useRef } from 'react';

export default function LoginPopup({ setDisplayName, setCurrentLocation, setUserName, setID, setProfilePic }) {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const login = async (e) => {
    e.preventDefault();
    try {
      const settings = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: usernameRef.current.value,
          pass: passwordRef.current.value,
        }),
      };
      const data = await fetch('http://localhost:3000/login', settings);
      const response = await data.json();
      setDisplayName(response.displayName);
      setUserName(response.username);
      setCurrentLocation(response.currentLocation);
      setID(response.id);
      setProfilePic(response.profilePicture);
      console.log(response);
      //utilize setDisplayName
    } catch (e) {
      console.log('Problem with login post request');
      console.log(e.message);
    }
  };

  return (
    <div className="bg-[#F1FAEE] flex flex-col items-center p-5 gap-5 rounded-lg">
      Login
      <form className="flex flex-col gap-2" onSubmit={(e) => login(e)}>
        <input
          className="bg-[#CDD9CE] p-2 rounded-md"
          ref={usernameRef}
          type="userName"
          placeholder="Username"
        />
        <input
          className="bg-[#CDD9CE] p-2 rounded-md"
          ref={passwordRef}
          type="password"
          placeholder="Super Secret Password"
        />
        <button
          className="rounded-md bg-[#1D3557] text-[#F1FAEE]"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
