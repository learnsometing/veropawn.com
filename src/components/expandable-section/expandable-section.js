import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { IconContext } from 'react-icons';

import layout from '../../styles/layout.module.css';
import expandableSection from './expandable-section.module.css';

export function ExpandIcon({ isExpanded }) {
  var icon = <AiOutlinePlusCircle data-testid='ai-outlin-plus-icon' />;

  if (isExpanded) {
    icon = <AiOutlineMinusCircle data-testid='ai-outline-minus-icon' />
  }

  return (
    <IconContext.Provider value={{ size: '2em' }}>
      {icon}
    </IconContext.Provider>
  );
}

export default function ExpandableSection({ children, heading }) {
  var [isExpanded, setIsExpanded] = useState(false);
  return (
    <article>
      <header className={`${layout.rowStartCenter} ${expandableSection.header}`}>
        <h2 className={`${layout.rowCenterCenter} ${expandableSection.heading}`}>
          {heading}
        </h2>
        <button
          className={`${layout.columnCenterCenter} ${expandableSection.expandBtn}`}
          onClick={toggleExpand}
        >
          <ExpandIcon isExpanded={isExpanded} />
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