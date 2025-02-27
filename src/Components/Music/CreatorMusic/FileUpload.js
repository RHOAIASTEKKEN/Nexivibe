import React from 'react';

const FileUpload = ({ label, accept, onChange, previewImage, fileInfo, error }) => {
    return (
        <div className="form-group">
            <label>{label}</label>
            <input
                type="file"
                accept={accept}
                onChange={(e) => onChange(e.target.files[0])}
                className="file-input"
            />
            {previewImage && (
                <img
                    src={previewImage}
                    alt="Preview"
                    className="image-preview"
                />
            )}
            {fileInfo && (
                <div className="file-info">
                    <p>Archivo seleccionado: {fileInfo}</p>
                </div>
            )}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default FileUpload;