import React from 'react';
import Popup from 'reactjs-popup';
import CardPopup from './cardPopup';

export default function LocationCard() {
  return (
    <Popup
      trigger={
        <div className="bg-[#457B9D] rounded-lg" >
          <img
            className="rounded-t-lg h-72"
            src="https://lp-cms-production.imgix.net/2019-06/09a64fea2933f6da77ab07d671d1f678-south-korea.jpg"
            alt="pic of korea"
            id='locationcard'
          />
          <p className='h-24 flex items-center justify-center text-[#F1FAEE] text-3xl'>South Korea</p>
        </div>
      }
      modal
      >
      <CardPopup />
    </Popup>
  );
}
