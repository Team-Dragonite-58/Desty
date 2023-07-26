import React from 'react';
import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';

export default function CardPopup(locationUrl) {
  // need a poast request here to create a new item
  const [listItems, setListItems] = useState([]);

  // useEffect(() => {
  //   const storedListItems = window.localStorage.getItem('listItems');
  //   if (storedListItems) {
  //     setListItems(JSON.parse(storedListItems));
  //   }
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem('listItems', JSON.stringify(listItems));
  // }, [listItems]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItemDescription = e.target.elements.newItem.value;

    // Step 1: Create a new object representing the structure of a list item
    const newItem = (
      <li
        key={newItemDescription} // Use a unique key for the new item
        className="flex justify-between items-center border-b border-b-[#A8DADC] p-5"
      >
        <button>
          <img
            src={require('../assets/editbutton.png')}
            alt="pencil in a box"
          />
        </button>
        <p>{newItemDescription}</p>
        <button onClick={(e) => handleDelete(e, newItemDescription)}>
          <img
            className="max-w-5 max-h-10"
            src={require('../assets/deletebin.png')}
            alt="trash bin"
          />
        </button>
      </li>
    );

    // Step 2: Update the state with the new list item
    setListItems([...listItems, newItem]);
    e.target.reset();
  };

  const handleDelete = (e, key) => {
    e.preventDefault();
    setListItems((prevListItems) =>
      prevListItems.filter((item) => item.key !== key)
    );
  };

  return (
    <div className="flex justify-center items-center rounded-xl">
      <div className="fixed w-1/2 h-3/4 bg-[#F1FAEE] rounded-xl flex">
        <div className="flex w-1/2">
          <img
            id="cardphoto"
            className="w-fit rounded-l-xl"
            src={locationUrl.locationUrl}
            alt="pic of location"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-between">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between border-b border-b-[#A8DADC] p-5">
              <div className="text-4xl">{locationUrl.locationName}</div>
              <Popup
                trigger={
                  <button
                    className={`w-10 h-10 rounded-full bg-[${locationUrl.color}]`}
                  ></button>
                }
                position="bottom center"
                arrow={false}
              >
                {() => (
                  <div className="flex flex-col text-[#F1FAEE] gap-1">
                    <button
                      type="button"
                      className="w-24 h-10 rounded-md bg-[#457B9D]"
                    >
                      Undecided
                    </button>
                    <button
                      type="button"
                      className="w-24 h-10 rounded-md bg-[#E63946]"
                    >
                      Upcoming
                    </button>
                    <button
                      type="button"
                      className="w-24 h-10 rounded-md bg-[#1D3557]"
                    >
                      Visited
                    </button>
                  </div>
                )}
              </Popup>
            </div>
            <ul>{listItems}</ul>
          </div>
          <form
            className="flex  items-center justify-center"
            onSubmit={handleSubmit}
          >
            <input
              name="newItem"
              className="w-full bg-[#CDD9CE] p-2 m-5 rounded-md"
              type="text"
              placeholder="Add a line..."
            />
          </form>
        </div>
      </div>
    </div>
  );
}
