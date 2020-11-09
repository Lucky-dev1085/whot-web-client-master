import React from 'react';

const TargetIcon = props => (
  <svg
    {...props}
    width="69px"
    height="69px"
    viewBox="0 0 69 69"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <circle id="CPgdfTFDcsd" cx="18.5" cy="18.5" r="18.5"></circle>
      <filter
        x="-75.7%"
        y="-54.1%"
        width="251.4%"
        height="251.4%"
        filterUnits="objectBoundingBox"
        id="FnbdferuXs3f"
      >
        <feOffset
          dx="0"
          dy="8"
          in="SourceAlpha"
          result="shadowOffsetOuter1"
        ></feOffset>
        <feGaussianBlur
          stdDeviation="8"
          in="shadowOffsetOuter1"
          result="shadowBlurOuter1"
        ></feGaussianBlur>
        <feColorMatrix
          values="0 0 0 0 0.262745098   0 0 0 0 0.203921569   0 0 0 0 0.270588235  0 0 0 0.169908217 0"
          type="matrix"
          in="shadowBlurOuter1"
        ></feColorMatrix>
      </filter>
    </defs>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-61.000000, -1124.000000)">
        <g transform="translate(77.000000, 1132.000000)">
          <mask id="Mf5Ny548" fill="white">
            <use xlinkHref="#CPgdfTFDcsd"></use>
          </mask>
          <g>
            <use
              fill="black"
              fillOpacity="1"
              filter="url(#FnbdferuXs3f)"
              xlinkHref="#CPgdfTFDcsd"
            ></use>
            <use
              fill="#FFFFFF"
              fillRule="evenodd"
              xlinkHref="#CPgdfTFDcsd"
            ></use>
          </g>
          <g mask="url(#Mf5Ny548)">
            <g transform="translate(-3.000000, 0.000000)">
              <ellipse
                fill="#CF394E"
                cx="21.1137232"
                cy="18.5"
                rx="6.75984327"
                ry="6.81578947"
              ></ellipse>
              <g
                id="Group"
                strokeWidth="1"
                fill="none"
                transform="translate(21.500000, 18.889474) rotate(-90.000000) translate(-21.500000, -18.889474) translate(17.057817, -2.336842)"
              ></g>
              <g
                id="Group"
                strokeWidth="1"
                fill="none"
                transform="translate(21.095503, 18.474561) rotate(-45.000000) translate(-21.095503, -18.474561) translate(16.646032, -2.836794)"
              ></g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default TargetIcon;
