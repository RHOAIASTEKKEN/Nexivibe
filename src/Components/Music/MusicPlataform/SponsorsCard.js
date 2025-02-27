import React from 'react';

export const SponsorsCard = ({ sponsors }) => (
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
);