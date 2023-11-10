import React, { useEffect } from 'react';
import WaveSurfer from "wavesurfer.js";
import './WaveSurfer.scss';

const WaveSurferComponent = ({ videoMetadata, videoRef, wavesurferRef, isLoading }) => {
    useEffect(() => {
        // Create video and WaveSurfer instances
        videoRef.current = document.createElement("video");
        wavesurferRef.current = WaveSurfer.create({
            container: "#waveform",
            waveColor: "#EC8F5E",
            progressColor: "#F3B664",
            backend: "MediaElement",
        });

        // Handle seeking in WaveSurfer waveform
        wavesurferRef.current.on("seek", (progress) => {
            if (videoRef.current) {
                const newTime = videoRef.current.duration * progress;
                videoRef.current.currentTime = newTime;
            }
        });

        // Clean up when the component unmounts
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
            <div id="waveform" style={(videoMetadata.duration && !isLoading) ? {} : { display: "none" }} />
            {(videoMetadata.duration && !isLoading) ? <p>
                Audio Waveform
            </p> : <></>}
        </div>
    );
}

export default WaveSurferComponent;
