// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import ImgProfile from '../Pages/ImgProfile';

function Header({ user }) {
    return (
        <nav className="home-nav">
            <div className="nav-logo">
                <Link to={'/home'}>
                    <img className="logo" src={require('../IMG/logo4.jpg')} alt="logo" />
                    TekkenConnect</Link>
            </div>
            {user && (
                <div className="nav-user">
                    <ImgProfile
                        username={user.username}
                        classImg='nav-profile-image'
                        useOnError={false}
                    />
                    <span>{user.name}</span>
                </div>
            )}
        </nav>
    );
}

export default Header;
