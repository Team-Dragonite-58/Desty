import React from 'react';
import { useState, useEffect, useRef } from 'react';

export default function LoginPopup() {

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
          user: 'placeholder',
          displayName: 'placeholder',
          pass: 'placeholder',
        }),
      };
      const data = await fetch('/placeholder', settings);
    } catch (e) {
      console.log('Problem with login post request');
      console.log(e.message);
    }
  };

  return (
    <div>
      LoginPopup
    </div>
  )
}