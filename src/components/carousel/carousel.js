import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Cues from './cues';
import Slides from './slides';
import Controls from './controls';
import FSControls from './full-screen-controls';
import { useCurrentIndex } from './hooks/useCurrentIndex';

import carousel from './carousel.module.css';
import layout from '../../styles/layout.module.css';

const Carousel = (props) => {
  var {
    content,
    currentSlideStyle,
    interval,
    isFullScreen,
    isTimed,
    onFSIconClick,
    onIndexChange,
    slideStyle,
    startIndex
  } = props;

  var length = content.length;
  var isDisabled = length < 2;
  var currentIndex = useCurrentIndex(startIndex, onIndexChange, length);

  useEffect(() => {
    if (isTimed) {
      let timerID = currentIndex.setTimer(interval);
      return () => clearInterval(timerID);
    }
  }, [currentIndex, interval, isTimed]);

  return (
    <div className={`${layout.columnStartCenter} ${carousel.wrapper}`}>
      <div className={`${carousel.carousel}`}>
        <div className={`${layout.rowCenterCenter} ${carousel.slideContainer}`}>
          <Slides
            content={content}
            currentSlideStyle={currentSlideStyle}
            isDisabled={isDisabled}
            slideStyle={slideStyle}
            visibleRange={currentIndex.visibleRange}
          />
          <Controls
            isDisabled={isDisabled}
            isFullScreen={isFullScreen}
            onClick={currentIndex.onClick}
          />
        </div>
      </div>
      <div className={`${layout.rowEndCenter} ${carousel.FSControlContainer}`}>
        <Cues
          currentIndex={currentIndex.value}
          isFullScreen={isFullScreen}
          length={length}
        />
        <FSControls isFullScreen={isFullScreen} onClick={onFSIconClick} />
      </div>
    </div>
  );
}

Carousel.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentSlideStyle: PropTypes.object,
  interval: PropTypes.number,
  isFullScreen: PropTypes.bool.isRequired,
  isTimed: PropTypes.bool.isRequired,
  onFSIconClick: PropTypes.func.isRequired,
  onIndexChange: PropTypes.func.isRequired,
  slideStyle: PropTypes.object,
  startIndex: PropTypes.number.isRequired,
};

Carousel.defaultProps = {
  currentSlideStyle: undefined,
  interval: 8000,
  isFullScreen: false,
  isTimed: false,
  onFSIconClick: () => { },
  onIndexChange: () => { },
  slideStyle: undefined,
  startIndex: 0,
}

export default Carousel;