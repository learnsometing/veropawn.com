import { useState } from 'react';

export function useCurrentIndex(startIndex, onIndexChange, length) {
  var [value, setValue] = useState(startIndex);
  var handleClick = (e) => {
    let newIndex;
    e.preventDefault();
    if (e.currentTarget.name === 'next') {
      newIndex = (value + 1) % length;
    } else {
      newIndex = (value - 1) % length;
      if (newIndex === -1) {
        newIndex += length;
      }
    }

    setValue(newIndex)
    if (onIndexChange) {
      onIndexChange(newIndex)
    }
  };

  return {
    value,
    onClick: handleClick,
  };
}