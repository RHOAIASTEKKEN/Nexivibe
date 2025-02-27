import { useState } from 'react';
import ImageUpload from './ImageUpload';
import FormInput from './FormInput';

const RegistrationForm = ({ user }) => {
    const [formData, setFormData] = useState({
        logo: null,
        artistName: '',
        registrationNumber: '',
        registrationType: 'IMPI'
    });
    const [errors, setErrors] = useState({});
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (file) => {
        if (file.size > 5000000) {
            setErrors(prev => ({ ...prev, logo: 'El archivo no debe exceder 5MB' }));
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => setPreviewImage(reader.result);
        reader.readAsDataURL(file);
        setFormData(prev => ({ ...prev, logo: file }));
        setErrors(prev => ({ ...prev, logo: null }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.logo) newErrors.logo = 'Por favor sube un logo o foto';
        if (!formData.artistName.trim()) newErrors.artistName = 'El nombre del artista es requerido';
        if (!formData.registrationNumber.trim()) {
            newErrors.registrationNumber = 'El número de registro es requerido';
        } else if (formData.registrationType === 'IMPI' && !/^\d{7}$/.test(formData.registrationNumber)) {
            newErrors.registrationNumber = 'El número de registro IMPI debe tener 7 dígitos';
        } else if (formData.registrationType === 'WIPO' && !/^[A-Z0-9]{12}$/.test(formData.registrationNumber)) {
            newErrors.registrationNumber = 'El número de registro WIPO debe tener 12 caracteres alfanuméricos';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const data = new FormData();
            data.append('logo', formData.logo);
            data.append('artistName', formData.artistName);
            data.append('registrationNumber', formData.registrationNumber);
            data.append('registrationType', formData.registrationType);
            data.append('usersectionname', user.username);

            try {
                const response = await fetch('http://localhost:3003/api/artists/register', {
                    method: 'POST',
                    body: data
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Formulario enviado:', result);
                    setFormData({ logo: null, artistName: '', registrationNumber: '', registrationType: 'IMPI' });
                    setPreviewImage(null);
                } else {
                    const errorData = await response.json();
                    console.error('Error al enviar el formulario:', errorData.error);
                    setErrors(prev => ({ ...prev, submit: errorData.error }));
                }
            } catch (error) {
                console.error('Error de red:', error);
                setErrors(prev => ({ ...prev, submit: 'Error de red al enviar el formulario' }));
            }
        }
    };

    return (
        <div className="registration-form">
            <h2 className="form-title">Registro de Artista</h2>
            <form onSubmit={handleSubmit}>
                <ImageUpload onChange={handleImageChange} previewImage={previewImage} error={errors.logo} />
                <FormInput
                    label="Nombre del Artista/Grupo"
                    type="text"
                    value={formData.artistName}
                    onChange={(e) => setFormData(prev => ({ ...prev, artistName: e.target.value }))}
                    placeholder="Nombre del artista o grupo"
                    error={errors.artistName}
                />
                <FormInput
                    label="Tipo de Registro"
                    type="select"
                    value={formData.registrationType}
                    onChange={(e) => setFormData(prev => ({ ...prev, registrationType: e.target.value }))}
                    options={[
                        { value: 'IMPI', label: 'IMPI (México)' },
                        { value: 'WIPO', label: 'WIPO (Internacional)' }
                    ]}
                />
                <FormInput
                    label="Número de Registro"
                    type="text"
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, registrationNumber: e.target.value }))}
                    placeholder={`Número de registro ${formData.registrationType}`}
                    error={errors.registrationNumber}
                />
                <button type="submit" className="submit-button">Registrar</button>
                {errors.submit && <p className="error-message">{errors.submit}</p>}
            </form>
        </div>
    );
};

export default RegistrationForm;