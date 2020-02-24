import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { Detail, DetailsList, DetailsCard } from "../item-page/details";
import { firearm, jewelry, general } from "../__fixtures__/items-json";

describe('Detail', () => {
  it('should display the name and value of the detail, separated by a colon', () => {
    const { queryByText } = render(
      <Detail
        name={"Brand"}
        value={general.details.brand}
      />
    );

    expect(queryByText("Brand:")).toBeInTheDocument();
    expect(queryByText("MILWAUKEE")).toBeInTheDocument();
  });
});

describe('DetailsList', () => {
  var category = general.category;
  const details = general.details;
  var id = general.id;
  var invNum = general.invNum;
  var model = general.model;

  it('should create a list of details for the item brand, model, and invNum', () => {
    const { queryByText } = render(
      <DetailsList
        category={category}
        details={details}
        id={id}
        invNum={invNum}
        model={model}
      />
    );

    expect(queryByText("Inventory #:")).toBeInTheDocument();
    expect(queryByText(invNum)).toBeInTheDocument();

    expect(queryByText("Brand:")).toBeInTheDocument();
    expect(queryByText(details.brand)).toBeInTheDocument();

    expect(queryByText("Model:")).toBeInTheDocument();
    expect(queryByText(model)).toBeInTheDocument();
  });

  it('should handle empty brands', () => {
    let deets = Object.assign({}, details);
    deets.brand = '';
    const { queryByText } = render(
      <DetailsList
        category={category}
        details={deets}
        id={id}
        invNum={invNum}
        model={model}
      />
    );

    expect(queryByText("Inventory #:")).toBeInTheDocument();
    expect(queryByText(invNum)).toBeInTheDocument();

    expect(queryByText("Brand:")).toBeInTheDocument();
    expect(queryByText("N/A")).toBeInTheDocument();

    expect(queryByText("Model:")).toBeInTheDocument();
    expect(queryByText(model)).toBeInTheDocument();
  });

  it('should handle null brands', () => {
    let deets = Object.assign({}, details);
    deets.brand = null;
    const { queryByText } = render(
      <DetailsList
        category={category}
        details={deets}
        id={id}
        invNum={invNum}
        model={model}
      />
    );

    expect(queryByText("Inventory #:")).toBeInTheDocument();
    expect(queryByText(invNum)).toBeInTheDocument();

    expect(queryByText("Brand:")).toBeInTheDocument();
    expect(queryByText("N/A")).toBeInTheDocument();

    expect(queryByText("Model:")).toBeInTheDocument();
    expect(queryByText(model)).toBeInTheDocument();
  });

  it('should handle NONE brands', () => {
    let deets = Object.assign({}, details);
    deets.brand = 'NONE';
    const { queryByText } = render(
      <DetailsList
        category={category}
        details={deets}
        id={id}
        invNum={invNum}
        model={model}
      />
    );

    expect(queryByText("Inventory #:")).toBeInTheDocument();
    expect(queryByText(invNum)).toBeInTheDocument();

    expect(queryByText("Brand:")).toBeInTheDocument();
    expect(queryByText("N/A")).toBeInTheDocument();

    expect(queryByText("Model:")).toBeInTheDocument();
    expect(queryByText(model)).toBeInTheDocument();
  });

  it('should handle empty models', () => {
    let model = '';
    const { queryByText } = render(
      <DetailsList
        category={category}
        details={details}
        id={id}
        invNum={invNum}
        model={model}
      />
    );

    expect(queryByText("Inventory #:")).toBeInTheDocument();
    expect(queryByText(invNum)).toBeInTheDocument();

    expect(queryByText("Brand:")).toBeInTheDocument();
    expect(queryByText(details.brand)).toBeInTheDocument();

    expect(queryByText("Model:")).toBeInTheDocument();
    expect(queryByText("N/A")).toBeInTheDocument();
  });

  it('should handle null models', () => {
    let model = null;
    const { queryByText } = render(
      <DetailsList
        category={category}
        details={details}
        id={id}
        invNum={invNum}
        model={model}
      />
    );

    expect(queryByText("Inventory #:")).toBeInTheDocument();
    expect(queryByText(invNum)).toBeInTheDocument();

    expect(queryByText("Brand:")).toBeInTheDocument();
    expect(queryByText(details.brand)).toBeInTheDocument();

    expect(queryByText("Model:")).toBeInTheDocument();
    expect(queryByText("N/A")).toBeInTheDocument();
  });

  it('should handle NONE models', () => {
    let model = 'NONE';
    const { queryByText } = render(
      <DetailsList
        category={category}
        details={details}
        id={id}
        invNum={invNum}
        model={model}
      />
    );

    expect(queryByText("Inventory #:")).toBeInTheDocument();
    expect(queryByText(invNum)).toBeInTheDocument();

    expect(queryByText("Brand:")).toBeInTheDocument();
    expect(queryByText(details.brand)).toBeInTheDocument();

    expect(queryByText("Model:")).toBeInTheDocument();
    expect(queryByText("N/A")).toBeInTheDocument();
  });

  it('should add ammo and action entries for firearms', () => {
    const { queryByText } = render(
      <DetailsList
        category={firearm.category}
        details={firearm.details}
        id={firearm.id}
        invNum={firearm.invNum}
        model={firearm.model}
      />
    );

    expect(queryByText("Ammunition:")).toBeInTheDocument();
    expect(queryByText(firearm.details.ammo)).toBeInTheDocument();

    expect(queryByText("Action:")).toBeInTheDocument();
    expect(queryByText(firearm.details.action)).toBeInTheDocument();
  });

  it('should add mass and metal entries for jewelry', () => {
    const { queryByText } = render(
      <DetailsList
        category={jewelry.category}
        details={jewelry.details}
        id={jewelry.id}
        invNum={jewelry.invNum}
        model={jewelry.model}
      />
    );

    expect(queryByText("Mass:")).toBeInTheDocument();
    expect(queryByText(jewelry.details.mass)).toBeInTheDocument();

    expect(queryByText("Metals:")).toBeInTheDocument();
    expect(queryByText(jewelry.details.metal)).toBeInTheDocument();
  });

  it('should not add additional details to general items', () => {
    const { queryByText } = render(
      <DetailsList
        category={category}
        details={details}
        id={id}
        invNum={invNum}
        model={model}
      />
    );

    expect(queryByText("Ammunition:")).not.toBeInTheDocument();
    expect(queryByText("Action:")).not.toBeInTheDocument();
    expect(queryByText("Mass:")).not.toBeInTheDocument();
    expect(queryByText("Metals:")).not.toBeInTheDocument();
  });

  it('should render all of the details of a firearm', () => {
    const { queryByText } = render(
      <DetailsList
        category={firearm.category}
        details={firearm.details}
        id={firearm.id}
        invNum={firearm.invNum}
        model={firearm.model}
      />
    );

    expect(queryByText("Inventory #:")).toBeInTheDocument();
    expect(queryByText(firearm.invNum)).toBeInTheDocument();

    expect(queryByText("Brand:")).toBeInTheDocument();
    expect(queryByText(firearm.details.brand)).toBeInTheDocument();

    expect(queryByText("Model:")).toBeInTheDocument();
    expect(queryByText(firearm.model)).toBeInTheDocument();

    expect(queryByText("Ammunition:")).toBeInTheDocument();
    expect(queryByText(firearm.details.ammo)).toBeInTheDocument();

    expect(queryByText("Action:")).toBeInTheDocument();
    expect(queryByText(firearm.details.action)).toBeInTheDocument();
  });

  it('should render all of the details of a piece of jewelry', () => {
    const category = jewelry.category;
    const details = jewelry.details;
    const id = jewelry.id;
    const invNum = jewelry.invNum;
    const model = jewelry.model;
    const { queryByText } = render(
      <DetailsList
        category={category}
        details={details}
        id={id}
        invNum={invNum}
        model={model}
      />
    );

    expect(queryByText("Inventory #:")).toBeInTheDocument();
    expect(queryByText(invNum)).toBeInTheDocument();

    expect(queryByText("Brand:")).toBeInTheDocument();
    expect(queryByText(details.brand)).not.toBeInTheDocument();

    expect(queryByText("Model:")).toBeInTheDocument();

    expect(queryByText("Metals:")).toBeInTheDocument();
    expect(queryByText(details.metal)).toBeInTheDocument();

    expect(queryByText("Mass:")).toBeInTheDocument();
    expect(queryByText(details.mass)).toBeInTheDocument();
  });

  it('should render all of the details of a general item', () => {
    const category = general.category;
    const details = general.details;
    const id = general.id;
    const invNum = general.invNum;
    const model = general.model;
    const { queryByText } = render(
      <DetailsList
        category={category}
        details={details}
        id={id}
        invNum={invNum}
        model={model}
      />
    );

    expect(queryByText("Inventory #:")).toBeInTheDocument();
    expect(queryByText(invNum)).toBeInTheDocument();

    expect(queryByText("Brand:")).toBeInTheDocument();
    expect(queryByText(details.brand)).toBeInTheDocument();

    expect(queryByText("Model:")).toBeInTheDocument();
  });
});

describe('DetailsCard', () => {
  it('should take children as props and render them', () => {
    let { queryByText } = render(
      <DetailsCard>
        <Detail name={"Brand"} value={general.details.brand} />
      </DetailsCard>
    );

    expect(queryByText("Brand:")).toBeInTheDocument();
    expect(queryByText("MILWAUKEE")).toBeInTheDocument();
  });
});