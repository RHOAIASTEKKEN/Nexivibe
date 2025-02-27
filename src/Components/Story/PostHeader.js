import React from 'react';
import './Btn/css/PostHeader.css';
import ImgProfile from '../../Pages/ImgProfile';

const PostHeader = ({ postText, setPostText, user, previews, setPreviews, setFiles }) => {
    // Determine if there are any images to show
    const hasImages = previews.images && previews.images.length > 0;

    // Compute className dynamically
    const previewsContainerClassName = `previews-container${hasImages ? ' previews-container-preview' : ''}`;

    // Function to handle image removal
    const handleRemoveImage = (index) => {
        // Remove from previews
        setPreviews(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));

        // Remove from files
        setFiles(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));

        // Revoke the object URL to avoid memory leaks
        URL.revokeObjectURL(previews.images[index]);
    };

    return (
        <div className="post-header">
            <div className="avatar-placeholder">
                {user?.profile_photo ? (
                    <ImgProfile username={user.username} classImg="profile-class" />
                ) : (
                    <div className="default-avatar">Sin foto</div>
                )}
            </div>
            <input
                type="text"
                placeholder={`¿Qué estás pensando, ${user ? user.username : 'Usuario'}?`}
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
            />

            {/* Área de previsualización debajo del input */}
            <div className={previewsContainerClassName}>
                {/* Previsualización de imágenes */}
                {previews.images && previews.images.map((image, index) => (
                    <div key={index} className="preview-container">
                        <div className="preview">
                            <img src={image} alt={`Imagen ${index + 1}`} />
                            <button
                                className="remove-image-btn"
                                onClick={() => handleRemoveImage(index)}
                                type="button"
                                aria-label="Eliminar imagen"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                ))}

                {/* Previsualización de ubicación */}
                {previews.location && (
                    <div className="preview">
                        <p>Ubicación: {previews.location}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostHeader;