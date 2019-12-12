/*
* A button placed in a menu that should trigger an event when clicked.
*/

import React from "react";

function MenuBtn({ text }) {
  return (
    <li>
      <button>
        {text}
      </button>
    </li>
  );
}

export { MenuBtn };