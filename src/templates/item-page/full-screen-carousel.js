import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactModal from "react-modal";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { IconContext } from "react-icons";

import Carousel from "../../components/carousel/carousel";

import fullScreenCarousel from "./full-screen-carousel.module.css";
import layout from "../../styles/layout.module.css";

export const FullScreenButton = ({ onClick }) => {
  var buttonClass = `${fullScreenCarousel.fullScreenIcon}`;
  return (
    <button className={buttonClass} onClick={onClick}>
      <IconContext.Provider value={{ color: 'rgba(255, 255, 255, 0.8)', size: '2em' }}>
        <MdFullscreen data-testid="md-fullscreen-icon" />
      </IconContext.Provider>
    </button>
  );
};

FullScreenButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export const MinimizeButton = ({ onClick }) => {
  var buttonClass = `${fullScreenCarousel.minimizeIcon}`;
  return (
    <button className={buttonClass} onClick={onClick}>
      <IconContext.Provider value={{ color: 'rgba(255, 255, 255, 0.8)', size: '2em' }}>
        <MdFullscreenExit data-testid="md-fullscreen-exit-icon" />
      </IconContext.Provider>
    </button>
  );
};

MinimizeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const FullScreenCarousel = ({ alt, onIndexChange, photos, startIndex }) => {
  var [isFullScreen, setIsFullScreen] = useState(false);
  var wrapperClass = `${fullScreenCarousel.wrapper}`;
  var overlayClassName = `${layout.columnCenterCenter} ${fullScreenCarousel.overlay}`;
  var contentClassName = `${fullScreenCarousel.content}`;
  var FSWrapperClass = `${fullScreenCarousel.FSWrapper}`;
  return (
    <>
      <div className={wrapperClass}>
        <Carousel
          alt={alt}
          startIndex={startIndex}
          photos={photos}
          onIndexChange={onIndexChange}
        />
        <FullScreenButton onClick={openFSModal} />
      </div>
      <ReactModal
        ariaHideApp={false}
        isOpen={isFullScreen}
        onRequestClose={closeFSModal}
        overlayClassName={overlayClassName}
        className={contentClassName}
      >
        <div className={FSWrapperClass}>
          <Carousel
            alt={`${alt} Full Screen`}
            startIndex={startIndex}
            photos={photos}
          />
          <MinimizeButton onClick={closeFSModal} />
        </div>
      </ReactModal>
    </>
  );

  function openFSModal() {
    setIsFullScreen(true);
  }

  function closeFSModal() {
    setIsFullScreen(false);
  }
};

FullScreenCarousel.propTypes = {
  alt: PropTypes.string.isRequired,
  onIndexChange: PropTypes.func.isRequired,
  photos: PropTypes.array.isRequired,
  startIndex: PropTypes.number
};

FullScreenCarousel.defaultProps = {
  startIndex: 0,
};

export default FullScreenCarousel;

