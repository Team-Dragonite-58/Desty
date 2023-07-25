import React from 'react';

export default function Footer() {
  const redirectLinks = (url) => {
    window.open(url, '_blank');
  };
  return (
    <div class="flex justify-evenly items-center h-24 text-[#F1FAEE]">
      <div onClick={() => redirectLinks('')} class="cursor-pointer">
        Privacy Policy
      </div>
      <div onClick={() => redirectLinks('')} class="cursor-pointer">
        Contact
      </div>
      <div
        onClick={() =>
          redirectLinks('https://github.com/Team-Dragonite-58/dragonite_travel')
        }
        class="cursor-pointer"
      >
        GitHub
      </div>
    </div>
  );
}
