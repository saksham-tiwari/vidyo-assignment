import React, { useState } from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import "./styles.scss";
import Toaster from '../Toaster/Toaster';

// Wrapper component
const Wrapper = () => {
  // State to manage errors
  const [err, setErr] = useState(false);

  return (
    <div className='Main-Wrapper'>
        {err && <Toaster/>} {/* Display the Toaster component when err is true */}
        <h1>Video Player</h1> {/* Heading for the video player */}
        <VideoPlayer setErr={setErr} /> {/* VideoPlayer component */}
    </div>
  );
}

export default Wrapper;
