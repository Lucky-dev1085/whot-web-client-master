import React from 'react';

const SquareShape = () => (
  <svg
    width="62px"
    height="62px"
    viewBox="0 0 62 62"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <circle id="Cdgh56CdsXL" cx="25" cy="25" r="25"></circle>
      <filter
        x="-21.0%"
        y="-15.0%"
        width="142.0%"
        height="142.0%"
        filterUnits="objectBoundingBox"
        id="Fvsr13B7"
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
          values="0 0 0 0 0.811764706   0 0 0 0 0.223529412   0 0 0 0 0.305882353  0 0 0 0.19217111 0"
          type="matrix"
          in="shadowBlurOuter1"
        ></feColorMatrix>
      </filter>
    </defs>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-75.000000, -759.000000)">
        <g transform="translate(81.000000, 762.000000)">
          <g>
            <g>
              <g>
                <use
                  fill="black"
                  fillOpacity="1"
                  filter="url(#Fvsr13B7)"
                  xlinkHref="#Cdgh56CdsXL"
                ></use>
                <use
                  fill="#CF394E"
                  fillRule="evenodd"
                  xlinkHref="#Cdgh56CdsXL"
                ></use>
              </g>
              <rect fill="#FFFFFF" x="12" y="15" width="26" height="21"></rect>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default SquareShape;
