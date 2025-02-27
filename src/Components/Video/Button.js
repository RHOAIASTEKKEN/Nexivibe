import React from 'react';
import '../../Styles/BtnMenuVideo.css';  // Assuming you save the CSS in a file called styles.css

const Button = () => {
    return (
        <div className='btn-menu-video'>
            <div className="action-wrap">
                <button className="action" type="button">
                    <img className='action-icon' src='/Icons/home.webp' alt='Home' />
                    <span className="action-content" data-content="Home" />
                </button>
                <button className="action" type="button">
                    <img className='action-icon' src='/Icons/create.png' alt='Like' />
                    <span className="action-content" data-content="Create" />
                </button>
                <button className="action" type="button">
                    <img className='action-icon' src='/Icons/bookmark.png' alt='Comment' />
                    <span className="action-content" data-content="BookMark" />
                </button>
                <div className="backdrop" />
            </div>
        </div>
    );
}

export default Button;