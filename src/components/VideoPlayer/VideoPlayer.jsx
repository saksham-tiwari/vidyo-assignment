import React, { useRef, useEffect, useState } from "react";

const VideoPlayer = () => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoWidth, setVideoWidth] = useState(0);
  const [videoHeight, setVideoHeight] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoMetadata, setVideoMetadata] = useState({});

  const fps = 60;
  const canvasWidth = videoWidth;
  const canvasHeight = videoHeight;
  const canvasInterval = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];

    if (videoRef.current) {
      videoRef.current.src = URL.createObjectURL(file);
      videoRef.current.load();
      setShowVideo(true);

      videoRef.current.onloadedmetadata = () => {
        setVideoWidth(videoRef.current.videoWidth);
        setVideoHeight(videoRef.current.videoHeight);
        setDuration(videoRef.current.duration);

        // Extract and store video metadata
        const metadata = {};
        for (let i = 0; i < videoRef.current.seekable.length; i++) {
          metadata[`Seekable Range ${i + 1}`] = `Start: ${videoRef.current.seekable.start(i)}s, End: ${videoRef.current.seekable.end(i)}s`;
        }
        metadata["Current Time"] = `${videoRef.current.currentTime}s`;
        metadata["Volume"] = videoRef.current.volume;
        metadata["Playback Rate"] = videoRef.current.playbackRate;
        metadata["Muted"] = videoRef.current.muted;
        metadata["Autoplay"] = videoRef.current.autoplay;
        metadata["Controls"] = videoRef.current.controls;
        metadata["Loop"] = videoRef.current.loop;

        setVideoMetadata(metadata);
      };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || !videoRef.current) return;

    const drawImage = () => {
      canvas.getContext("2d", { alpha: false }).drawImage(videoRef.current, 0, 0, canvasWidth, canvasHeight);
    };

    const startCanvasInterval = () => {
      canvasInterval.current = window.setInterval(() => {
        drawImage();
      }, 1000 / fps);
    };

    videoRef.current.onplay = () => {
      clearInterval(canvasInterval.current);
      startCanvasInterval();
    };

    videoRef.current.onended = () => {
      clearInterval(canvasInterval.current);
    };

    videoRef.current.addEventListener("canplay", () => {
      videoRef.current.play();
      videoRef.current.pause();
    });

    return () => {
      clearInterval(canvasInterval.current);
    };
  }, [canvasWidth, canvasHeight]);

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
  };

  return (
    <div style={{ position: "relative" }}>
      <input type="file" accept="video/*" onChange={handleFileSelect} />
      <div className="video" style={showVideo ? {} : { display: "none" }}>
        <video
          ref={videoRef}
          width={videoWidth}
          height={videoHeight}
          style={{ display: "none" }}
          autoPlay={false}
        ></video>
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          style={{ border: "1px solid black" }}
        ></canvas>
        <div style={buttonStyle}>
          <button onClick={handlePlayPause}>
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      </div>
      {duration > 0 && (
        <div className="metadata">
          <h2>Video Metadata</h2>
          <p>Duration: {duration.toFixed(2)} seconds</p>
          <p>Video Width: {videoWidth}px</p>
          <p>Video Height: {videoHeight}px</p>
          <h3>Additional Metadata:</h3>
          <ul>
            {Object.entries(videoMetadata).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
