import React from 'react';

const FeaturedIcon = () => (
  <svg
    width="22px"
    height="22px"
    viewBox="0 0 22 22"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <circle id="Phfdkj73847vbFY" cx="7" cy="7" r="7"></circle>
      <filter
        x="-50.0%"
        y="-35.7%"
        width="200.0%"
        height="200.0%"
        filterUnits="objectBoundingBox"
        id="Fbhgs5723XC"
      >
        <feOffset
          dx="0"
          dy="2"
          in="SourceAlpha"
          result="shadowOffsetOuter1"
        ></feOffset>
        <feGaussianBlur
          stdDeviation="2"
          in="shadowOffsetOuter1"
          result="shadowBlurOuter1"
        ></feGaussianBlur>
        <feColorMatrix
          values="0 0 0 0 0.37254902   0 0 0 0 0.607843137   0 0 0 0 0.545098039  0 0 0 0.424032998 0"
          type="matrix"
          in="shadowBlurOuter1"
        ></feColorMatrix>
      </filter>
    </defs>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-347.000000, -173.000000)">
        <g transform="translate(351.000000, 175.000000)">
          <g>
            <use
              fill="black"
              fillOpacity="1"
              filter="url(#Fbhgs5723XC)"
              xlinkHref="#Phfdkj73847vbFY"
            ></use>
            <use
              fill="#5F9B8B"
              fillRule="evenodd"
              xlinkHref="#Phfdkj73847vbFY"
            ></use>
          </g>
          <polygon
            fill="#FFFFFF"
            points="7 9 4.64885899 10.236068 5.09788697 7.61803399 3.19577393 5.76393202 5.8244295 5.38196601 7 3 8.1755705 5.38196601 10.8042261 5.76393202 8.90211303 7.61803399 9.35114101 10.236068"
          ></polygon>
        </g>
      </g>
    </g>
  </svg>
);

export default FeaturedIcon;
