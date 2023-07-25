import React from 'react';
import Popup from 'reactjs-popup';
import CardPopup from './cardPopup';

export default function LocationCard() {
  return (
    <Popup
      trigger={
        <div className="bg-[#F1FAEE] rounded-lg">
          <img
            className="rounded-lg"
            src="https://lp-cms-production.imgix.net/2019-06/09a64fea2933f6da77ab07d671d1f678-south-korea.jpg"
            alt="pic of korea"
          />
          <p>South Korea</p>
        </div>
      }
      //   position="right center"
        modal
      >
      <CardPopup />
    </Popup>
  );
}
