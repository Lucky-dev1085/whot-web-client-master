import React from 'react';

const RadialProgress = () => (
  <svg viewBox="0 0 162 162" width="162" height="162">
    <circle
      stroke="#F3F3F3"
      strokeWidth="6"
      fill="none"
      cx="81"
      cy="81"
      r="75"
    />
    <circle
      stroke="#FC5679"
      strokeWidth="6"
      strokeDasharray="471, 471"
      strokeLinecap="round"
      fill="none"
      cx="81"
      cy="81"
      r="75"
      transform="rotate(-90)"
    />
  </svg>
);

export default RadialProgress;
