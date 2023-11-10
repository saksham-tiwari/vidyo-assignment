import React from 'react'
import VideoPlayer from '../VideoPlayer/VideoPlayer'
// import WaveSurferComponent from '../WaveSurfer/WaveSurfer'
import "./styles.scss"

const Wrapper = () => {
  return (
    <div className='Main-Wrapper'>
        <h1>Video Player</h1>
        <VideoPlayer/>
    </div>
  )
}

export default Wrapper