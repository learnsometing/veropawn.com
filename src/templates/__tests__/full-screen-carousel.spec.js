import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import FullScreenCarousel, { FullScreenButton } from "../item-page/full-screen-carousel";
import createContentObj from '../../helpers/createContentObj';
import { mainPhotos } from "../__fixtures__/all-photos";
import { create } from "react-test-renderer";

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
  var content = createContentObj(alt, photos);

  beforeEach(() => onIndexChangeMock.mockReset());

  it('should use 0 as startIndex if startIndex is not passed in', () => {
    var { queryAllByAltText } = render(
      <FullScreenCarousel
        content={content}
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
        content={content}
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
        content={content}
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
    var { queryByTestId } = render(
      <FullScreenCarousel
        content={content}
        onIndexChange={onIndexChangeMock}
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
});