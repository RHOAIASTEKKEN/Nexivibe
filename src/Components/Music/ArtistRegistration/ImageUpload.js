const ImageUpload = ({ onChange, previewImage, error }) => {
    return (
        <div className="form-group">
            <label className="form-label">Logo o Foto del Artista</label>
            <input type="file" accept="image/*" onChange={(e) => onChange(e.target.files[0])} className="form-input" />
            {previewImage && <img src={previewImage} alt="Preview" className="image-preview" />}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default ImageUpload;