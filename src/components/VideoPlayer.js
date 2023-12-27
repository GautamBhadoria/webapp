import React, { useState, useRef, useEffect, useCallback } from 'react';
import { throttle } from 'lodash';
function VideoPlayer() {
    

  const [videoSrc, setVideoSrc] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [fps, setFps] = useState(30);
  
  const videoRef = useRef(null);
  const handleFPSChange = useCallback(throttle(newFps => {
    setFps(newFps);
  }, 500), []);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setVideoSrc(url);
  }

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
  }

  const handleFullscreenClick = () => {
    setIsFullscreen(!isFullscreen);
  }

  useEffect(() => {
    if (isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause(); 
    }
  }, [isPlaying]);
  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.playbackRate = fps / 30;
      }
    }, [fps]);
  

  return (
    <div className={`App ${isFullscreen ? 'fullscreen' : ''}`}>

      {/* Top Bar */}
      <div className="top-bar">

        {/* File Select */}
        <input 
          type="file"
          onChange={handleFileSelect}
        />

        {/* Play Button */}
        <button onClick={handlePlayClick}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        {/* FPS Slider */}
        <input 
          type="range"
          min={0}
          max={60}
          value={fps}
          onChange={(e) => setFps(e.target.value)}
        />
       
        {/* Fullscreen Toggle */}
        <button onClick={handleFullscreenClick}>
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'} 
        </button>

      </div>

      {/* Video Player */}
      <video
        ref={videoRef}
        src={videoSrc}
        width="100%"
        height="100%"
        frameBorder="0"
      />

    </div>
  );
}

export default VideoPlayer;