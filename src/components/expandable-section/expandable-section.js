import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { IconContext } from 'react-icons';

import layout from '../../styles/layout.module.css';
import expandableSection from './expandable-section.module.css';

export function Expand({ isExpanded, onClick, text }) {
  var icon = <AiOutlinePlusCircle data-testid='ai-outlin-plus-icon' />;

  if (isExpanded) {
    icon = <AiOutlineMinusCircle data-testid='ai-outline-minus-icon' />
  }

  return (
    <button
      className={`${layout.rowStartCenter} ${expandableSection.expandBtn}`}
      onClick={onClick}
    >
      <span style={{ textAlign: 'start', width: '100%', maxWidth: '86%' }}>{text}</span>
      <IconContext.Provider value={{ color: '#36733F', size: '1.375em' }}>
        {icon}
      </IconContext.Provider>
    </button>
  );
}

export default function ExpandableSection({ children, heading }) {
  var [isExpanded, setIsExpanded] = useState(false);
  var section = useRef();

  return (
    <article className={expandableSection.wrapper}>
      <header className={`${layout.rowStartCenter} ${expandableSection.header}`}>
        <Expand isExpanded={isExpanded} onClick={toggleExpand} text={heading} />
      </header>
      <section >
        <div className={expandableSection.expanded} ref={section}>
          {isExpanded ? children : null}
        </div>
      </section>
    </article>
  );

  function toggleExpand(e) {
    e.preventDefault();

    if (isExpanded) {
      section.current.style.maxHeight = '0';
      section.current.style.color = '#e7e8c8';
      section.current.style.paddingTop = '0';
      setIsExpanded(false);
    } else {
      section.current.style.maxHeight = '1000vh';
      section.current.style.color = '#403D34';
      section.current.style.paddingTop = '1rem';
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