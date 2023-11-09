import React from 'react'

const MetaData = ({videoMetadata}) => {
  return (
    <div>
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