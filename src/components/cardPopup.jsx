import React from 'react';
import { useState, useEffect } from 'react';

export default function CardPopup() {
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      {isOpen && (
        <div
          className="border-2 border-indigo-500/100 flex justify-center items-center w-screen h-screen"
          onClick={() => {
            handleClose();
          }}
        >
          <div className="w-9/12 h-3/6 bg-[#F1FAEE]">
            <h1>CardPopup</h1>
          </div>
        </div>
      )}
    </>
  )
}
