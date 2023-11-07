import React, { useRef, useEffect, useState } from "react";

const VideoPlayer = () => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const fps = 60;
  const width = 1280;
  const height = 720;
  let canvasInterval = null;

  const handleFileSelect = (event) => {
    const file = event.target.files[0];

    if (videoRef.current) {
      videoRef.current.src = URL.createObjectURL(file);
      videoRef.current.load();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || !videoRef.current) return;

    const drawImage = () => {
      canvas.getContext("2d", { alpha: false }).drawImage(videoRef.current, 0, 0, width, height);
    };

    const startCanvasInterval = () => {
      canvasInterval = window.setInterval(() => {
        drawImage();
      }, 1000 / fps);
    };

    videoRef.current.onplay = () => {
      clearInterval(canvasInterval);
      startCanvasInterval();
      setShowControls(true);
    };

    videoRef.current.onpause = () => {
      setShowControls(true);
    };

    videoRef.current.onended = () => {
      setShowControls(true);
    };

    videoRef.current.onloadedmetadata = () => {
      setDuration(videoRef.current.duration);
    };

    // Add event listener for the "canplay" event to start rendering when video is ready
    videoRef.current.addEventListener("canplay", () => {
      // Start rendering when video is ready
      videoRef.current.play();
      videoRef.current.pause();
    });

    return () => {
      clearInterval(canvasInterval);
    };
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const buttonStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: showControls ? "block" : "none",
  };

  return (
    <div style={{ position: "relative" }}>
      <input type="file" accept="video/*" onChange={handleFileSelect} />
      <video ref={videoRef} width={width} height={height} style={{ display: "none" }} autoPlay={false}></video>
      <canvas ref={canvasRef} width={width} height={height} style={{ border: "1px solid black" }}></canvas>
      <div style={buttonStyle}>
        <button onClick={handlePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
      {duration > 0 && (
        <p>Duration: {duration.toFixed(2)} seconds</p>
      )}
    </div>
  );
};

export default VideoPlayer;
