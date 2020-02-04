import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import { CarouselSlides, NextPrevBtns } from '../carousel/carousel';
import { useCurrentIndex } from './hooks/useCurrentIndex';

import layout from '../../styles/layout.module.css';
import carousel from './carousel.module.scss';

function TextOverlay({ content }) {
  var html = content.html;
  if (html) {
    let title = content.title;
    return (
      <div className={`${layout.columnStartCenter} ${carousel.textOverlay}`}>
        <p className={carousel.title}>{title}</p>
        {ReactHtmlParser(html)}
      </div>
    );
  }

  return null;
}

const TimedCarousel = ({ content, startIndex, onIndexChange }) => {
  var length = content.length;
  var currentIndex = useCurrentIndex(startIndex, onIndexChange, length);
  var idx = currentIndex.value;
  const controlContainerClass = `${layout.rowSpaceBtnCenter} ${carousel.controlContainer}`;

  useEffect(() => {
    let timerID = currentIndex.setTimer(10000);
    return () => clearInterval(timerID);
  }, [currentIndex]);

  return (
    <div className={carousel.slideContainer}>
      <CarouselSlides
        content={content}
        currentIndex={idx}
      />
      <div className={controlContainerClass}>
        <NextPrevBtns
          isDisabled={false}
          onClick={currentIndex.onClick}
        />
      </div>
      <TextOverlay content={content[idx]} />
    </div>
  );
};

TimedCarousel.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
  onIndexChange: PropTypes.func,
  startIndex: PropTypes.number
};

TimedCarousel.defaultProps = {
  startIndex: 0,
  onIndexChange: undefined
};

export default TimedCarousel;