import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { CarouselPositionDisplay, CarouselSlides, NextPrevBtns } from '../carousel/carousel';
import { useCurrentIndex } from './hooks/useCurrentIndex';

import layout from '../../styles/layout.module.css';
import carousel from './carousel.module.scss';

const TimedCarousel = ({ alts, photos, startIndex, onIndexChange }) => {
  var length = photos.length;
  var currentIndex = useCurrentIndex(startIndex, onIndexChange, length);
  const controlContainerClass = `${layout.rowSpaceBtnCenter} ${carousel.controlContainer}`;

  useEffect(() => {
    let timerID = currentIndex.setTimer(10000);
    return () => clearInterval(timerID);
  }, [currentIndex]);

  return (
    <div >
      <div className={carousel.slideContainer}>
        <CarouselSlides alt={alts[currentIndex]}
          currentIndex={currentIndex.value}
          photos={photos}
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
  alts: PropTypes.arrayOf(PropTypes.string),
  onIndexChange: PropTypes.func.isRequired,
  photos: PropTypes.array.isRequired,
  startIndex: PropTypes.number
};

TimedCarousel.defaultProps = {
  startIndex: 0,
};

export default TimedCarousel;