import React from 'react';
import { useState, useEffect, useRef } from 'react';

export default function LoginPopup({setDisplayName}) {
  const usernameRef = useRef()
  const passwordRef = useRef()


  const login = async (e) => {
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
          pass: usernameRef.current.value,
        }),
      };
      const data = await fetch('/placeholder', settings);
      //utilize setDisplayName
    } catch (e) {
      console.log('Problem with login post request');
      console.log(e.message);
    }
  };

  return (
    <div>
      LoginPopup
      <form onSubmit={login}>  
        <input ref={usernameRef} type= 'userName' placeholder='Username' />
        <br></br>
        <input ref={passwordRef} type='password' placeholder='Super Secret Password' />
        <br></br>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}