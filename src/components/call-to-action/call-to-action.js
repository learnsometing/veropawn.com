import React from 'react';
import PropTypes from 'prop-types';

import callToAction from './call-to-action.module.css';
import layout from '../../styles/layout.module.css';

function CallToAction({ children, heading }) {
  return (
    <div className={`${layout.columnCenterCenter} ${callToAction.card}`}>
      <h2 className={callToAction.header}>
        {heading}
      </h2>
      {children}
    </div>
  );
}

CallToAction.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
  heading: PropTypes.string.isRequired,
};

export default CallToAction;