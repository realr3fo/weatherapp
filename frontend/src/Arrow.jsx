import React from 'react';
import PropTypes from 'prop-types';

const Arrow = ({ degree }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    style={{ transform: `rotate(${degree}deg)` }}
    className="wind-arrow"
  >
    <polyline points="25,10 25,40" stroke="black" strokeWidth="2" fill="none" />
    <polyline points="20,35 25,40 30,35" stroke="black" strokeWidth="2" fill="none" />
  </svg>
);

Arrow.propTypes = {
  degree: PropTypes.number.isRequired,
};

export default Arrow;
