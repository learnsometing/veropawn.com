import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { GoPlus } from 'react-icons/go';
import { IconContext } from 'react-icons';

import layout from '../../styles/layout.module.css';
import expandableText from './expandable-text.module.css';

export default function ExpandableText({ children, heading }) {
  var [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      <button onClick={toggleExpand}>
        <div className={`${layout.rowStartCenter}`}>
          <h2 className={`${layout.rowCenterCenter} ${expandableText.heading}`}>
            {heading}
          </h2>
          <IconContext.Provider value={{ size: '1.45em' }}>
            <GoPlus />
          </IconContext.Provider>
        </div>
      </button>
      <div>
        {isExpanded ? children : null}
      </div>
    </div>
  );

  function toggleExpand(e) {
    e.preventDefault();

    if (isExpanded) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  }
}

ExpandableText.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  heading: PropTypes.string.isRequired,
};