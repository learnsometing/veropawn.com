import React from 'react';
import PropTypes from 'prop-types';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { IconContext } from 'react-icons';

import controls from './controls.module.css';
import layout from '../../styles/layout.module.css';

export const SlideControl = ({ children, isFullScreen, name, onClick }) => (
  <button
    className={`${layout.columnCenterCenter} ${controls.control}`}
    name={name}
    onClick={onClick}
    style={isFullScreen ? { backgroundColor: 'hsla(255, 255%, 255%, 0.8)' } : undefined}
  >
    {children}
  </button >
);

SlideControl.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
  ]),
  isFullScreen: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default function Controls({ isDisabled, isFullScreen, onClick }) {
  // Returns null if isDisabled or buttons to move the controls slides
  if (isDisabled) {
    return null;
  }

  return (
    <IconContext.Provider
      value={{
        color: isFullScreen ? 'hsla(0, 0%, 0%, 0.8)' : 'hsla(255, 255%, 255%, 0.8)',
        size: '1.5em'
      }}
    >
      <div className={`${layout.rowSpaceBtnCenter} ${controls.controlsWrapper}`}>
        <SlideControl
          isFullScreen={isFullScreen}
          name="prev"
          onClick={onClick}
        >
          <FaAngleLeft data-testid="fa-angle-left-icon" />
        </SlideControl>
        <SlideControl
          isFullScreen={isFullScreen}
          name="next"
          onClick={onClick}
        >
          <FaAngleRight data-testid="fa-angle-right-icon" />
        </SlideControl>
      </div>
    </IconContext.Provider>
  );
}