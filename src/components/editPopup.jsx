import React from 'react';
import { useState, useEffect, useRef } from 'react';

export default function EditPopup({ setDisplayName, userId, displayName  }) {
  const displayNameRef = useRef();

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
          displayName: displayNameRef.current.value,
        }),
      };
      const data = await fetch('http://localhost:3001/userinfo/displayname', settings);
      const response = await data.json();
      setDisplayName(displayNameRef.current.value);
      //utilize setDisplayName
    } catch (e) {
      console.log('Problem with editing display name patch request');
      console.log(e.message);
    }
  };

  return (
    <div className="bg-[#F1FAEE] flex flex-col items-center p-5 gap-5 rounded-lg">
      Change Display Name
      <form className="flex flex-col gap-2" onSubmit={edit}>
        <input
          className="bg-[#CDD9CE] p-2 rounded-md"
          ref={displayNameRef}
          type="Display"
          placeholder="Change your name to?"
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
