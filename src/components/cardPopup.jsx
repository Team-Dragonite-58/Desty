import React from 'react';
import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';

export default function CardPopup() {
  // need a poast request here to create a new item
  return (
    <div className="flex justify-center items-center rounded-xl">
      <div className="fixed w-1/2 h-3/4 bg-[#F1FAEE] rounded-xl flex">
        <div className="flex w-1/2">
          <img
            id="cardphoto"
            className="w-fit rounded-l-xl"
            src="https://lp-cms-production.imgix.net/2019-06/09a64fea2933f6da77ab07d671d1f678-south-korea.jpg"
            alt="pic of korea"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-between">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between border-b border-b-[#A8DADC] p-5">
              <div className="text-4xl">South Korea</div>
              <Popup
                trigger={
                  <button className="w-10 h-10 rounded-full bg-[#457B9D]"></button>
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
            <ul>
              <li className="flex justify-between items-center border-b border-b-[#A8DADC] p-5">
                <button>
                  <img
                    src={require('../assets/editbutton.png')}
                    alt="pencil in a box"
                  />
                </button>
                <p>We poppin bottles in the club</p>
                <button>
                  <img
                    className="max-w-5 max-h-10"
                    src={require('../assets/deletebin.png')}
                    alt="trash bin"
                  />
                </button>
              </li>
            </ul>
          </div>
          <form className="flex  items-center justify-center">
            <input
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
