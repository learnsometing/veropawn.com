import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { CarouselSlides, NextPrevBtns } from '../carousel/carousel';
import { useCurrentIndex } from './hooks/useCurrentIndex';

import layout from '../../styles/layout.module.css';
import carousel from './carousel.module.scss';

const TimedCarousel = ({ content, startIndex, onIndexChange }) => {
  var length = content.length;
  var currentIndex = useCurrentIndex(startIndex, onIndexChange, length);
  const controlContainerClass = `${layout.rowSpaceBtnCenter} ${carousel.controlContainer}`;

  useEffect(() => {
    let timerID = currentIndex.setTimer(10000);
    return () => clearInterval(timerID);
  }, [currentIndex]);

  return (
    <div>
      <div className={carousel.slideContainer}>
        <CarouselSlides
          content={content}
          currentIndex={currentIndex.value}
        />
        <div className={controlContainerClass}>
          <NextPrevBtns
            isDisabled={false}
            onClick={currentIndex.onClick}
          />
        </div>
      </div>
    </div>
  );
};

TimedCarousel.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
  onIndexChange: PropTypes.func.isRequired,
  startIndex: PropTypes.number
};

TimedCarousel.defaultProps = {
  startIndex: 0,
  onIndexChange: undefined
};

export default TimedCarousel;