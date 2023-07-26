import React from 'react';

export default function Navbar() {
  return (
    <div className="w-3/4 flex justify-center mt-5 pb-5 border-b border-b-[#F1FAEE] ">
      <nav className="flex justify-between w-90p">
        <div className="text-3xl " id="logo">
          DESTY
        </div>
        <div className="flex justify-between">
          <div className="bg-[#F1FAEE] p-2 mr-1 rounded-lg">
            <a href="">Log In</a>
          </div>
          <div className="p-2 ml-1">
            <a href="">Sign Up</a>
          </div>
        </div>
      </nav>
    </div>
  );
}
