import React from 'react';
import { useState, useEffect, useRef } from 'react';

export default function AddLocationPopup({ tag, setFeedElements }) {
  const locationNameRef = useRef();
  const locationURLRef = useRef();
  const locationTagRef = useRef();
  //tag comes from the feed element

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
          location: locationNameRef.current.value,
          photo_url: locationURLRef.current.value,
          tag: locationTagRef.current.value,
        }),
      };
      const data = await fetch('/placeholder', settings);
      //use setFeedElements here
    } catch (e) {
      console.log('Problem with addLocation post request');
      console.log(e.message);
    }
  };
  return (
    <div className="bg-[#F1FAEE] flex flex-col items-center p-5 gap-5 rounded-lg">
      Add new location
      <form className="flex flex-col gap-5" onSubmit={addLocation}>
        <input
          className="bg-[#CDD9CE] p-2 rounded-md"
          ref={locationNameRef}
          type="userName"
          placeholder="Location Name"
          required
        />
        <input
          className="bg-[#CDD9CE] p-2 rounded-md"
          ref={locationURLRef}
          type="password"
          placeholder="Location Photo URL"
          required
        />
        <select
          className="bg-[#CDD9CE] p-2 rounded-md"
          name="Location Tag"
          id="cardtag"
          required
        >
          <option value="" disabled selected hidden>
            Choose the status
          </option>
          <option value="Undecided">Undecided</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Undecided">Upcoming</option>
        </select>
        <button
          className="rounded-md bg-[#1D3557] text-[#F1FAEE]"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
}
