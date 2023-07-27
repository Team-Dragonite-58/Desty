import React from 'react';
import Popup from 'reactjs-popup';
import CardPopup from './cardPopup';

export default function LocationCard(response, setFeedElements, feedElements, tag) {
  const locationId = response.location_id;
  const userId = response.user_id;
  const userTag = tag;
  // console.log('tag param', tag)
  // console.log('front end tag', userTag)
  const handleClick = async (e) => {
    // console.log('response: ', response)
    e.preventDefault();
    try {
      const settings = {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location_id: locationId,
          id: userId,
          tag: userTag
        }),
      };
      const data = await fetch('http://localhost:3001/location/delete', settings);
      const response = await data.json();
      // console.log('delete response',response);
        const locations = response.map((location) => {
          return new LocationCard(location, setFeedElements, feedElements, tag)
        });
        // const locations = [...feedElements]
        // locations.push(new LocationCard(response, setFeedElements, feedElements));
        setFeedElements(locations)
      //use setFeedElements here
      
    } catch (e) {
      console.log('Problem with card delete request');
      console.log(e.message);
    }
  }

  const color = {
    Undecided: '#457B9D',
    Upcoming: '#E63946',
    Visited: '#1D3557',
  };

  const setColor = color[response.tag];
  // console.log('response', response);
  // console.log('response.location_url', response.location_url)
  return (
    <>
      <div className={`bg-[${setColor}] rounded-lg`}>
        <button className='absolute w-8 h-8 p-2 opacity-75' onClick={(e) => handleClick(e)} ><img src={require('../assets/x-mark-32.png')} alt="delete button" /></button>
        <Popup
          trigger={
            <div>
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
          <CardPopup locationUrl={response.location_url} locationName={response.location_name} color={setColor}/>
        </Popup>
      </div>
    </>
  );
}
