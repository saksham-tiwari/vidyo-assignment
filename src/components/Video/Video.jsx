import React, { useState } from 'react'
import "./Video.scss"

const Video = ({videoMetadata, togglePlayPause, isPlaying, canvasRef,isLoading}) => {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <div className='VideoDiv' onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      {isLoading && <div className='loader'></div>}
      {(videoMetadata.duration !== 0) ? (<button className={`playPauseBtn ${isVisible?"show":""}`} onClick={togglePlayPause}>{isPlaying?"Pause":"Play"}</button>):<p className={`playPauseBtn ${!isLoading?"show":""}`}>No Video Source</p>}
      <canvas
        ref={canvasRef}
        width="640"
        height="360"
        // style={videoMetadata.duration?{}:{
        //   display:"none"
        // }}
      />
    </div>
  )
}

export default Video