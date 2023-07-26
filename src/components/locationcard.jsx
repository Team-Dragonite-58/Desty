import React from 'react';
import Popup from 'reactjs-popup';
import CardPopup from './cardPopup';

export default function LocationCard(response) {
  const color = {
    Undecided: '#457B9D',
    Upcoming: '#E63946',
    Visited: '#1D3557',
  };
  console.log('response', response);
  console.log('response.location_url', response.location_url)
  return (
    <Popup
      trigger={
        <div className={`bg-[${color[response.tag]}] rounded-lg`}>
          <img
            className="rounded-t-lg h-72"
            src={response.location_url}
            id="locationcard"
            alt="sumwhere"
          />
          <p className="h-24 flex items-center justify-center text-[#F1FAEE] text-3xl">
            {response.location_name}
          </p>
        </div>
      }
      modal
      lockScroll
    >
      <CardPopup />
    </Popup>
  );
}
