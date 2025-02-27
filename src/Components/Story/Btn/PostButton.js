import React from 'react';

const PostButton = ({ onClick }) => {
    return (
        <button
            className="post-button"
            onClick={onClick}
            type="button"
        >
            Postear
            <style>{`
                .post-button {
                    width: 100%;
                    padding: 12px;
                    border: none;
                    border-radius: 8px;
                    background: linear-gradient(90deg, #00a2ff 0%, #0066cc 100%);
                    color: white;
                    font-weight: bold;
                    font-size: 16px;
                    cursor: pointer;
                    transition: opacity 0.2s;
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
                }

                .post-button:hover {
                    opacity: 0.9;
                }

                .post-button:disabled {
                    background: #cccccc;
                    cursor: not-allowed;
                    opacity: 0.7;
                }
            `}</style>
        </button>
    );
};

export default PostButton;