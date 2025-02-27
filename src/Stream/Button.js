import React from 'react';
import './Button.css'

const Button = ({ onClick }) => {
    return (
        <div className="button-wrapper">
            <div className="button-box">
                <button className="glow-button" onClick={onClick}>
                    DONAR
                </button>
                <div className="space">
                    {[31, 12, 57, 93, 23, 70, 6].map((index) => (
                        <span
                            key={index}
                            className="star"
                            style={{ animationDuration: `${index * 0.1}s` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Button;