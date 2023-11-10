import React, { useState } from 'react'
import VideoPlayer from '../VideoPlayer/VideoPlayer'
// import WaveSurferComponent from '../WaveSurfer/WaveSurfer'
import "./styles.scss"
import Toaster from '../Toaster/Toaster'

const Wrapper = () => {
  const [err,setErr] = useState(false)
  return (
    <div className='Main-Wrapper'>
        {err && <Toaster/>}
        <h1>Video Player</h1>
        <VideoPlayer setErr={setErr}/>
    </div>
  )
}

export default Wrapper