import { useState } from 'react';

export function circularIndex(value, length) {
  return {
    get next() {
      return (value + 1) % length;
    },
    get prev() {
      let prev = (value - 1) % length;
      if (prev === -1) {
        prev += length;
      }

      return prev;
    },
  };
}

export function useCurrentIndex(startIndex, onIndexChange, length) {
  var [value, setValue] = useState(startIndex);
  var idx = circularIndex(value, length);

  return {
    value,
    onClick: handleClick,
    setTimer,
  };

  function handleClick(e) {
    e.preventDefault();

    let newIndex;

    if (e.currentTarget.name === 'next') {
      newIndex = idx.next;
    } else {
      newIndex = idx.prev;
    }

    setValue(newIndex);

    if (onIndexChange) {
      onIndexChange(newIndex);
    }
  };

  function setTimer(interval) {
    return setInterval(() => {
      setValue(idx.next);
    }, interval);
  }
}