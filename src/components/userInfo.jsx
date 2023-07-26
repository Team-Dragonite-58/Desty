import React from 'react';
import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import EditPopup from './editPopup';
import EditLocationPopup from './editLocationPopup';

export default function UserInfo({displayName, userName, currentLocation, profilePic}) {

  return (
    <div className="flex justify-between h-80 items-center px-20">
      <div className="flex items-center gap-10">
        <img
          className="h-52 w-52 rounded-full"
          src={profilePic}
          alt="sumthin bruh"
        />
        <div>
          <h1 className="text-6xl">{displayName}</h1>
          <h3 className="text-2xl">@{userName}</h3>
        </div>
        <div>
          <Popup
            trigger={
              <button>
                <img
                  src={require('../assets/editbutton.png')}
                  alt="A pencil in a box"
                />
              </button>
            }
          >
            <EditPopup></EditPopup>
          </Popup>
        </div>
      </div>
      <Popup
        trigger={
          <button className="border-solid border border-[#F1FAEE] rounded p-2">
            📍{currentLocation}
          </button>
        }
      >
        <EditLocationPopup></EditLocationPopup>
      </Popup>
    </div>
  );
}
