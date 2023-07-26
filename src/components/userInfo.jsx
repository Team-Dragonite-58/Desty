import React from 'react';
import { useState, useEffect } from 'react';

export default function UserInfo() {
  const [currentLocation, setCurrentLocation] = useState('Orange County, CA');
  const [displayName, setDisplayName] = useState('Justin Wong');
  const [userName, setUserName] = useState('garrettwoogs');
  

  useEffect(()=>{
    const getUser = async () => {
      try {
        const response = await fetch('/placeholder'); //uses cookie to get user information
        //display name, userName, and currentLocation are gotten here
      } catch (error) {
        console.log('problem with getUser get request');
        console.log(error);
      }
    };
    getUser()
  }, [])

  return (
    <div className="flex justify-between h-80 items-center px-20">
      <div className="flex items-center gap-10">
        <img
          className="h-52 w-52 rounded-full"
          src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
          alt="sumthin bruh"
        />
        <div>
          <h1 className="text-6xl">{displayName}</h1>
          <h3 className="text-2xl">@{userName}</h3>
        </div>
        <div>
          <button>
            <img
              src={require('../assets/editbutton.png')}
              alt="A pencil in a box"
            />
          </button>
        </div>
      </div>
      <button className="border-solid border border-[#F1FAEE] rounded p-2">
        📍{currentLocation}
      </button>
    </div>
  );
}
