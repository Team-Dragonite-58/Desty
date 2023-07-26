import React from 'react';
import LocationCard from './locationcard';
import AddLocationPopup from './addCardPopup';
import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';

export default function Feed() {
  const [feedElements, setFeedElements] = useState([]);
  const [tag, setTag] = useState('all');

  useEffect(() => {
    const getLocations = async () => {
      try {
        const settings = {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tag,
          }),
        };
        const response = await fetch('/placeholder', settings);
        //use setFeedElements here
      } catch (error) {
        console.log('problem with getLocations get request');
        console.log(error);
      }
    };
    getLocations();
  }, [tag]);

  useEffect(() => {
    //logic for constructing each location card
  }, [feedElements]);

  //object from backend type: all, undecided, upcoming and visited
  //[visited] [upcoming] [undecided] [all]
  //4 states where one will be true at a time
  //(upcoming && react compoenent)
  //

  return (
    <div className="border-b border-t border-b-[#F1FAEE] h-fit pb-16">
      <div className="grid grid-cols-4 text-[#F1FAEE]">
        <button
          onClick={() => setTag('all')}
          className="focus:border-t-2 border-t-[#F1FAEE]"
        >
          <div className="p-5">All</div>
        </button>
        <button
          onClick={() => setTag('undecided')}
          className="focus:border-t-2 border-t-[#457B9D]"
        >
          <div className="p-5">Undecided</div>
        </button>
        <button
          onClick={() => setTag('upcoming')}
          className="focus:border-t-2 border-t-[#E63946]"
        >
          <div className="p-5">Upcoming</div>
        </button>
        <button
          onClick={() => setTag('visited')}
          className="focus:border-t-2 border-t-[#1D3557]"
        >
          <div className="p-5">Visited</div>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-5">
        <LocationCard />
        <Popup
          trigger={
            <button className="border border-[#F1FAEE] border-solid text-7xl text-[#F1FAEE]">
              +
            </button>
          }
          modal
        >
          <AddLocationPopup />
        </Popup>
      </div>
    </div>
  );
}
