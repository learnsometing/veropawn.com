import React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import FullScreenCarousel from "../carousel/full-screen-carousel";
import { createContentFromSharp } from '../../helpers/slides';
import { mainPhotos } from "../../templates/__fixtures__/all-photos";

describe('FullScreenCarousel', () => {
  var onIndexChangeMock = jest.fn();
  var alt = "Women's Ring";
  var photos = mainPhotos.slice(0, 4);
  var content = photos.map((photo, idx) => (
    createContentFromSharp(alt, idx, photo)
  ));

  beforeEach(() => jest.useFakeTimers());

  it('should be able to display full screen photos', () => {
    var { queryByTestId } = render(
      <FullScreenCarousel
        content={content}
      />
    );

    var fullScreen = queryByTestId('md-fullscreen-icon');

    expect(queryByTestId('md-minimize-icon')).not.toBeInTheDocument();

    fireEvent.click(fullScreen);

    expect(queryByTestId('md-fullscreen-exit-icon')).toBeInTheDocument();
  });

  it('should exit from full screen when the minimize button is clicked', () => {
    var { queryByTestId } = render(
      <FullScreenCarousel
        content={content}
        onIndexChange={onIndexChangeMock}
      />
    );
    var fullScreen = queryByTestId('md-fullscreen-icon');

    fireEvent.click(fullScreen);

    var minimize = queryByTestId('md-fullscreen-exit-icon');

    expect(queryByTestId('md-fullscreen-exit-icon')).toBeInTheDocument();

    fireEvent.click(minimize);

    expect(minimize).not.toBeInTheDocument();
  });

  it('should pass currentSlideStyle and slideStyle to the Carousel', () => {
    const { queryAllByAltText } = render(
      <FullScreenCarousel
        content={content}
        currentSlideStyle={{ maxWidth: '50%' }}
        slideStyle={{ minWidth: '100%' }}
      />
    );

    const photos = queryAllByAltText(/women's ring/i);
    const slideWrappers = photos.map(photo => photo.parentElement.parentElement.parentElement);

    expect(slideWrappers[0]).toHaveStyle('min-width: 100%');
    expect(slideWrappers[1]).toHaveStyle('max-width: 50%');
    expect(slideWrappers[2]).toHaveStyle('min-width: 100%');
  });

  it('should pass isTimed to the Carousel', () => {
    render(
      <FullScreenCarousel content={content} isTimed={true} />
    );

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 8000);
  });

  it('should pass interval to the Carousel', () => {
    render(
      <FullScreenCarousel content={content} interval={1000} isTimed={true} />
    );

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  it('should display the next slide after the interval when isTimed', () => {
    const { queryByAltText } = render(
      <FullScreenCarousel content={content} interval={1000} isTimed={true} />
    );

    expect(queryByAltText(/women's ring 3/i)).not.toBeInTheDocument();

    act(() => jest.advanceTimersByTime(1000));

    expect(queryByAltText(/women's ring 3/i)).toBeInTheDocument();
  });

  it('should display the next slide after the interval has advanced while maximized', () => {
    const { queryAllByAltText, queryByAltText, queryByTestId } = render(
      <FullScreenCarousel content={content} interval={1000} isTimed={true} />
    );
    var fullScreen = queryByTestId('md-fullscreen-icon');

    expect(queryByAltText(/women's ring 3/i)).not.toBeInTheDocument();

    fireEvent.click(fullScreen);

    expect(queryByTestId('md-fullscreen-exit-icon')).toBeInTheDocument();

    act(() => jest.advanceTimersByTime(1000));

    // full screen version has same alt text, so there are two in the dom
    expect(queryAllByAltText(/women's ring 3/i).length).toEqual(2);
  });
});