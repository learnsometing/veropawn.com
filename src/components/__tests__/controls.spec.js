import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Controls, { SlideControl } from "../carousel/controls";

describe('SlideControl', () => {
  const onClick = jest.fn();

  beforeEach(() => onClick.mockReset());

  it('should pass child elements to the control', () => {
    const { queryByText } = render(
      <SlideControl name={'next'} onClick={onClick} >
        foo
      </SlideControl>
    );

    expect(queryByText('foo')).toBeInTheDocument();
  });

  it('should give the control the onClick fcn', () => {
    const { queryByRole } = render(
      <SlideControl name={'next'} onClick={onClick} />
    );

    fireEvent.click(queryByRole('button'));

    expect(onClick.mock.calls.length).toEqual(1);
  });
});

describe('Controls', () => {
  const onClick = jest.fn();

  beforeEach(() => onClick.mockReset());

  it('should return null if isDisabled', () => {
    const { queryByTestId } = render(
      <Controls isDisabled={true} onClick={onClick} />
    );

    expect(queryByTestId('fa-angle-left-icon')).not.toBeInTheDocument();
    expect(queryByTestId('fa-angle-right-icon')).not.toBeInTheDocument();
  });

  it('should correctly render both controls if !isDisabled', () => {
    const { queryByTestId } = render(
      <Controls isDisabled={false} onClick={onClick} />
    );

    expect(queryByTestId('fa-angle-left-icon')).toBeInTheDocument();
    expect(queryByTestId('fa-angle-right-icon')).toBeInTheDocument();
  });

  it('should pass onClick to both controls', () => {
    const { queryByTestId } = render(
      <Controls isDisabled={false} onClick={onClick} />
    );
    let prevBtn = queryByTestId('fa-angle-left-icon');
    let nextBtn = queryByTestId('fa-angle-right-icon');

    fireEvent.click(prevBtn);
    fireEvent.click(nextBtn);

    expect(onClick.mock.calls.length).toEqual(2);
  });
});