import React from 'react';

const RadialTrophyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="62"
    height="62"
    viewBox="0 0 62 62"
  >
    <g
      fill="none"
      fillRule="evenodd"
      stroke="none"
      strokeWidth="1"
      transform="translate(-328 -57) translate(172 38) translate(156 19)"
    >
      <circle cx="31" cy="31" r="23" fill="#F1B77D" opacity="0.475"></circle>
      <circle cx="31" cy="31" r="31" fill="#F1B77D" opacity="0.129"></circle>
      <circle cx="31" cy="31" r="15" fill="#F1B77D"></circle>
      <g transform="translate(18 19)">
        <circle
          cx="13"
          cy="13"
          r="13"
          fill="#F1B77D"
          fillRule="evenodd"
        ></circle>
        <path
          fill="#FFF"
          fillRule="nonzero"
          d="M14 18L12 18 12.3516484 16.96875 12.6373626 16 13.3626374 16 13.6703297 16.96875z"
        ></path>
        <path
          fill="#FFF"
          fillRule="nonzero"
          d="M16.376 18H9.68c-.355 0-.679.307-.679.716V21h7.991v-2.284c.065-.41-.226-.716-.615-.716zM7 6v3.839c0 3.596 2.385 6.847 6 8.161 3.615-1.28 6-4.53 6-8.127V6H7zm7.846 8L13 12.578 11.154 14l.692-2.289L10 10.289h2.275L13 8l.725 2.289H16l-1.846 1.422.692 2.289z"
        ></path>
      </g>
    </g>
  </svg>
);

export default RadialTrophyIcon;
