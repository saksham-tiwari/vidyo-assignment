import React from 'react'
import "./Toaster.scss"
const Toaster = () => {
  return (
    <div id="notifPopup">
        <div className='contentFlex'>
            <span className='popup-icon'>!</span>
            <p>The uploaded video has no Audio. Please try again.</p>
        </div>
    </div>
  )
}

export default Toaster