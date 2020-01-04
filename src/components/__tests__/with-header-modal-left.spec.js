import React from "react";
import { fireEvent, render } from "@testing-library/react";

import { withHeaderModalLeft } from "../header/with-header-modal-left";
import ExpandedCategoryMenuMock from "../__mocks__/expanded-main-menu-mock";

describe('withHeaderModal', () => {
  it('should correctly render the passed component', () => {
    const WithHeaderModalLeft = withHeaderModalLeft(ExpandedCategoryMenuMock);

    const { queryByRole, queryByTestId } = render(<WithHeaderModalLeft />);

    const toggleCategoryMenuBtn = queryByRole('button');
    const faAngleDownIcon = queryByTestId('fa-angle-down-icon');

    expect(toggleCategoryMenuBtn).toBeTruthy();
    expect(toggleCategoryMenuBtn.textContent).toMatch(/categories/i);
    expect(Array.from(toggleCategoryMenuBtn.children)).toContain(faAngleDownIcon);
  });

  it('should render the correct menu in the modal when toggleMenu is called', () => {
    const WithHeaderModalLeft = withHeaderModalLeft(ExpandedCategoryMenuMock);

    const { queryByRole, queryByText, queryByTestId } = render(
      <WithHeaderModalLeft />
    );

    // Get the toggle category button
    const toggleCategoryMenuBtn = queryByRole('button');

    // click the toggle category button
    fireEvent.click(toggleCategoryMenuBtn);

    const faAngleUpIcon = queryByTestId('fa-angle-up-icon');

    // mock menu should appear
    expect(queryByText('Test Item')).toBeTruthy();

    // modal's state should change the icon in the category button
    expect(Array.from(toggleCategoryMenuBtn.children)).toContain(faAngleUpIcon);

    // click the toggle category button again
    fireEvent.click(toggleCategoryMenuBtn);

    const faAngleDownIcon = queryByTestId('fa-angle-down-icon');

    // mock menu should no longer be present
    expect(queryByText('Test Item')).toBeFalsy();

    // modal's state should change the icon in the category button again
    expect(Array.from(toggleCategoryMenuBtn.children)).toContain(faAngleDownIcon);
  });
});