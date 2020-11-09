import React from 'react';
import PropTypes from 'prop-types';

const CircleClock = ({ background }) => (
  <svg
    width="26px"
    height="26px"
    viewBox="0 0 26 26"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g fill={background}>
        <circle cx="13" cy="13" r="13"></circle>
      </g>
      <g transform="translate(5.000000, 5.000000)">
        <g>
          <g>
            <circle
              fill="#FFFFFF"
              fillRule="nonzero"
              cx="7.60180995"
              cy="7.60180995"
              r="7.60180995"
            ></circle>
            <path
              d="M7.59457014,4.15565611 L7.59457014,7.44977376"
              stroke="#F1B77D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M7.59457014,7.44977376 L10.8886878,9.80271493"
              stroke="#F1B77D"
              strokeWidth="2"
              opacity="0.59"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

CircleClock.propTypes = {
  background: PropTypes.string
};

CircleClock.defaultProps = {
  background: '#F1B77D'
};

export default CircleClock;
