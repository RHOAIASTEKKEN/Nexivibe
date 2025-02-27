import React from 'react';

export const MusicItem = ({
    item,
    currentlyPlaying,
    handlePlay,
    handlePause,
    setSelectedArtist,
    setCurrentlyPlaying
}) => (
    <div className="result-item">
        <div className="item-info">
            <img
                src={item.artistInfo.image}
                alt={item.artist}
                className="item-image"
                onClick={() => setSelectedArtist(item)}
            />
            <div className="item-text">
                <h3>{item.title}</h3>
                <p>{item.artist}</p>
            </div>
        </div>
        <div className="reproduccion">
            <span className="icon-post icon-heart"> 0</span>
            <span className="text-sm text-pink-500">{item.plays}</span>
            <button
                className="play-button"
                onClick={() => {
                    if (currentlyPlaying === item.id) {
                        handlePause();
                        setCurrentlyPlaying(null);
                    } else {
                        handlePlay(item.artistInfo.songs[0].audioUrl);
                        setCurrentlyPlaying(item.id);
                    }
                }}
            >
                {currentlyPlaying === item.id ? "Pausar" : "Reproducir"}
            </button>
        </div>
    </div>
);
