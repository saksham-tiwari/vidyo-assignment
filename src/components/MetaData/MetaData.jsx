import React from 'react'
import './MetaData.scss'
const MetaData = ({videoMetadata, isLoading}) => {
  return (
    <div className='metaData-wrapper'>
      {(videoMetadata.duration && !isLoading)?<><h3>Meta Data</h3>
      <hr/>
          <ul>
            {Object.entries(videoMetadata).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul></>:
          <p>Metadata is visible once video is rendered</p>
          }
    </div>
  )
}

export default MetaData