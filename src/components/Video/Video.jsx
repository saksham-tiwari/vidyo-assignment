import React, { useState } from 'react';
import "./Video.scss";

const Video = ({ videoMetadata, togglePlayPause, isPlaying, canvasRef, isLoading }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div className='VideoDiv' onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      {isLoading && <div className='loader'></div>}
      {(videoMetadata.duration !== 0) ? (
        // Play/Pause button (visible on hover when video is loaded)
        <button className={`btn playPauseBtn ${isVisible ? "show" : ""}`} onClick={togglePlayPause}>
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>pause</title>
              <path d="M14,19H18V5H14M6,19H10V5H6V19Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>play</title>
              <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>
          )}
        </button>
      ) : (
        // Message when no video source is available
        <p className={`playPauseBtn ${!isLoading ? "show" : ""}`}>No Video Source</p>
      )}
      <canvas
        ref={canvasRef}
        width="640"
        height="360"
        onClick={() => {
          if (videoMetadata.duration && !isLoading) togglePlayPause();
        }}
      />
    </div>
  );
}

export default Video;
