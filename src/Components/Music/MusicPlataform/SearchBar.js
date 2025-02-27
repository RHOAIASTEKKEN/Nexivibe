import React from 'react';

export const SearchBar = ({ searchQuery, setSearchQuery }) => (
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
);
