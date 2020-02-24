import React from 'react';
import PropTypes from 'prop-types';

import layout from '../../styles/layout.module.css';
import itemPage from './item-page.module.css';

export const Detail = ({ name, value }) => (
  <li className={itemPage.deetsLI}>
    <div className={`${layout.rowStartCenter} ${itemPage.deet}`}>
      <span className={itemPage.deetName}>{name}:</span><span>{value}</span>
    </div>
  </li>
);

Detail.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export const DetailsList = ({ category, details, id, invNum, model }) => {
  var detailsList = createDetailsList();

  if (category === 'Firearm') {
    addFirearmDetailsToList();
  } else if (category === 'Jewelry') {
    addJewelryDetailsToList();
  }

  return (
    <ul className={itemPage.deetsList}>
      {detailsList}
    </ul>
  );

  function createDetailsList() {
    let brand = details.brand;
    let _model = model;

    if (fieldIsEmpty(brand)) {
      brand = 'N/A';
    }

    if (fieldIsEmpty(_model)) {
      _model = 'N/A';
    }

    return [
      <Detail key={`${id}-invNum`} name={'Inventory #'} value={invNum} />,
      <Detail key={`${id}-brand`} name={'Brand'} value={brand} />,
      <Detail key={`${id}-model`} name={'Model'} value={_model} />,
    ];

    function fieldIsEmpty(field) {
      return field === '' || field === null || field.match(/none/i);
    }
  }

  function addFirearmDetailsToList() {
    const action = details.action;
    const ammo = details.ammo;
    detailsList.push(
      <Detail key={`${id}-ammo`} name={'Ammunition'} value={ammo} />,
      <Detail key={`${id}-action`} name={'Action'} value={action} />
    );
  }

  function addJewelryDetailsToList() {
    const mass = details.mass;
    const metal = details.metal;
    detailsList.push(
      <Detail key={`${id}-metal`} name={'Metals'} value={metal} />,
      <Detail key={`${id}-mass`} name={'Mass'} value={mass} />
    );
  }
};

DetailsList.propTypes = {
  category: PropTypes.string.isRequired,
  details: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  invNum: PropTypes.string.isRequired,
  model: PropTypes.string,
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