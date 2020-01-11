import React from "react";
import { fireEvent, render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

import ItemCard from "../item-card/item-card";
import { pageData, photos } from "../__fixtures__/item-card-data";

describe('ItemCard', () => {
  const category = pageData.category;
  const subcategory = pageData.subcategory;
  const item = pageData.items[0];
  const onClick = jest.fn((photos) => { return photos });
  const prettyDescript = "Handgun With Case 2 Mags";

  it('should render the item card using the pretty description', () => {
    const { queryByText } = render(
      <ItemCard
        category={category}
        item={item}
        onClick={onClick}
        photos={photos}
        subcategory={subcategory}
      />
    );

    expect(queryByText(prettyDescript)).toBeInTheDocument();
  });

  it('onClick should bind the photos of the items to its call', () => {
    const { queryByRole } = render(
      <ItemCard
        category={category}
        item={item}
        onClick={onClick}
        photos={photos}
        subcategory={subcategory}
      />
    );

    const button = queryByRole('button');

    fireEvent.click(button);

    expect(onClick.mock.calls.length).toBe(1);
    expect(onClick.mock.results[0].value).toEqual(photos);
  });
});