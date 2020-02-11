import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { GoPlus } from 'react-icons/go';
import { IconContext } from 'react-icons';

import layout from '../../styles/layout.module.css';
import expandableSection from './expandable-section.module.css';

export default function ExpandableSection({ children, heading }) {
  var [isExpanded, setIsExpanded] = useState(false);

  return (
    <article>
      <header className={`${layout.rowStartCenter}`}>
        <h2 className={`${layout.rowCenterCenter} ${expandableSection.heading}`}>
          {heading}
        </h2>
        <button onClick={toggleExpand}>
          <IconContext.Provider value={{ size: '1.45em' }}>
            <GoPlus data-testid='go-plus-icon' />
          </IconContext.Provider>
        </button>
      </header>
      <section>
        {isExpanded ? children : null}
      </section>
    </article>
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

ExpandableSection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object
  ]).isRequired,
  heading: PropTypes.string.isRequired,
};