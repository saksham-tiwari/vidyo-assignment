import React from 'react'

const Video = ({videoMetadata, togglePlayPause, isPlaying, canvasRef}) => {
  return (
    <div>
          {videoMetadata.duration !== 0 && (<button onClick={togglePlayPause}>{isPlaying?"Pause":"Play"}</button>)}
          <canvas
            ref={canvasRef}
            width="640"
            height="360"
            style={videoMetadata.duration?{}:{
              display:"none"
            }}
          />
        </div>
  )
}

export default Video