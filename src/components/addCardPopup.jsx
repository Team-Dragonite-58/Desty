import React from 'react';
import { useState, useEffect, useRef } from 'react';

export default function AddLocationPopup({ tag, setFeedElements }) {

    const locationNameRef = useRef()
    const locationURLRef = useRef()
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
                    tag
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
        <div>
            add location
            <form onSubmit={addLocation}>
                <input ref={locationNameRef} type='userName' placeholder='location' />
                <br></br>
                <input ref={locationURLRef} type='password' placeholder='Location Photo URL' />
                <br></br>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}
