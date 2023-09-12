import React from 'react';
import { useState, useEffect, useRef } from 'react';

export default function EditLocationPopup({ setCurrentLocation, currentLocation, userId }) {
  const currentLocationRef = useRef();

  const edit = async (e) => {
    e.preventDefault();
    try {
      const settings = {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userId,
          current_location: currentLocationRef.current.value,
        }),
      };
      const data = await fetch('http://localhost:3000/userinfo/currentlocation', settings);
      const response = await data.json();
      setCurrentLocation(currentLocationRef.current.value)
      //utilize setDisplayName
    } catch (e) {
      console.log('Problem with editing location patch request');
      console.log(e.message);
    }
  };

  return (
    <div className="bg-[#F1FAEE] flex flex-col items-center p-5 gap-5 rounded-lg">
      Change Current Location
      <form className="flex flex-col gap-2" onSubmit={edit}>
        <input
          className="bg-[#CDD9CE] p-2 rounded-md"
          ref={currentLocationRef}
          type="CurrentLocation"
          placeholder="Where are you?"
        />
        <button
          className="rounded-md bg-[#1D3557] text-[#F1FAEE]"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
