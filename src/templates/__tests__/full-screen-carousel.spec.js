import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import FullScreenCarousel, { FullScreenButton } from "../item-page/full-screen-carousel";
import { mainPhotos } from "../__fixtures__/all-photos";

describe('FullScreenButton', () => {
  var onClickMock = jest.fn();

  beforeEach(() => onClickMock.mockReset());

  it('should fire onClick when clicked', () => {
    var { queryByTestId } = render(
      <FullScreenButton onClick={onClickMock} />
    );

    var fullScreenButton = queryByTestId('md-fullscreen-icon');

    fireEvent.click(fullScreenButton);

    expect(onClickMock.mock.calls.length).toEqual(1);
  });
});

describe('FullScreenCarousel', () => {
  var onIndexChangeMock = jest.fn();
  var alt = "Women's Ring";
  var photos = mainPhotos.slice(0, 3);
  beforeEach(() => onIndexChangeMock.mockReset());

  it('should use 0 as startIndex if startIndex is not passed in', () => {
    var { queryAllByAltText } = render(
      <FullScreenCarousel
        alt={alt}
        photos={photos}
        onIndexChange={onIndexChangeMock}
      />
    );

    const photoElements = queryAllByAltText(/Women's Ring/);
    // get the div elements that wrap the Img tags
    const photoElementWrappers = photoElements.map(el => el.parentElement.parentElement);

    expect(photoElementWrappers[0]).toHaveClass('slide currentSlide gatsby-image-wrapper');
    expect(photoElementWrappers[1]).toHaveClass('slide hiddenSlide gatsby-image-wrapper');
    expect(photoElementWrappers[2]).toHaveClass('slide hiddenSlide gatsby-image-wrapper');
  });

  it('should use the startIndex prop to display the correct photo', () => {
    var { queryAllByAltText } = render(
      <FullScreenCarousel
        alt={alt}
        photos={photos}
        onIndexChange={onIndexChangeMock}
        startIndex={2}
      />
    );

    const photoElements = queryAllByAltText(/Women's Ring/);
    // get the div elements that wrap the Img tags
    const photoElementWrappers = photoElements.map(el => el.parentElement.parentElement);

    expect(photoElementWrappers[0]).toHaveClass('slide hiddenSlide gatsby-image-wrapper');
    expect(photoElementWrappers[1]).toHaveClass('slide hiddenSlide gatsby-image-wrapper');
    expect(photoElementWrappers[2]).toHaveClass('slide currentSlide gatsby-image-wrapper');
  });

  it('should call onIndexChange when the std carousel photos are cycled', () => {
    var { queryByTestId } = render(
      <FullScreenCarousel
        alt={alt}
        photos={photos}
        onIndexChange={onIndexChangeMock}
      />
    );

    var nextBtn = queryByTestId('fa-angle-right-icon').parentElement;
    var prevBtn = queryByTestId('fa-angle-left-icon').parentElement;

    fireEvent.click(nextBtn);
    fireEvent.click(prevBtn);

    expect(onIndexChangeMock.mock.calls.length).toEqual(2);
  });

  it('should be able to display full screen photos', () => {
    var { queryByAltText, queryByTestId } = render(
      <FullScreenCarousel
        alt={alt}
        photos={photos}
        onIndexChange={onIndexChangeMock}
      />
    );

    var fullScreen = queryByTestId('md-fullscreen-icon');

    expect(queryByAltText("Women's Ring Full Screen 0")).not.toBeInTheDocument();

    fireEvent.click(fullScreen);

    expect(queryByAltText("Women's Ring Full Screen 0")).toBeInTheDocument();
  });

  it('should exit from full screen when the minimize button is clicked', () => {
    var { queryByAltText, queryByTestId } = render(
      <FullScreenCarousel
        alt={alt}
        photos={photos}
        onIndexChange={onIndexChangeMock}
      />
    );
    var fullScreen = queryByTestId('md-fullscreen-icon');

    fireEvent.click(fullScreen);

    expect(queryByAltText("Women's Ring Full Screen 0")).toBeInTheDocument();

    var minimize = queryByTestId('md-fullscreen-exit-icon');

    fireEvent.click(minimize);

    expect(queryByAltText("Women's Ring Full Screen 0")).not.toBeInTheDocument();
  });
});