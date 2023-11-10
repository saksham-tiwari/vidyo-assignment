import React from 'react';
import "./Toaster.scss";

// Toaster component
const Toaster = () => {
  return (
    <div id="notifPopup">
        <div className='contentFlex'>
            <span className='popup-icon'>!</span> {/* Icon to indicate a notification or warning */}
            <p>The uploaded video has no Audio. Please try again.</p> {/* Message displayed to the user */}
        </div>
    </div>
  );
}

export default Toaster;
