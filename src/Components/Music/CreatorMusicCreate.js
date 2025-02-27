import React, { useState } from 'react';
import '../../Styles/CreatorMusicCreate.css';
import MusicForm from './CreatorMusic/MusicForm';

function CreatorMusicCreate({ user }) {
    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        composers: '',
        producers: '',
        image: null,
        licenses: null,
        rights: '',
        description: '',
        audioFile: null,
    });

    const [errors, setErrors] = useState({});
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleImageChange = (file) => {
        if (file.size > 5000000) {
            setErrors(prev => ({ ...prev, image: 'La imagen no debe exceder 5MB' }));
            return;
        }
        if (!file.type.startsWith('image/')) {
            setErrors(prev => ({ ...prev, image: 'El archivo debe ser una imagen' }));
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => setPreviewImage(reader.result);
        reader.readAsDataURL(file);
        setFormData(prev => ({ ...prev, image: file }));
        setErrors(prev => ({ ...prev, image: null }));
    };

    const handleAudioChange = (file) => {
        if (file.size > 20000000) {
            setErrors(prev => ({ ...prev, audioFile: 'El archivo de audio no debe exceder 20MB' }));
            return;
        }
        if (!file.type.startsWith('audio/')) {
            setErrors(prev => ({ ...prev, audioFile: 'El archivo debe ser un audio' }));
            return;
        }
        setSelectedFileName(file.name);
        setFormData(prev => ({ ...prev, audioFile: file }));
        setErrors(prev => ({ ...prev, audioFile: null }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'El título es requerido';
        if (!formData.genre.trim()) newErrors.genre = 'El género es requerido';
        if (!formData.composers.trim()) newErrors.composers = 'Los compositores son requeridos';
        if (!formData.producers.trim()) newErrors.producers = 'Los productores son requeridos';
        if (!formData.image) newErrors.image = 'La imagen es requerida';
        if (!formData.licenses) newErrors.licenses = 'Las licencias son requeridas';
        if (!formData.rights.trim()) newErrors.rights = 'Los derechos son requeridos';
        if (!formData.description.trim()) newErrors.description = 'La descripción es requerida';
        if (!formData.audioFile) newErrors.audioFile = 'El archivo de audio es requerido';

        // Validación adicional de tipos de archivo
        if (formData.image && !formData.image.type.startsWith('image/')) {
            newErrors.image = 'El archivo debe ser una imagen';
        }
        if (formData.licenses && !['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'].includes(formData.licenses.type)) {
            newErrors.licenses = 'El archivo de licencias debe ser un PDF, DOC, DOCX o TXT';
        }
        if (formData.audioFile && !formData.audioFile.type.startsWith('audio/')) {
            newErrors.audioFile = 'El archivo debe ser un audio';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            const data = new FormData();

            // Agregar todos los campos al FormData
            Object.keys(formData).forEach(key => {
                data.append(key, formData[key]);
            });

            // Agregar userdata solo una vez
            data.append('userdata', user.username);

            try {
                const response = await fetch('http://localhost:3003/api/music/create', {
                    method: 'POST',
                    body: data
                });

                if (response.ok) {
                    // Limpiar el formulario después de un envío exitoso
                    setFormData({
                        title: '',
                        genre: '',
                        composers: '',
                        producers: '',
                        image: null,
                        licenses: null,
                        rights: '',
                        description: '',
                        audioFile: null,
                    });
                    setPreviewImage(null);
                    setSelectedFileName('');
                    alert('Canción subida exitosamente');
                } else {
                    const errorData = await response.json().catch(() => ({ error: 'Error desconocido' }));
                    setErrors(prev => ({ ...prev, submit: errorData.error || 'Error al subir la canción' }));
                }
            } catch (error) {
                console.error('Error:', error);
                setErrors(prev => ({ ...prev, submit: 'Error al subir la canción' }));
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="music-create-container">
            <h2 className="form-title">Subir Nueva Canción</h2>
            <MusicForm
                formData={formData}
                errors={errors}
                previewImage={previewImage}
                selectedFileName={selectedFileName}
                isSubmitting={isSubmitting}
                handleInputChange={handleInputChange}
                handleImageChange={handleImageChange}
                handleAudioChange={handleAudioChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}

export default CreatorMusicCreate;