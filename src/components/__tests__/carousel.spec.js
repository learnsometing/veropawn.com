import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Carousel from '../carousel/carousel';
import { createContentFromSharp } from '../../helpers/slides';
import { allPhotoNodes } from '../../templates/__fixtures__/all-photos';

describe('Carousel', () => {
  var alt = 'Handgun With Case 2 Mags';
  var photos = allPhotoNodes.slice(0, 4);
  var content = createContentFromSharp(alt, photos);
  var onIndexChangeMock = jest.fn();

  beforeEach(() => {
    onIndexChangeMock.mockReset()
    jest.useFakeTimers()
  });

  it('should render the main photo and prev/next photos into the carousel on mount', () => {
    const { queryByAltText } = render(
      <Carousel content={content} />
    );
    expect(queryByAltText('Handgun With Case 2 Mags 1')).toBeInTheDocument();
    expect(queryByAltText('Handgun With Case 2 Mags 2')).toBeInTheDocument();
    expect(queryByAltText('Handgun With Case 2 Mags 4')).toBeInTheDocument();
  });

  it('should pass currentSlideStyle and slideStyle to the slides', () => {
    const { queryAllByAltText } = render(
      <Carousel
        content={content}
        currentSlideStyle={{ maxWidth: '50%' }}
        slideStyle={{ minWidth: '100%' }}
      />
    );

    const photos = queryAllByAltText(/handgun with case 2 mags/i);
    const slideWrappers = photos.map(photo => photo.parentElement.parentElement.parentElement);

    expect(slideWrappers[0]).toHaveStyle('min-width: 100%');
    expect(slideWrappers[1]).toHaveStyle('max-width: 50%');
    expect(slideWrappers[2]).toHaveStyle('min-width: 100%');
  });

  it('should pass isFullScreen to the Cues', () => {
    const { queryAllByTestId } = render(
      <Carousel
        content={content}
        isFullScreen={true}
      />
    );

    let cues = queryAllByTestId('carousel-pos-indicator');

    expect(cues[0]).toHaveStyle('color: rgba(231, 232, 200, 0.8)');
    cues.slice(1, cues.length).forEach(cue => (
      expect(cue).toHaveStyle('color: rgba(231, 232, 200, 0.4)')
    ));
  });

  it('should pass isFullScreen to FSControls', () => {
    const { queryByTestId } = render(
      <Carousel
        content={content}
        isFullScreen={true}
      />
    );

    const FSIcon = queryByTestId('md-fullscreen-exit-icon');

    expect(FSIcon).toHaveStyle('color: rgb(231, 232, 200)');
  });

  it('should cycle through the photos when the next button is clicked', () => {
    const { queryByAltText, queryByTestId } = render(
      <Carousel content={content} />
    );

    const startPhoto = queryByAltText(/Handgun With Case 2 Mags 1/);
    let slideWrapper = startPhoto.parentElement.parentElement.parentElement
    const nextBtn = queryByTestId('fa-angle-right-icon').parentElement;

    expect(slideWrapper).toBeInTheDocument();
    expect(slideWrapper).toHaveClass('currentSlide');

    fireEvent.click(nextBtn);

    const photo2 = queryByAltText(/Handgun With Case 2 Mags 2/);
    slideWrapper = photo2.parentElement.parentElement.parentElement;
    expect(slideWrapper).toHaveClass('currentSlide');

    fireEvent.click(nextBtn);

    const photo3 = queryByAltText(/Handgun With Case 2 Mags 3/);
    slideWrapper = photo3.parentElement.parentElement.parentElement;
    expect(slideWrapper).toHaveClass('currentSlide');
  });

  it('should cycle through the photos when the prev button is clicked', () => {
    const { queryByAltText, queryByTestId } = render(
      <Carousel content={content} />
    );

    const startPhoto = queryByAltText(/Handgun With Case 2 Mags 1/);
    let slideWrapper = startPhoto.parentElement.parentElement.parentElement;
    const prevBtn = queryByTestId('fa-angle-left-icon').parentElement;

    expect(startPhoto).toBeInTheDocument();
    expect(slideWrapper).toHaveClass('currentSlide');

    fireEvent.click(prevBtn);

    var photo4 = queryByAltText(/Handgun With Case 2 Mags 4/);
    slideWrapper = photo4.parentElement.parentElement.parentElement;
    expect(slideWrapper).toHaveClass('currentSlide');

    fireEvent.click(prevBtn);

    var photo3 = queryByAltText(/Handgun With Case 2 Mags 3/);
    slideWrapper = photo3.parentElement.parentElement.parentElement;
    expect(slideWrapper).toHaveClass('currentSlide');
  });

  it('should not render either carousel button if content.length is 1', () => {
    const content = createContentFromSharp(alt, photos.slice(0, 1));

    const { queryByTestId } = render(
      <Carousel content={content} />
    );
    const prevBtn = queryByTestId('fa-angle-left-icon');
    const nextBtn = queryByTestId('fa-angle-right-icon');

    expect(prevBtn).not.toBeInTheDocument();
    expect(nextBtn).not.toBeInTheDocument();
  });

  it('should display the correct photo if given a startIndex other than 0', () => {
    const { queryByAltText } = render(
      <Carousel content={content} startIndex={2} />
    );

    const startPhoto = queryByAltText(/Handgun With Case 2 Mags 3/);
    const slideWrapper = startPhoto.parentElement.parentElement.parentElement;
    expect(slideWrapper).toHaveClass('currentSlide');
  });

  it('should call the onIndexChange prop if provided', () => {
    const { queryByTestId } = render(
      <Carousel content={content} startIndex={2} onIndexChange={onIndexChangeMock} />
    );
    const nextBtn = queryByTestId('fa-angle-right-icon').parentElement;
    const prevBtn = queryByTestId('fa-angle-left-icon').parentElement;

    fireEvent.click(nextBtn);
    fireEvent.click(prevBtn);

    expect(onIndexChangeMock.mock.calls.length).toEqual(2);
  });

  it('should call setInterval with default interval when isTimed', () => {
    render(
      <Carousel content={content} isTimed={true} />
    );

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 8000);
  });

  it('should call setInterval with specified interval when isTimed', () => {
    render(
      <Carousel content={content} interval={1000} isTimed={true} />
    );

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  it('should display the next slide after the interval when isTimed', () => {
    const { queryByAltText } = render(
      <Carousel content={content} interval={1000} isTimed={true} />
    );

    expect(queryByAltText(/handgun with case 2 mags 3/i)).not.toBeInTheDocument();

    act(() => jest.advanceTimersByTime(1000));

    expect(queryByAltText(/handgun with case 2 mags 3/i)).toBeInTheDocument();
  });
});