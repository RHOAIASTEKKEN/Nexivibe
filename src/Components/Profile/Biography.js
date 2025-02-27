import React, { useState, useEffect } from 'react';
import '../../Styles/Biography.css';
import { ciudadesOptions, relacionOptions } from './BiographyOption';
import axios from 'axios';

const Biography = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [bioData, setBioData] = useState({
        trabajo: "",
        educacion: "",
        ciudad: "",
        relacion: "",
        descripcion: "",
        birthdate: "" // Added birthdate
    });

    const [tempData, setTempData] = useState(bioData);

    // Function to fetch user data
    useEffect(() => {
        const fetchBioData = async () => {
            try {
                const response = await axios.post(`http://localhost:3001/api/user/profile?username=${user.username}`);
                setBioData(response.data);
                setTempData(response.data);
            } catch (error) {
                console.error('Error al obtener datos:', error.response?.data || error.message);
                // Initialize with empty values if user does not exist
                const emptyData = {
                    trabajo: "",
                    educacion: "",
                    ciudad: "",
                    relacion: "",
                    descripcion: "",
                    birthdate: "" // Initialize birthdate
                };
                setBioData(emptyData);
                setTempData(emptyData);
            }
        };

        if (user.username) {
            fetchBioData();
        }
    }, [user.username]);

    const handleEdit = () => {
        setIsEditing(true);
        setTempData(bioData);
    };

    const handleSave = async () => {
        const username = user.username;
        try {
            await axios.post('http://localhost:3001/api/user/update-biography', {
                username,
                ...tempData
            });
            setBioData(tempData);
            setIsEditing(false);
        } catch (error) {
            console.error("Error al guardar los datos de la biografía", error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setTempData(bioData);
    };

    // Function to format birthdate into a readable format (DD/MM/YYYY)
    const formatBirthdate = (dateString) => {
        if (!dateString) return "No especificado";
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${day} de ${month} de ${year}`;
    };

    return (
        <div className="biography-card">
            <div className="biography-header">
                <h2>Biografía</h2>
                {!isEditing && (
                    <button className="edit-button" onClick={handleEdit}>
                        ✏️ Editar
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="edit-form">
                    <div className="form-group">
                        <label>Trabajo</label>
                        <input
                            type="text"
                            value={tempData.trabajo}
                            onChange={(e) => setTempData({ ...tempData, trabajo: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Educación</label>
                        <input
                            type="text"
                            value={tempData.educacion}
                            onChange={(e) => setTempData({ ...tempData, educacion: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Ciudad</label>
                        <select
                            value={tempData.ciudad}
                            onChange={(e) => setTempData({ ...tempData, ciudad: e.target.value })}
                            className="select-input"
                        >
                            <option value="">Selecciona una ciudad</option>
                            {ciudadesOptions.map((ciudad) => (
                                <option key={ciudad} value={ciudad}>
                                    {ciudad}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Estado civil</label>
                        <select
                            value={tempData.relacion}
                            onChange={(e) => setTempData({ ...tempData, relacion: e.target.value })}
                            className="select-input"
                        >
                            <option value="">Selecciona un estado civil</option>
                            {relacionOptions.map((relacion) => (
                                <option key={relacion} value={relacion}>
                                    {relacion}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Descripción</label>
                        <textarea
                            value={tempData.descripcion}
                            onChange={(e) => setTempData({ ...tempData, descripcion: e.target.value })}
                            rows={4}
                        />
                    </div>

                    <div className="button-group">
                        <button className="cancel-button" onClick={handleCancel}>
                            Cancelar
                        </button>
                        <button className="save-button" onClick={handleSave}>
                            Guardar
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bio-content">
                    <div className="bio-grid">
                        <div className="bio-item">
                            <h3>Trabajo</h3>
                            <p>{bioData.trabajo || "No especificado"}</p>
                        </div>

                        <div className="bio-item">
                            <h3>Educación</h3>
                            <p>{bioData.educacion || "No especificado"}</p>
                        </div>

                        <div className="bio-item">
                            <h3>Ciudad</h3>
                            <p>{bioData.ciudad || "No especificado"}</p>
                        </div>

                        <div className="bio-item">
                            <h3>Estado civil</h3>
                            <p>{bioData.relacion || "No especificado"}</p>
                        </div>

                        <div className="bio-birthdate bio-item">
                            <h3>Fecha de nacimiento</h3>
                            <p>{formatBirthdate(bioData.birthdate)}</p>
                        </div>
                    </div>

                    <div className="bio-description">
                        <h3>Descripción</h3>
                        <p>{bioData.descripcion || "No especificado"}</p>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Biography;
