import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactModal from "react-modal";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { IconContext } from "react-icons";

import { Slides, NextPrevBtns, Cues } from "../../components/carousel/carousel";
import { useCurrentIndex } from '../../components/carousel/hooks/useCurrentIndex';

import fullScreenCarousel from "./full-screen-carousel.module.css";
import layout from "../../styles/layout.module.css";

export const FullScreenButton = ({ onClick }) => {
  var buttonClass = `${fullScreenCarousel.fullScreenIcon}`;
  return (
    <button className={buttonClass} onClick={onClick}>
      <IconContext.Provider value={{ color: '#000', size: '2em' }}>
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

const FullScreenCarousel = ({ content, onIndexChange, startIndex }) => {
  var [isFullScreen, setIsFullScreen] = useState(false);

  var overlayClassName = `${layout.columnCenterCenter} ${fullScreenCarousel.overlay}`;
  var contentClassName = `${fullScreenCarousel.content}`;
  var FSWrapperClass = `${fullScreenCarousel.FSWrapper}`;

  var length = content.length;
  var isDisabled = length < 2;
  var currentIndex = useCurrentIndex(startIndex, onIndexChange, length);

  return (
    <>
      <div className={`${layout.columnStartCenter} ${fullScreenCarousel.wrapper}`}>
        <div className={fullScreenCarousel.carousel}>
          <Slides
            content={content}
            isDisabled={isDisabled}
            visibleRange={currentIndex.visibleRange}
          />
          <NextPrevBtns
            isDisabled={isDisabled}
            onClick={currentIndex.onClick}
          />
        </div>
        <div className={`${layout.rowEndCenter} ${fullScreenCarousel.FSControlContainer}`} >
          <Cues
            className={`${layout.rowCenterCenter} ${fullScreenCarousel.cues}`}
            currentIndex={currentIndex.value}
            length={length}
          />
          <FullScreenButton onClick={openFSModal} />
        </div>
      </div>
      <ReactModal
        ariaHideApp={false}
        isOpen={isFullScreen}
        onRequestClose={closeFSModal}
        overlayClassName={overlayClassName}
        className={contentClassName}
      >
        <div className={FSWrapperClass}>
          <div className={`${layout.columnStartCenter} ${fullScreenCarousel.wrapper}`}>
            <div className={fullScreenCarousel.carousel}>
              <Slides
                content={content}
                isDisabled={isDisabled}
                visibleRange={currentIndex.visibleRange}
              />
              <NextPrevBtns
                isDisabled={isDisabled}
                onClick={currentIndex.onClick}
              />
            </div>
            <div className={`${layout.rowEndCenter} ${fullScreenCarousel.FSControlContainer}`} >
              <Cues
                className={`${layout.rowCenterCenter} ${fullScreenCarousel.cues}`}
                currentIndex={currentIndex.value}
                isFullScreen={isFullScreen}
                length={length}
              />
              <MinimizeButton onClick={closeFSModal} />
            </div>
          </div>
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
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
  onIndexChange: PropTypes.func.isRequired,
  startIndex: PropTypes.number
};

FullScreenCarousel.defaultProps = {
  startIndex: 0,
  onIndexChange: undefined,
};

export default FullScreenCarousel;

