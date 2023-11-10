import React, { useEffect } from 'react'
import WaveSurfer from "wavesurfer.js";
import './WaveSurfer.scss'

const WaveSurferComponent = ({videoMetadata, videoRef,wavesurferRef, isLoading}) => {
    useEffect(() => {
        videoRef.current = document.createElement("video");
        wavesurferRef.current = WaveSurfer.create({
          container: "#waveform",
          waveColor: "violet",
          progressColor: "purple",
          backend: "MediaElement",
        });
    
        wavesurferRef.current.on("seek", (progress) => {
          if (videoRef.current) {
            const newTime = videoRef.current.duration * progress;
            videoRef.current.currentTime = newTime;
          }
        });
    
        return () => {
          if (videoRef.current) {
            URL.revokeObjectURL(videoRef.current.src);
            videoRef.current = null;
          }
          if (wavesurferRef.current) {
            wavesurferRef.current.destroy();
          }
        };
      }, [videoRef, wavesurferRef]);
  return (
    <div className='waveSurferWrapper'>
        <div id="waveform" style={(videoMetadata.duration && !isLoading)?{}:{display:"none"}}/>
        {(videoMetadata.duration && !isLoading) ?<p>
        Audio Waveform
        </p>:<></>}
    </div>
  )
}

export default WaveSurferComponent