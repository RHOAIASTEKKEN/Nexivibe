import React from 'react';

const StoryMedia = ({ mediaUrls, openModal }) => {
    const urls = Array.isArray(mediaUrls) ? mediaUrls : [];

    const getGridStyle = (imageCount) => {
        switch (imageCount) {
            case 1:
                return {
                    gridTemplateColumns: '1fr'
                };
            case 2:
                return {
                    gridTemplateColumns: '1fr 1fr'
                };
            case 3:
                return {
                    gridTemplateColumns: '1fr 1fr 1fr'
                };
            case 4:
                return {
                    gridTemplateColumns: '1fr 1fr',
                    gridTemplateRows: '1fr 1fr'
                };
            case 5:
                return {
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridTemplateRows: '1fr 1fr'
                };
            case 6:
                return {
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridTemplateRows: '1fr 1fr'
                };
            default:
                return {
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridAutoRows: '1fr'
                };
        }
    };

    const containerStyle = {
        display: 'grid',
        gap: '8px',
        width: '100%',
        ...getGridStyle(urls.length)
    };

    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '8px',
        cursor: 'pointer'
    };

    return (
        <>
            {urls.length > 0 && (
                <div className="story-media" style={containerStyle}>
                    {urls.map((url, index) => (
                        <img
                            className="imagen_post"
                            key={index}
                            src={`http://localhost:3001${url}`}
                            alt={`Contenido ${index + 1}`}
                            style={imageStyle}
                            onClick={() => openModal(urls, index)}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

export default StoryMedia;