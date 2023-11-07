import React, { useEffect, useRef, useState } from "react";

const VideoPlayer = () => {
  const canvasRef = useRef(null);
  const [videoFile, setVideoFile] = useState(null);
  const [duration, setDuration] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setVideoFile(file);
    const videoURL = URL.createObjectURL(file);
    if (videoRef.current) {
      videoRef.current.src = videoURL;
      videoRef.current.onloadedmetadata = () => {
        setDuration(videoRef.current.duration);
      };
    }
  };
  const drawVideo = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (videoRef.current && isPlaying) {
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      requestAnimationFrame(drawVideo);
    }
  };
  const handlePlayPause = () => {
    if (videoFile) {
      if (isPlaying) {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      } else {
        const videoURL = URL.createObjectURL(videoFile);

        if (videoRef.current) {
          videoRef.current.src = videoURL;
          videoRef.current.onloadedmetadata = () => {
            setDuration(videoRef.current.duration);
            videoRef.current.play().then(() => {
              setIsPlaying(true);
              drawVideo();
            }).catch(error => {
              console.error('Video play error:', error);
            });
          };
        }
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileSelect} />
      {duration && <p>Duration: {duration.toFixed(2)} seconds</p>}
      <canvas ref={canvasRef} width={500} height={500} style={{ border: "1px solid black" }} />
      <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
};

export default VideoPlayer;
