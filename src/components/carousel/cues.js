import React from 'react';
import PropTypes from 'prop-types';
import { FaDollarSign } from 'react-icons/fa';
import { IconContext } from 'react-icons';

import cues from './cues.module.css';
import layout from '../../styles/layout.module.css';

export function Cue({ isActive, isFullScreen }) {
  var color = getColor(isActive, isFullScreen);

  return (
    <IconContext.Provider
      value={{
        className: cues.cue,
        color: `rgba(${color})`,
      }}
    >
      <FaDollarSign data-testid="carousel-pos-indicator" />
    </IconContext.Provider>
  );

  function getColor(isActive, isFullScreen) {
    let alpha, color;
    if (isActive) {
      alpha = '0.8';
    } else {
      alpha = '0.4';
    }

    if (isFullScreen) {
      color = '255, 255, 255';
    } else {
      color = '0, 0, 0';
    }

    return `${color}, ${alpha}`;
  }
}

Cue.propTypes = {
  isActive: PropTypes.bool.isRequired,
  isFullScreen: PropTypes.bool.isRequired,
};

function Cues({ currentIndex, isFullScreen, length }) {
  var _cues = createCues(length);

  return (
    <div className={`${layout.rowCenterCenter} ${cues.cueWrapper}`}>
      {_cues}
    </div>
  );

  function createCues(length) {
    let range = [...Array(length).keys()];

    return range.map(n => {
      let isActive = n === currentIndex;
      return (
        <Cue
          key={n}
          isActive={isActive}
          isFullScreen={isFullScreen}
        />
      );
    })
  }
}

Cues.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  isFullScreen: PropTypes.bool.isRequired,
  length: PropTypes.number.isRequired,
};

Cues.defaultProps = {
  isFullScreen: false,
};

export default Cues;