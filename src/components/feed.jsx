import React from 'react';
import LocationCard from './locationcard';
import { useState, useEffect } from 'react';

export default function Feed() {
  const [feedElements, setFeedElements] = useState([]);

  const getLocations = async () => {
    try {
      const response = await fetch('/placeholder');
    } catch (error) {
      console.log('problem with getLocations get request');
      console.log(error);
    }
  };
  //object from backend type: all, undecided, upcoming and visited
  //[visited] [upcoming] [undecided] [all]
  //4 states where one will be true at a time
  //(upcoming && react compoenent)
  //

  const addLocation = async (e) => {
    e.preventDefault();
    try {
      const settings = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location: 'placeholder',
          photo_url: 'placeholder',
        }),
      };
      const data = await fetch('/placeholder', settings);
    } catch (e) {
      console.log('Problem with addLocation post request');
      console.log(e.message);
    }
  };

  return (
    <div className="w-3/4 border-b border-t border-b-[#F1FAEE] h-screen">
      <div className="grid grid-cols-4 text-[#F1FAEE]">
        <button className="focus:border-t-2 border-t-[#F1FAEE]">
          <div className="p-5">All</div>
        </button>
        <button className="focus:border-t-2 border-t-[#457B9D]">
          <div className="p-5">Undecided</div>
        </button>
        <button className="focus:border-t-2 border-t-[#E63946]">
          <div className="p-5">Upcoming</div>
        </button>
        <button className="focus:border-t-2 border-t-[#1D3557]">
          <div className="p-5">Visited</div>
        </button>
      </div>
      <div className="grid grid-cols-3">
        <div>
          <LocationCard />
        </div>
        <LocationCard />
        <LocationCard />
        <button className="h-1/3screen border border-[#F1FAEE] border-solid text-[#F1FAEE]">
          +
        </button>
      </div>
    </div>
  );
}
