import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import FSControls, { MaximizeButton, MinimizeButton } from '../carousel/full-screen-controls';

describe('MaximizeButton', () => {
  var onClickMock = jest.fn();

  beforeEach(() => onClickMock.mockReset());

  it('should fire onClick when clicked', () => {
    const { queryByTestId } = render(
      <MaximizeButton onClick={onClickMock} />
    );

    const maximize = queryByTestId('md-fullscreen-icon');

    fireEvent.click(maximize);

    expect(onClickMock.mock.calls.length).toEqual(1);
  });
});

describe('MinimizeButton', () => {
  var onClickMock = jest.fn();

  beforeEach(() => onClickMock.mockReset());

  it('should fire onClick when clicked', () => {
    const { queryByTestId } = render(
      <MinimizeButton onClick={onClickMock} />
    );

    const minimize = queryByTestId('md-fullscreen-exit-icon');

    fireEvent.click(minimize);

    expect(onClickMock.mock.calls.length).toEqual(1);
  });
});

describe('FSControls', () => {
  var onClickMock = jest.fn();

  beforeEach(() => onClickMock.mockReset());

  it('should render MinimizeButton if isFullScreen', () => {
    const { queryByTestId } = render(
      <FSControls isFullScreen={true} onClick={onClickMock} />
    );

    expect(queryByTestId('md-fullscreen-exit-icon')).toBeInTheDocument();
  });

  it('should render MaximizeButton if !isFullScreen', () => {
    const { queryByTestId } = render(
      <FSControls isFullScreen={false} onClick={onClickMock} />
    );

    expect(queryByTestId('md-fullscreen-icon')).toBeInTheDocument();
  });

  it('should pass onClick to MinimizeButton', () => {
    const { queryByTestId } = render(
      <FSControls isFullScreen={true} onClick={onClickMock} />
    );

    const minimize = queryByTestId('md-fullscreen-exit-icon');

    fireEvent.click(minimize);

    expect(onClickMock.mock.calls.length).toEqual(1);
  });

  it('should pass onClick to MaximizeButton', () => {
    const { queryByTestId } = render(
      <FSControls isFullScreen={false} onClick={onClickMock} />
    );

    const maximize = queryByTestId('md-fullscreen-icon');

    fireEvent.click(maximize);

    expect(onClickMock.mock.calls.length).toEqual(1);
  });
});