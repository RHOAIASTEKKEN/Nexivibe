import React from 'react';
import FileUpload from './FileUpload';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';

const MusicForm = ({
    formData,
    errors,
    previewImage,
    selectedFileName,
    isSubmitting,
    handleInputChange,
    handleImageChange,
    handleAudioChange,
    handleSubmit
}) => {
    return (
        <form onSubmit={handleSubmit} className="music-form">
            <FormInput
                label="Título de la Canción"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                error={errors.title}
            />

            <FormInput
                label="Género"
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                error={errors.genre}
            />

            <FormInput
                label="Compositores"
                type="text"
                name="composers"
                value={formData.composers}
                onChange={handleInputChange}
                placeholder="Separar nombres por comas"
                error={errors.composers}
            />

            <FormInput
                label="Productores"
                type="text"
                name="producers"
                value={formData.producers}
                onChange={handleInputChange}
                placeholder="Separar nombres por comas"
                error={errors.producers}
            />

            <FileUpload
                label="Imagen de Portada"
                accept="image/*"
                onChange={handleImageChange}
                previewImage={previewImage}
                error={errors.image}
            />

            <FileUpload
                label="Licencias"
                accept=".pdf,.doc,.docx,.txt"
                name="licenses"
                onChange={handleInputChange}
                fileInfo={formData.licenses ? formData.licenses.name : null}
                error={errors.licenses}
            />

            <FormTextarea
                label="Derechos"
                name="rights"
                value={formData.rights}
                onChange={handleInputChange}
                rows="3"
                error={errors.rights}
            />

            <FormTextarea
                label="Descripción"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                error={errors.description}
            />

            <FileUpload
                label="Archivo de Audio"
                accept="audio/*"
                onChange={handleAudioChange}
                fileInfo={selectedFileName}
                error={errors.audioFile}
            />

            {errors.submit && (
                <div className="error-message submit-error">{errors.submit}</div>
            )}

            <button type="submit" className="submit-button" disabled={isSubmitting}>
                {isSubmitting ? 'Subiendo...' : 'Subir Canción'}
            </button>
        </form>
    );
};

export default MusicForm;