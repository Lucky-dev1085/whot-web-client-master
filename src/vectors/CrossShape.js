import React from 'react';

const CrossShape = () => (
  <svg
    width="62px"
    height="62px"
    viewBox="0 0 62 62"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <circle id="Cuerb345Hxc" cx="25" cy="25" r="25"></circle>
      <filter
        x="-21.0%"
        y="-15.0%"
        width="142.0%"
        height="142.0%"
        filterUnits="objectBoundingBox"
        id="Fger34VGfm2"
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
          values="0 0 0 0 0.37254902   0 0 0 0 0.607843137   0 0 0 0 0.545098039  0 0 0 0.337139423 0"
          type="matrix"
          in="shadowBlurOuter1"
        ></feColorMatrix>
      </filter>
    </defs>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-190.000000, -759.000000)">
        <g transform="translate(81.000000, 762.000000)">
          <g transform="translate(115.000000, 0.000000)">
            <g>
              <use
                fill="black"
                fillOpacity="1"
                filter="url(#Fger34VGfm2)"
                xlinkHref="#Cuerb345Hxc"
              ></use>
              <use
                fill="#5F9B8B"
                fillRule="evenodd"
                xlinkHref="#Cuerb345Hxc"
              ></use>
            </g>
            <g transform="translate(12.000000, 12.000000)" fill="#FFFFFF">
              <rect x="0" y="9" width="26" height="9"></rect>
              <rect
                transform="translate(13.000000, 13.500000) rotate(-270.000000) translate(-13.000000, -13.500000) "
                x="0"
                y="9"
                width="26"
                height="9"
              ></rect>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default CrossShape;
