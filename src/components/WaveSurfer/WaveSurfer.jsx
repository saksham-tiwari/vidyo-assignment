import React, { useEffect } from 'react'
import WaveSurfer from "wavesurfer.js";

const WaveSurferComponent = ({videoMetadata, videoRef,wavesurferRef}) => {
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
      }, []);
  return (
    <div>
        <div id="waveform"/>
        {videoMetadata.duration ?<p>
        Audio Waveform
        </p>:<></>}
    </div>
  )
}

export default WaveSurferComponent