import React from 'react';

const CircleShape = () => (
  <svg
    width="62px"
    height="62px"
    viewBox="0 0 62 62"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <circle id="Cneh4X5CF" cx="25" cy="25" r="25"></circle>
      <filter
        x="-21.0%"
        y="-15.0%"
        width="142.0%"
        height="142.0%"
        filterUnits="objectBoundingBox"
        id="Fvfg3748C"
      >
        <feOffset
          dx="0"
          dy="3"
          in="SourceAlpha"
          result="shadowOffsetOuter1"
        ></feOffset>
        <feGaussianBlur
          stdDeviation="3"
          in="shadowOffsetOuter1"
          result="shadowBlurOuter1"
        ></feGaussianBlur>
        <feColorMatrix
          values="0 0 0 0 0.384313725   0 0 0 0 0.341176471   0 0 0 0 0.349019608  0 0 0 0.229676573 0"
          type="matrix"
          in="shadowBlurOuter1"
        ></feColorMatrix>
      </filter>
    </defs>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-75.000000, -868.000000)">
        <g transform="translate(81.000000, 762.000000)">
          <g transform="translate(0.000000, 109.000000)">
            <g>
              <use
                fill="black"
                fillOpacity="1"
                filter="url(#Fvfg3748C)"
                xlinkHref="#Cneh4X5CF"
              ></use>
              <use
                fill="#625759"
                fillRule="evenodd"
                xlinkHref="#Cneh4X5CF"
              ></use>
            </g>
            <circle fill="#FFFFFF" cx="25" cy="25" r="13"></circle>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default CircleShape;
