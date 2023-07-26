import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import LoginPopup from './loginPopup';
import SignupPopup from './signupPopup';

export default function Navbar({
  setCurrentLocation,
  setDisplayName,
  setUserName,
  setID,
  setProfilePic,
  userName,
}) {
  // if (userName) {
  //   const loginButton = document.getElementById('loginButton');
  //   const signupButton = document.getElementById('signupButton')
  //   const loginSignup = document.getElementById('loginsignup')
  //   const logoutButton = document.getElementById('logout');
  //   loginSignup.setAttribute('hidden', 'true');
  //   loginButton.setAttribute('hidden', 'true');
  //   signupButton.setAttribute('hidden', 'true');
  //   logoutButton.removeAttribute('hidden');
  // }

  return (
    <div className="w-3/4 flex justify-center mt-5 pb-5 border-b border-b-[#F1FAEE] ">
      <nav className="flex justify-between w-90p">
        <div className="text-3xl " id="logo">
          DESTY
        </div>

        {userName && (
          <div id="logout">
            <button
              onClick={() => window.location.reload()}
              className="bg-[#F1FAEE] p-2 mr-1 rounded-lg"
            >
              Log Out
            </button>
          </div>
        )}
        {!userName && (
          <div>
            <div id="loginsignup" className="flex justify-between">
              <Popup
                trigger={
                  <button
                    id="loginButton"
                    className="bg-[#F1FAEE] p-2 mr-1 rounded-lg"
                  >
                    Log In
                  </button>
                }
                modal
              >
                <LoginPopup
                  setID={setID}
                  setDisplayName={setDisplayName}
                  setCurrentLocation={setCurrentLocation}
                  setUserName={setUserName}
                  setProfilePic={setProfilePic}
                ></LoginPopup>
              </Popup>
              <div className="p-2 ml-1">
                <Popup
                  trigger={<button id="signupButton">Sign Up</button>}
                  modal
                >
                  <SignupPopup
                    setID={setID}
                    setDisplayName={setDisplayName}
                    setCurrentLocation={setCurrentLocation}
                    setUserName={setUserName}
                    setProfilePic={setProfilePic}
                  ></SignupPopup>
                </Popup>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
