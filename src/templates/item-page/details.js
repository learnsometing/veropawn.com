import React from "react";
import PropTypes from "prop-types";

import layout from "../../styles/layout.module.css";
import itemPage from "./item-page.module.scss";

export const Detail = ({ name, value, ...props }) => {
  const detailClass = `${layout.rowStartCenter} ${itemPage.deet}`;
  return (
    <li className={itemPage.deetsLI}>
      <div className={detailClass}>
        <span className={itemPage.deetName}>{name}:</span><span>{value}</span>
      </div>
    </li>
  );
};

Detail.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export const createBaseList = (brand, model, invNum, id) => {
  let _brand = brand;
  let _model = model;
  if (brand === '' || brand === null || brand.match(/none/i)) {
    _brand = 'N/A';
  }

  if (model === '' || model === null || model.match(/none/i)) {
    _model = 'N/A';
  }

  return [
    <Detail key={`${id}-invNum`} name={"Inventory #"} value={invNum} />,
    <Detail key={`${id}-brand`} name={"Brand"} value={_brand} />,
    <Detail key={`${id}-model`} name={"Model"} value={_model} />,
  ];
};

export const createTypedList = (baseList, category, id, action, ammo, mass, metal) => {
  let typedList = [...baseList.values()];

  if (category === 'Firearm') {
    typedList.push(
      <Detail key={`${id}-ammo`} name={"Ammunition"} value={ammo} />,
      <Detail key={`${id}-action`} name={"Action"} value={action} />
    );
  } else if (category === 'Jewelry') {
    typedList.push(
      <Detail key={`${id}-metal`} name={"Metals"} value={metal} />,
      <Detail key={`${id}-mass`} name={"Mass"} value={mass} />
    );
  }

  return typedList;
};

export const DetailsList = ({ category, details, id, invNum, model, ...props }) => {
  const {
    action,
    ammo,
    brand,
    mass,
    metal,
    serial,
  } = details;

  let baseList = createBaseList(brand, model, invNum, id);
  let list = createTypedList(baseList, category, id, action, ammo, mass, metal);

  return (
    <ul className={itemPage.deetsList}>
      {list}
    </ul>
  );
};

DetailsList.propTypes = {
  category: PropTypes.string.isRequired,
  details: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  invNum: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
};

export const DetailsCard = ({ children, ...props }) => {
  var detailsColumnClass = `${layout.column} ${itemPage.deetsColumn}`;
  var detailsWrapperClass = `${layout.columnCenterCenter} ${itemPage.deetsWrapper}`;
  var deetsH2Class = `${layout.rowCenterCenter} ${itemPage.deetsH2}`
  return (
    <div className={detailsColumnClass}>
      <div className={itemPage.deetsCard}>
        <div className={detailsWrapperClass}>
          <header className={itemPage.deetsHeader}>
            <h2 className={deetsH2Class}>
              Details
            </h2>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
};

DetailsCard.propTypes = {
  children: PropTypes.object.isRequired,
};