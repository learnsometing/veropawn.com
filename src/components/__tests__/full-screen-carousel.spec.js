import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import FullScreenCarousel from "../carousel/full-screen-carousel";
import createContentObj from '../../helpers/createContentObj';
import { mainPhotos } from "../../templates/__fixtures__/all-photos";

describe('FullScreenCarousel', () => {
  var onIndexChangeMock = jest.fn();
  var alt = "Women's Ring";
  var photos = mainPhotos.slice(0, 3);
  var content = createContentObj(alt, photos);

  it('should use 0 as startIndex if startIndex is not passed in', () => {
    var { queryByAltText } = render(
      <FullScreenCarousel
        content={content}
      />
    );

    var startPhoto = queryByAltText(/Women's Ring 1/);

    expect(startPhoto.parentElement.parentElement).toHaveClass('currentSlide gatsby-image-wrapper');
  });

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
});