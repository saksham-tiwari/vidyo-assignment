import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import MetaData from "../MetaData/MetaData";
import Video from "../Video/Video";
import WaveSurferComponent from "../WaveSurfer/WaveSurfer";

function Editor() {
  const [videoSrc, setVideoSrc] = useState(null);
  const [videoMetadata, setVideoMetadata] = useState({ duration: 0 });
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileRef = useRef(null);
  const [audioPresent, setAudioPresent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   videoRef.current = document.createElement("video");
  //   wavesurferRef.current = WaveSurfer.create({
  //     container: "#waveform",
  //     waveColor: "violet",
  //     progressColor: "purple",
  //     backend: "MediaElement",
  //   });

  //   wavesurferRef.current.on("seek", (progress) => {
  //     if (videoRef.current) {
  //       const newTime = videoRef.current.duration * progress;
  //       videoRef.current.currentTime = newTime;
  //     }
  //   });

  //   return () => {
  //     if (videoRef.current) {
  //       URL.revokeObjectURL(videoRef.current.src);
  //       videoRef.current = null;
  //     }
  //     if (wavesurferRef.current) {
  //       wavesurferRef.current.destroy();
  //     }
  //   };
  // }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const video = videoRef.current;
      video.src = url;
      setVideoSrc(url);
      video.onloadedmetadata = () => {
        setIsLoading(true);
        const audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();
        const source = audioContext.createMediaElementSource(video);
        const analyser = audioContext.createAnalyser();

        const gainNode = audioContext.createGain();
        gainNode.gain.value = 0;
        source.connect(analyser);
        analyser.connect(gainNode);
        gainNode.connect(audioContext.destination)
        analyser.fftSize = 2048;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        let audioPres = false;

        function hasAudio() {
          analyser.getByteFrequencyData(dataArray);
          const sum = dataArray.reduce((a, value) => a + value, 0);
          return sum > 0;
        }

        video.addEventListener("timeupdate", () => {
          if (!audioPres) {
            if (hasAudio()) {
              console.log("video has audio");
              audioPres = true;
            } else {
              console.log("video doesn't have audio");
            }
          }
        });

        // video.muted = true;
        video.play();

        setTimeout(()=>{
          video.pause();
          if (audioPres) {
            gainNode.gain.value = 1
            video.currentTime = 0;
            video.addEventListener("seeked", function drawThumbnail() {
              drawVideoFrame();
              video.pause();
              video.removeEventListener("seeked", drawThumbnail);
            });
            setVideoMetadata({
              duration: video.duration,
              height: video.videoHeight,
              width: video.videoWidth,
              aspectRatio: video.videoWidth / video.videoHeight,
              range: `${video.seekable.start(0)} - ${video.seekable
                  .end(0)
                  .toFixed(2)}`,
            });
            setIsLoading(false);
          } else{
            console.error("The uploaded video has no Audio. Please try again.");
            setIsLoading(false);
            setTimeout(()=>{window.location.reload()}, 3000)
          }
        }, 3000)
      };
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      if (audioBuffer.numberOfChannels === 0) {
        URL.revokeObjectURL(url);
        setVideoSrc(null);
        return;
      }
    }
  };

  const drawVideoFrame = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!isPlaying) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height,
      );
    }
    if (canvas && video) {
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      if (!video.paused && !video.ended) {
        requestAnimationFrame(drawVideoFrame);
      }
    }
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video.paused || video.ended) {
      setIsPlaying(true);
      video.play();
      drawVideoFrame();
    } else {
      setIsPlaying(false);
      video.pause();
    }
  };

  useEffect(() => {
    if (videoSrc) {
      wavesurferRef.current.load(videoSrc);
    }
  }, [videoSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const onTimeUpdate = () => {
        const currentTime = video.currentTime;
        const duration = video.duration;
        const progress = currentTime / duration;
        wavesurferRef.current.seekTo(progress);
        setVideoMetadata((prevMdata) => ({ ...prevMdata, currentTime }));
      };
      video.addEventListener("timeupdate", onTimeUpdate);
      return () => video.removeEventListener("timeupdate", onTimeUpdate);
    }
  }, [videoSrc]);
  
  return (
    <div
    >
      {
          isLoading && <div>Loading...</div>
      }
      <div>
        <Video videoMetadata={videoMetadata} togglePlayPause={togglePlayPause} isPlaying={isPlaying} canvasRef={canvasRef}/>
        <input
          type="file"
          ref={fileRef}
          accept="video/*"
          onChange={handleFileChange}
          style={{
            display: "none",
          }}
        />
        <WaveSurferComponent videoMetadata={videoMetadata} videoRef={videoRef} wavesurferRef={wavesurferRef}/>
      </div>
      <div>
          <button
            className={"uploadVideo"}
            onClick={() => { fileRef.current.click();}}
            disabled={videoMetadata.duration !== 0}
          >
            {videoMetadata.duration !== 0? "Video already uploaded!": "Upload"}
          </button>
        {videoSrc && (
          <MetaData videoMetadata={videoMetadata}/>
        )}
      </div>
    </div>
  );
}

export default Editor;