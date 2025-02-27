import React, { useState, useEffect, useMemo, useRef } from 'react';
import '../../Styles/MusicComponent.css';
import Sectbar from '../Sectbar';
import CSSAudioVisualizer from './CSSAudioVisualizer';

const MusicPlatform = ({ leftSidebarVisible, rightSidebarVisible, user }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [showArtistSongs, setShowArtistSongs] = useState(false);
    const [filteredResults, setFilteredResults] = useState([]);
    const [sponsors, setSponsors] = useState([]);
    const audioRef = useRef(null);

    useEffect(() => {
        // Hacer la solicitud a la API
        fetch('http://localhost:3003/sponsors')
            .then((response) => response.json())
            .then((data) => setSponsors(data))
            .catch((error) => console.error('Error fetching sponsors:', error));
    }, []);

    const allItems = useMemo(() => [
        {
            id: 1,
            title: "Neon Dreams",
            artist: "Artista 1",
            plays: "1.5M",
            artistInfo: {
                bio: "Artista innovador en el género electrónico, conocido por fusionar elementos de synthwave con música clásica electrónica.",
                image: "/api/placeholder/150/150",
                social: {
                    instagram: "@artista1",
                    twitter: "@artista1",
                    facebook: "artista1",
                    tiktok: "artista1",
                    youtube: "art256"
                },
                songs: [
                    {
                        id: 'a1',
                        title: "Neon Dreams",
                        duration: "3:45",
                        plays: "800K",
                        audioUrl: "/test/Algo Me Gusta De Ti.mp3"
                    },
                ]
            }
        },
        {
            id: 2,
            title: "Neon Dreams",
            artist: "Artista 1",
            plays: "1.5M",
            artistInfo: {
                bio: "Artista innovador en el género electrónico, conocido por fusionar elementos de synthwave con música clásica electrónica.",
                image: "/api/placeholder/150/150",
                social: {
                    instagram: "@artista1",
                    twitter: "@artista1",
                    facebook: "artista1",
                    tiktok: "artista1",
                    youtube: "art256"
                },
                songs: [
                    {
                        id: 'a1',
                        title: "Neon Dreams",
                        duration: "3:45",
                        plays: "800K",
                        audioUrl: "/test/TheHu-WolfTotemExtended.mp3"
                    },
                ]
            }
        }
    ], []);

    useEffect(() => {
        if (searchQuery) {
            const results = allItems.filter(item =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.artist.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredResults(results);
        } else {
            setFilteredResults([]);
        }
    }, [searchQuery, allItems]);

    const handlePlay = (audioUrl) => {
        if (audioRef.current) {
            audioRef.current.src = audioUrl;
            audioRef.current.load(); // Asegura que el audio se recargue
            audioRef.current.play().catch(error => console.error("Error al reproducir:", error));
        }
    };


    const handlePause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    const ArtistModal = ({ artist, onClose }) => {
        const [playingSong, setPlayingSong] = useState(null);

        return (
            <Sectbar
                leftSidebarVisible={leftSidebarVisible}
                rightSidebarVisible={rightSidebarVisible}
            >
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{artist.artist}</h2>
                            <button onClick={onClose} className="close-button">✕</button>
                        </div>

                        <div className="artist-info">
                            <img src={artist.artistInfo.image} alt={artist.artist} className="artist-image" />
                            <div>
                                <p className="artist-bio">{artist.artistInfo.bio}</p>
                                <div className="social-links">
                                    {Object.entries(artist.artistInfo.social).map(([platform, handle]) => (
                                        <a
                                            key={platform}
                                            href={`https://${platform}.com/${handle.replace('@', '')}`}
                                            className="social-link"
                                            target='_blank'
                                            rel="noopener noreferrer"
                                        >
                                            <span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span> {handle}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowArtistSongs(!showArtistSongs)}
                            className="toggle-songs-button"
                        >
                            {showArtistSongs ? "Ocultar música" : "Ver música del artista"}
                        </button>

                        {showArtistSongs && (
                            <div className="songs-list">
                                <div className="song-header">
                                    <span>Título</span>
                                    <span>Duración</span>
                                    <span>Reproducciones</span>
                                    <span></span>
                                </div>
                                {artist.artistInfo.songs.map((song) => (
                                    <div key={song.id} className="song-item">
                                        <span className="song-title">{song.title}</span>
                                        <span className="song-duration">{song.duration}</span>
                                        <span className="song-plays">{song.plays}</span>
                                        <button
                                            className="play-button"
                                            onClick={() => {
                                                if (playingSong === song.id) {
                                                    handlePause();
                                                    setPlayingSong(null);
                                                } else {
                                                    handlePlay(song.audioUrl);
                                                    setPlayingSong(song.id);
                                                }
                                            }}
                                        >
                                            {playingSong === song.id ? "Pausar" : "Reproducir"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Sectbar>
        );
    };

    return (
        <Sectbar
            leftSidebarVisible={leftSidebarVisible}
            rightSidebarVisible={rightSidebarVisible}
        >
            <div className="app-container">
                <div className="visualizer-wrapper">
                    <audio ref={audioRef} />
                    <CSSAudioVisualizer audioRef={audioRef} />
                </div>
                <div className="main-grid">
                    <div className="col-span-3 space-y-6">
                        <div className="card">
                            <div className="card-header">
                                <h2 className="card-title">Buscar Música</h2>
                            </div>
                            <div className="card-content">
                                <div className="search-container">
                                    <input
                                        type="text"
                                        placeholder="Buscar artistas o canciones..."
                                        className="search-input"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <span className="search-icon">🔍</span>
                                </div>
                                {filteredResults.length > 0 && (
                                    <div className="results-container">
                                        {filteredResults.map((item) => (
                                            <div key={item.id} className="result-item">
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
                                                <span className="icon-post icon-heart"> 0</span>
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
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="card card-purple-border">
                            <div className="card-header">
                                <h2 className="card-title">Top 1000</h2>
                            </div>
                            <div className="card-content">
                                <div className="space-y-4">
                                    {allItems.map((item) => (
                                        <div key={item.id} className="result-item">
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
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <div className="card card-pink-border sponsors-card">
                            <div className="card-header">
                                <h2 className="card-title">Patrocinadores</h2>
                            </div>
                            <div className="card-content">
                                {sponsors.map((sponsor) => (
                                    <div key={sponsor.id} className="sponsor-item">
                                        <div className="sponsor-header">
                                            <h4 className="sponsor-name">{sponsor.name}</h4>
                                            <span className="sponsor-type">{sponsor.type}</span>
                                        </div>
                                        <p className="sponsor-description">{sponsor.description}</p>
                                        <a href="http://" className="sponsor-link">
                                            Visitar <span>↗</span>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {selectedArtist && (
                    <ArtistModal
                        artist={selectedArtist}
                        onClose={() => {
                            setSelectedArtist(null);
                            setShowArtistSongs(false);
                        }}
                    />
                )}

            </div>
        </Sectbar>
    );
};

export default MusicPlatform;
