import React from 'react';
import { useState, useEffect, useRef } from 'react';

export default function SignupPopup() {
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
          user: 'placeholder',
          pass: 'placeholder',
          displayName: 'placeholder'
        }),
      };
      const data = await fetch('/placeholder', settings);
    } catch (e) {
      console.log('Problem with signUp post request');
      console.log(e.message);
    }
  };
  return (
    <div>
      SignupPopup
    </div>
  )
}