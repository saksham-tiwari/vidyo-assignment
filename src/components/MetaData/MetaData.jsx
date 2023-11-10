import React from 'react';
import './MetaData.scss';

const MetaData = ({ videoMetadata, isLoading }) => {
    return (
        <div className='metaData-wrapper'>
            {(videoMetadata.duration && !isLoading) ? (
                // Display metadata when video is available and not loading
                <>
                    <h3>Meta Data</h3>
                    <hr />
                    <ul>
                        {Object.entries(videoMetadata).map(([key, value]) => (
                            <li key={key}>
                                <strong>{key}:</strong> {value}
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                // Display message when metadata is not available
                <p>Metadata is visible once video is rendered</p>
            )}
        </div>
    );
}

export default MetaData;
