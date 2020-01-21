import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { createBaseList, createTypedList, Detail, DetailsList, DetailsCard, ItemPage } from "../item-page/item-page";
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

describe('createBaseList', () => {
  let brand = firearm.details.brand;
  let model = firearm.model;
  let invNum = firearm.invNum;

  afterEach(() => {
    brand = firearm.details.brand;
    model = firearm.model;
    invNum = firearm.invNum;
  });

  it('should create a list of details for the item brand, model, and invNum', () => {
    const baseList = createBaseList(brand, model, invNum);

    const { queryByText } = render(
      <>
        {baseList}
      </>
    );

    expect(queryByText("Inventory #:")).toBeInTheDocument();
    expect(queryByText(invNum)).toBeInTheDocument();

    expect(queryByText("Brand:")).toBeInTheDocument();
    expect(queryByText(brand)).toBeInTheDocument();

    expect(queryByText("Model:")).toBeInTheDocument();
    expect(queryByText(model)).toBeInTheDocument();
  });

  it('should handle empty brands', () => {
    brand = '';

    let baseList = createBaseList(brand, model, invNum);

    const { queryByText } = render(
      <>
        {baseList}
      </>
    );

    expect(queryByText("Inventory #:")).toBeInTheDocument();
    expect(queryByText(invNum)).toBeInTheDocument();

    expect(queryByText("Brand:")).toBeInTheDocument();
    expect(queryByText("N/A")).toBeInTheDocument();

    expect(queryByText("Model:")).toBeInTheDocument();
    expect(queryByText(model)).toBeInTheDocument();
  });

  it('should handle null brands', () => {
    brand = null;

    let baseList = createBaseList(brand, model, invNum);

    const { queryByText } = render(
      <>
        {baseList}
      </>
    );

    expect(queryByText("Inventory #:")).toBeInTheDocument();
    expect(queryByText(invNum)).toBeInTheDocument();

    expect(queryByText("Brand:")).toBeInTheDocument();
    expect(queryByText("N/A")).toBeInTheDocument();

    expect(queryByText("Model:")).toBeInTheDocument();
    expect(queryByText(model)).toBeInTheDocument();
  });

  it('should handle NONE brands', () => {
    brand = 'NONE';

    let baseList = createBaseList(brand, model, invNum);

    const { queryByText } = render(
      <>
        {baseList}
      </>
    );

    expect(queryByText("Inventory #:")).toBeInTheDocument();
    expect(queryByText(invNum)).toBeInTheDocument();

    expect(queryByText("Brand:")).toBeInTheDocument();
    expect(queryByText("N/A")).toBeInTheDocument();

    expect(queryByText("Model:")).toBeInTheDocument();
    expect(queryByText(model)).toBeInTheDocument();
  });

  it('should handle empty models', () => {
    model = '';

    let baseList = createBaseList(brand, model, invNum);

    const { queryByText } = render(
      <>
        {baseList}
      </>
    );

    expect(queryByText("Inventory #:")).toBeInTheDocument();
    expect(queryByText(invNum)).toBeInTheDocument();

    expect(queryByText("Brand:")).toBeInTheDocument();
    expect(queryByText(brand)).toBeInTheDocument();

    expect(queryByText("Model:")).toBeInTheDocument();
    expect(queryByText("N/A")).toBeInTheDocument();
  });

  it('should handle null models', () => {
    model = null;

    let baseList = createBaseList(brand, model, invNum);

    const { queryByText } = render(
      <>
        {baseList}
      </>
    );

    expect(queryByText("Inventory #:")).toBeInTheDocument();
    expect(queryByText(invNum)).toBeInTheDocument();

    expect(queryByText("Brand:")).toBeInTheDocument();
    expect(queryByText(brand)).toBeInTheDocument();

    expect(queryByText("Model:")).toBeInTheDocument();
    expect(queryByText("N/A")).toBeInTheDocument();
  });

  it('should handle NONE models', () => {
    model = 'NONE';

    let baseList = createBaseList(brand, model, invNum);

    const { queryByText } = render(
      <>
        {baseList}
      </>
    );

    expect(queryByText("Inventory #:")).toBeInTheDocument();
    expect(queryByText(invNum)).toBeInTheDocument();

    expect(queryByText("Brand:")).toBeInTheDocument();
    expect(queryByText(brand)).toBeInTheDocument();

    expect(queryByText("Model:")).toBeInTheDocument();
    expect(queryByText("N/A")).toBeInTheDocument();
  });
});

describe('createTypedList', () => {
  let baseList = [];
  it('should add ammo and action entries for firearms', () => {
    const {
      action,
      ammo,
      brand,
      mass,
      metal,
      serial,
    } = firearm.details;
    let typedList = createTypedList(baseList, firearm.category, firearm.id, action, ammo, mass, metal);
    const { queryByText } = render(<>{typedList}</>);

    expect(queryByText("Ammunition:")).toBeInTheDocument();
    expect(queryByText(ammo)).toBeInTheDocument();

    expect(queryByText("Action:")).toBeInTheDocument();
    expect(queryByText(action)).toBeInTheDocument();
  });

  it('should add mass and metal entries for jewelry', () => {
    const {
      action,
      ammo,
      brand,
      mass,
      metal,
      serial,
    } = jewelry.details;
    let typedList = createTypedList(baseList, jewelry.category, jewelry.id, action, ammo, mass, metal);
    const { queryByText } = render(<>{typedList}</>);

    expect(queryByText("Metals:")).toBeInTheDocument();
    expect(queryByText(metal)).toBeInTheDocument();

    expect(queryByText("Mass:")).toBeInTheDocument();
    expect(queryByText(mass)).toBeInTheDocument();
  });

  it('should not add additional details to general items', () => {
    const {
      action,
      ammo,
      brand,
      mass,
      metal,
      serial,
    } = general.details;
    let typedList = createTypedList(baseList, general.category, general.id, action, ammo, mass, metal);
    expect(typedList).toEqual(baseList);
  });
});

describe('DetailsList', () => {
  it('should render all of the details of a firearm', () => {
    const category = firearm.category;
    const details = firearm.details;
    const id = firearm.id;
    const invNum = firearm.invNum;
    const model = firearm.model;
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

    expect(queryByText("Ammunition:")).toBeInTheDocument();
    expect(queryByText(details.ammo)).toBeInTheDocument();

    expect(queryByText("Action:")).toBeInTheDocument();
    expect(queryByText(details.action)).toBeInTheDocument();
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