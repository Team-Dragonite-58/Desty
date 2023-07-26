import React from 'react';
import { useState, useEffect, useRef } from 'react';

export default function SignupPopup({setDisplayName}) {
  const usernameRef = useRef()
  const displayNameRef = useRef()
  const passwordRef = useRef()
  const currentLocationRef = useRef()

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
          current_location: currentLocationRef.current.value
        }),
      };
      const data = await fetch('/placeholder', settings);
      //utilize setDisplayName
    } catch (e) {
      console.log('Problem with signUp post request');
      console.log(e.message);
    }
  };
  return (
    <div>
      SignupPopup
      <form onSubmit={signUp}>  
        <input ref={usernameRef} type= 'userName' placeholder='Username' />
        <br></br>
        <input ref={displayNameRef} type='displayName' placeholder='Display Name' />
        <br></br>
        <input ref={passwordRef} type='password' placeholder='Super Secret Password' />
        <br></br>
        <input ref={currentLocationRef} type='currentLocation' placeholder='Where are you right now?' />
        <br></br>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}