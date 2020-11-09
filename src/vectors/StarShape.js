import React from 'react';

const StarShape = () => (
  <svg
    width="62px"
    height="62px"
    viewBox="0 0 62 62"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <circle id="Che346vFCdw" cx="25" cy="25" r="25"></circle>
      <filter
        x="-21.0%"
        y="-15.0%"
        width="142.0%"
        height="142.0%"
        filterUnits="objectBoundingBox"
        id="Fh457bsVsd"
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
          values="0 0 0 0 0.945098039   0 0 0 0 0.717647059   0 0 0 0 0.490196078  0 0 0 0.200939685 0"
          type="matrix"
          in="shadowBlurOuter1"
        ></feColorMatrix>
      </filter>
    </defs>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-313.000000, -759.000000)">
        <g transform="translate(81.000000, 762.000000)">
          <g transform="translate(238.000000, 0.000000)">
            <g>
              <use
                fill="black"
                fillOpacity="1"
                filter="url(#Fh457bsVsd)"
                xlinkHref="#Che346vFCdw"
              ></use>
              <use
                fill="#F1B77D"
                fillRule="evenodd"
                xlinkHref="#Che346vFCdw"
              ></use>
            </g>
            <polygon
              fill="#FFFFFF"
              points="24.5 31.75 17.1526843 35.6127124 18.5558968 27.4313562 12.6117935 21.6372876 20.8263422 20.4436438 24.5 13 28.1736578 20.4436438 36.3882065 21.6372876 30.4441032 27.4313562 31.8473157 35.6127124"
            ></polygon>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default StarShape;
