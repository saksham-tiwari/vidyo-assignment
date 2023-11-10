import React from 'react'
import "./Video.scss"

const Video = ({videoMetadata, togglePlayPause, isPlaying, canvasRef}) => {
  return (
    <div className='VideoDiv'>
      {videoMetadata.duration !== 0 && (<button className='playPauseBtn' onClick={togglePlayPause}>{isPlaying?"Pause":"Play"}</button>)}
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