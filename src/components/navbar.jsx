import React from 'react';
import Popup from 'reactjs-popup';
import LoginPopup from './loginPopup';
import SignupPopup from './signupPopup';

export default function Navbar() {
  return (
    <div className="w-3/4 flex justify-center mt-5 pb-5 border-b border-b-[#F1FAEE] ">
      <nav className="flex justify-between w-90p">
        <div className="text-3xl " id="logo">
          DESTY
        </div>
        <div className="flex justify-between">
          <Popup
            trigger={
              <button className="bg-[#F1FAEE] p-2 mr-1 rounded-lg">
                Log In
              </button>
            }
            modal
          >
            <LoginPopup></LoginPopup>
          </Popup>
          <div className="p-2 ml-1">
            <Popup trigger={<button>Sign Up</button>} modal>
              <SignupPopup></SignupPopup>
            </Popup>
          </div>
        </div>
      </nav>
    </div>
  );
}
