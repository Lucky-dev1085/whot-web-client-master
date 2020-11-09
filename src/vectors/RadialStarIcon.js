import React from 'react';

const RadialStarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="46"
    height="46"
    viewBox="0 0 46 46"
  >
    <defs>
      <linearGradient id="a" x1="50%" x2="50%" y1="0%" y2="119.483%">
        <stop offset="0%" stopColor="#FF7C8E"></stop>
        <stop offset="100%" stopColor="#D15F6F"></stop>
      </linearGradient>
    </defs>
    <g
      fill="none"
      fillRule="evenodd"
      stroke="none"
      strokeWidth="1"
      transform="translate(-337 -55) translate(337 55)"
    >
      <circle cx="23" cy="23" r="23" fill="url(#a)" opacity="0.189"></circle>
      <circle cx="23" cy="23" r="15" fill="url(#a)"></circle>
      <path
        fill="#FFF"
        d="M23 28.5L17.7099327 31.2811529 18.7202457 25.3905765 14.4404914 21.2188471 20.3549664 20.3594235 23 15 25.6450336 20.3594235 31.5595086 21.2188471 27.2797543 25.3905765 28.2900673 31.2811529z"
      ></path>
    </g>
  </svg>
);

export default RadialStarIcon;
