import React, { useRef } from 'react';
import './css/ActionBtn.css';

const ActionButtons = React.memo(function ActionButtons({ onEmojiClick, onFileSelect, setPostText, setPreviews, iconBtnRef }) {
    const imageInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onFileSelect(file); // Pasar el archivo directamente
        }
    };

    return (
        <div className="post-actions">
            <button
                className="media-ActionBtn"
                onClick={onEmojiClick}
                ref={iconBtnRef}  // Reference for the icon button
            >
                <span className="iconBtn">😀</span>
            </button>
            <button
                className="media-ActionBtn"
                onClick={() => imageInputRef.current.click()}
            >
                <span className="iconBtn">📷</span>
            </button>
            <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={imageInputRef}
                onChange={handleImageChange}
            />
        </div>
    );
});

export default ActionButtons;
