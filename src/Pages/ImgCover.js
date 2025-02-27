import React, { useState, useEffect } from 'react';

function ImgCover({ username, classImg }) {
    const [coverPhoto, setCoverPhoto] = useState('/uploads/default-avatar.jpg');

    useEffect(() => {
        fetch(`http://localhost:3001/api/users/${username}/cover_photo`)
            .then(response => response.json())
            .then(data => {
                if (data.cover_photo) {
                    setCoverPhoto(`http://localhost:3001${data.cover_photo}`);
                }
            })
            .catch(error => console.error('Error al obtener la foto de portada:', error));
    }, [username]);

    return React.createElement('img', { className: classImg, src: coverPhoto, alt: 'Cover' });
}

export default ImgCover;
