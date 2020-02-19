import React from 'react';
import PropTypes from 'prop-types';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import { IconContext } from 'react-icons';

import fsControls from './full-screen-controls.module.css';

export const MaximizeButton = ({ onClick }) => (
  <button className={fsControls.maximizeIcon} onClick={onClick}>
    <IconContext.Provider value={{ color: 'rgb(64, 61, 52)', size: '2em' }}>
      <MdFullscreen data-testid="md-fullscreen-icon" />
    </IconContext.Provider>
  </button>
);

MaximizeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export const MinimizeButton = ({ onClick }) => (
  <button className={fsControls.minimizeIcon} onClick={onClick}>
    <IconContext.Provider value={{ color: 'rgb(231, 232, 200)', size: '2em' }}>
      <MdFullscreenExit data-testid="md-fullscreen-exit-icon" />
    </IconContext.Provider>
  </button>
);

MinimizeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default function FSControls({ isFullScreen, onClick }) {
  var c = isFullScreen
    ? <MinimizeButton onClick={onClick} />
    : <MaximizeButton onClick={onClick} />;

  return c;
}