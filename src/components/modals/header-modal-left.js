/*
* Header Modal Left
*
* Modal for header menu dropdown content that appears on the left side of the screen.
* 
* Renders the menu in state.headerModalLeft.state.
* 
*/

import React from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement('#___gatsby');

export default ({ state, closeModal }) => {
  return (
    <ReactModal
      isOpen={state.isOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 1
        },
        content: {
          width: '85vw',
          height: '100%',
          position: 'fixed',
          top: '48px',
          left: 0,
          margin: 0,
          borderRadius: 0,
          backgroundColor: '#fff',
          zIndex: 1,
          overflowY: 'auto',
          overflowX: 'hidden'
        }
      }}
    >
      {state.menu}
    </ReactModal >
  );
}