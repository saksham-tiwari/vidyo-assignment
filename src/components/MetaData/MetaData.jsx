import React from 'react'
import './MetaData.scss'
const MetaData = ({videoMetadata}) => {
  return (
    <div className='metaData-wrapper'>
      <h3>Meta Data</h3>
      <hr/>
          <ul>
            {Object.entries(videoMetadata).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
    </div>
  )
}

export default MetaData