import React, { useState, useEffect, useRef } from 'react';
import '../../Styles/MusicComponent.css';
import Sectbar from '../Sectbar';
import CSSAudioVisualizer from './CSSAudioVisualizer';
import { ArtistModal } from './MusicPlataform/ArtistModal';
import { SearchBar } from './MusicPlataform/SearchBar';
import { MusicItem } from './MusicPlataform/MusicItem';
import { SponsorsCard } from './MusicPlataform/SponsorsCard';
import { allItems } from './MusicPlataform/mockData'

export const MusicPlatform = ({ leftSidebarVisible, rightSidebarVisible, user }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [, setShowArtistSongs] = useState(false);
    const [filteredResults, setFilteredResults] = useState([]);
    const [sponsors, setSponsors] = useState([]);
    const audioRef = useRef(null);

    useEffect(() => {
        fetch('http://localhost:3003/sponsors')
            .then((response) => response.json())
            .then((data) => setSponsors(data))
            .catch((error) => console.error('Error fetching sponsors:', error));
    }, []);

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
    }, [searchQuery]);

    const handlePlay = (audioUrl) => {
        if (audioRef.current) {
            audioRef.current.src = audioUrl;
            audioRef.current.play().catch(error => console.error("Error al reproducir:", error));
        }
    };

    const handlePause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
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
                                <SearchBar
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                />
                                {filteredResults.length > 0 && (
                                    <div className="results-container">
                                        {filteredResults.map((item) => (
                                            <MusicItem
                                                key={item.id}
                                                item={item}
                                                currentlyPlaying={currentlyPlaying}
                                                handlePlay={handlePlay}
                                                handlePause={handlePause}
                                                setSelectedArtist={setSelectedArtist}
                                                setCurrentlyPlaying={setCurrentlyPlaying}
                                            />
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
                                        <MusicItem
                                            key={item.id}
                                            item={item}
                                            currentlyPlaying={currentlyPlaying}
                                            handlePlay={handlePlay}
                                            handlePause={handlePause}
                                            setSelectedArtist={setSelectedArtist}
                                            setCurrentlyPlaying={setCurrentlyPlaying}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <SponsorsCard sponsors={sponsors} />
                    </div>
                </div>

                {selectedArtist && (
                    <ArtistModal
                        artist={selectedArtist}
                        onClose={() => {
                            setSelectedArtist(null);
                            setShowArtistSongs(false);
                        }}
                        leftSidebarVisible={leftSidebarVisible}
                        rightSidebarVisible={rightSidebarVisible}
                        handlePlay={handlePlay}
                        handlePause={handlePause}
                    />
                )}
            </div>
        </Sectbar>
    );
};

export default MusicPlatform;