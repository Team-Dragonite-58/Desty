import React from 'react';
import { useState, useEffect } from 'react';

export default function UserInfo() {
  const [currentLocation, setCurrentLocation] = useState('Orange County, CA');
  const [displayName, setDisplayName] = useState('Justin Wong');
  const [userName, setUserName] = useState('garrettwoogs');

  const getUser = async () => {
    try {
      const response = await fetch('/placeholder');
    } catch (error) {
      console.log('problem with getUser get request');
      console.log(error);
    }
  };

  const changeName = async (e) => {
    e.preventDefault();
    try {
      const settings = {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: 'placeholder',
          newUser: 'placeholder',
        }),
      };
      const data = await fetch('/placeholder', settings);
    } catch (e) {
      console.log('Problem with changeName patch request');
      console.log(e.message);
    }
  };

  return (
    <div className="flex justify-between h-80 items-center w-9/12 px-20">
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
