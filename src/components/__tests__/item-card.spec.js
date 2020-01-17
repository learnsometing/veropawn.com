import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

import ItemCard from "../item-card/item-card";
import { itemData, photos } from "../__fixtures__/item-card-data";

describe('ItemCard', () => {
  it('should render the item card with a photo and with the item descript', () => {
    const { queryByText } = render(
      <ItemCard
        item={itemData}
        photos={photos}
      />
    );

    expect(queryByText(itemData.descript)).toBeInTheDocument();
  });
});