import React from 'react';
import { useState, useEffect, useRef } from 'react';

export default function SignupPopup({ setDisplayName, setCurrentLocation, setUserName, setID, setProfilePic }) {
  const usernameRef = useRef();
  const displayNameRef = useRef();
  const passwordRef = useRef();
  const currentLocationRef = useRef();
  const pfpRef = useRef();

  const signUp = async (e) => {
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
          displayName: displayNameRef.current.value,
          currentLocation: currentLocationRef.current.value,
          profilePicture: pfpRef.current.value,
        }),
      };
      const data = await fetch('http://localhost:3000/signup', settings);
      const response = await data.json()
      console.log(response)
      setDisplayName(response.displayName)
      setUserName(response.username)
      setCurrentLocation(response.currentLocation)
      setID(response.id)
      setProfilePic(response.profilePicture)
    } catch (e) {
      console.log('Problem with signUp post request');
      console.log(e.message);
    }
  };
  return (
    <div className="bg-[#F1FAEE] flex flex-col items-center p-5 gap-5 rounded-lg">
      Sign Up
      <form className="flex flex-col gap-2" onSubmit={signUp}>
        <input
          className="bg-[#CDD9CE] p-2 rounded-md"
          ref={usernameRef}
          type="userName"
          placeholder="Username"
        />
        <input
          className="bg-[#CDD9CE] p-2 rounded-md"
          ref={displayNameRef}
          type="displayName"
          placeholder="Display Name"
        />
        <input
          className="bg-[#CDD9CE] p-2 rounded-md"
          ref={passwordRef}
          type="password"
          placeholder="Super Secret Password"
        />
        <input
          className="bg-[#CDD9CE] p-2 rounded-md"
          ref={currentLocationRef}
          type="currentLocation"
          placeholder="Where are you right now?"
        />
        <input
          className="bg-[#CDD9CE] p-2 rounded-md"
          ref={pfpRef}
          type="profilePicture"
          placeholder="Profile Picture (URL)"
        />
        <button
          className="rounded-md bg-[#1D3557] text-[#F1FAEE]"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
