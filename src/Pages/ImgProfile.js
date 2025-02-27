import React, { useState, useEffect } from 'react';

function ImgProfile({ username, classImg, useOnError = true }) {
    const [profilePhoto, setProfilePhoto] = useState(null);

    useEffect(() => {
        const fetchProfilePhoto = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/users/${username}/profile-photo`);
                if (!response.ok) throw new Error('No se pudo obtener la foto de perfil');

                const data = await response.json();
                setProfilePhoto(data.profile_photo);
            } catch (error) {
                console.error('Error al obtener la foto de perfil:', error);
                setProfilePhoto(null); // Mantener null para que el onError lo maneje si está activado
            }
        };

        fetchProfilePhoto();
    }, [username]);

    return (
        <img
            className={classImg}
            src={profilePhoto ? `http://localhost:3001${profilePhoto}` : '/Icons/friend.webp'}
            alt="Profile"
            {...(useOnError && {
                onError: (e) => {
                    e.target.src = '/Icons/friend.webp';
                    e.target.onerror = null;
                },
            })}
        />
    );
}

export default ImgProfile;
