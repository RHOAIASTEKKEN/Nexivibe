import React, { useState } from 'react';
import Sectbar from '../Components/Sectbar';
import ProfileHeader from '../Components/Profile/ProfileHeader';
import Biography from '../Components/Profile/Biography';
import ImgProfile from '../Pages/ImgProfile'
import ImgCover from './ImgCover';

const EditProfile = ({ user, leftSidebarVisible, rightSidebarVisible }) => {
    const [isHoveringProfile, setIsHoveringProfile] = useState(false);
    const [isHoveringCover, setIsHoveringCover] = useState(false);

    const handlePhotoUpload = async (event, type) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append(type === 'profile' ? 'profile_photo' : 'cover_photo', file);
        formData.append('username', user.username);

        try {
            const response = await fetch('http://localhost:3001/api/users/update-photos', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log(data)

            if (response.ok) {
                // Actualizar la imagen inmediatamente sin recargar la página
                const updatedPhoto = data.updates[type === 'profile' ? 'profile_photo' : 'cover_photo'];
                if (updatedPhoto) {
                    const imgElement = document.querySelector(`.${type === 'profile' ? 'profile-foto img' : 'cover_photo'}`);
                    if (imgElement) {
                        imgElement.src = updatedPhoto;
                    }
                }
            } else {
                console.error('Error:', data.message);
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al actualizar la foto');
        }
    };

    return (
        <Sectbar
            leftSidebarVisible={leftSidebarVisible}
            rightSidebarVisible={rightSidebarVisible}
            TituloSection="Perfil"
        >
            <div className="post">
                <section className="post-photo-user">
                    {user && (
                        <div className="profile-section">
                            <div
                                className="cover-photo-container"
                                onMouseEnter={() => setIsHoveringCover(true)}
                                onMouseLeave={() => setIsHoveringCover(false)}
                            >
                                <ImgCover
                                    username={user.username}
                                    classImg='cover_photo'
                                />
                                {isHoveringCover && (
                                    <label className="edit-overlay cover-overlay">
                                        <input
                                            type="file"
                                            className="file-input"
                                            accept="image/*"
                                            onChange={(e) => handlePhotoUpload(e, 'cover')}
                                        />
                                        <span className="edit-text">Editar foto de portada</span>
                                    </label>
                                )}
                            </div>

                            <article
                                className="profile-foto"
                                onMouseEnter={() => setIsHoveringProfile(true)}
                                onMouseLeave={() => setIsHoveringProfile(false)}
                            >
                                <div className="profile-image-container">
                                    <ImgProfile
                                        username={user.username}
                                        useOnError={false}
                                    />
                                    {isHoveringProfile && (
                                        <label className="edit-overlay profile-overlay">
                                            <input
                                                type="file"
                                                className="file-input"
                                                accept="image/*"
                                                onChange={(e) => handlePhotoUpload(e, 'profile')}
                                            />
                                            <span className="edit-text">Editar</span>
                                        </label>
                                    )}
                                </div>
                                <p>{user.name}</p>
                            </article>
                        </div>
                    )}
                </section>

                <section className="post-dats-user">
                    <article className="post-username">
                        <label>Username: </label>
                        <p>{user.username}</p>
                    </article>

                    <Biography user={user} />
                </section>
            </div>

            <ProfileHeader user={user} />

            <style>
                {`
                .cover-photo-container {
                    position: relative;
                    width: 100%;
                    height: 200px;
                }

                .profile-image-container {
                    position: relative;
                    width: 80px;
                    height: 80px;
                }

                .edit-overlay {
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: rgba(0, 0, 0, 0.5);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .cover-overlay {
                    inset: 0;
                    z-index: 2;
                }

                .profile-overlay {
                    inset: 0;
                    border-radius: 50%;
                }

                .edit-text {
                    color: white;
                    font-size: 14px;
                }

                .file-input {
                    display: none;
                }
                `}
            </style>
        </Sectbar>
    );
};

export default EditProfile;