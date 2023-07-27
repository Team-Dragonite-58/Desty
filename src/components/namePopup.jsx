import React from 'react';
import { useState, useEffect, useRef } from 'react';

export default function NamePopup({ setDisplayName }) {
  const usernameRef = useRef()
  const newNameRef = useRef()

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
          user: usernameRef.current.value,
          newUser: newNameRef.current.value,
        }),
      };
      const data = await fetch('/placeholder', settings);
      //setDisplayName is used here
    } catch (e) {
      console.log('Problem with changeName patch request');
      console.log(e.message);
    }
  };

  return (


    <div>
      NamePopup
      <form onSubmit={changeName}>
        <input ref={usernameRef} type='userName' placeholder='Username' />
        <br></br>
        <input ref={newNameRef} type='newUsername' placeholder='New username' />
        <br></br>
        <button type='submit'>Change User Name</button>
      </form>
    </div>
  )
}