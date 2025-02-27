import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/EmailVerification.css';

const EmailVerification = ({ user, onVerificationSuccess }) => {
    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [, setCodeSent] = useState(false);
    const navigate = useNavigate();

    // Memoizar la función con useCallback
    const sendVerificationCode = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:3001/api/send-verification-code', {
                email: user.email
            });

            if (response.data.success) {
                setCodeSent(true);
                setError('');
            } else {
                setError('Error al enviar el código de verificación.');
            }
        } catch (error) {
            console.error('Error al enviar el código:', error);
            setError('Error al enviar el código de verificación.');
        } finally {
            setLoading(false);
        }
    }, [user.email]); // Dependencias de useCallback

    // Ahora incluimos sendVerificationCode en las dependencias de useEffect
    useEffect(() => {
        console.log("Sending verification code...");
        sendVerificationCode();
    }, [sendVerificationCode]);


    const handleCodeChange = (e) => {
        setVerificationCode(e.target.value);
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        if (!user.email || !verificationCode) {
            setError('Por favor, completa todos los campos.');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3001/api/verify-code', {
                email: user.email,
                code: verificationCode
            });

            if (response.data.success) {
                onVerificationSuccess();
                navigate('/home');
            } else {
                setError('Código de verificación incorrecto.');
            }
        } catch (error) {
            console.error('Error al verificar el código:', error);
            setError('Hubo un error al verificar el código.');
        }
        setLoading(false);
    };


    const handleResendCode = () => {
        sendVerificationCode();
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="verification-container">
            <h1>Verificar Correo Electrónico</h1>
            <p>Se ha enviado un código de verificación a: {user.email}</p>

            <form onSubmit={handleVerifyCode}>
                <div>
                    <label>Ingresa el código de verificación enviado a tu correo:</label>
                    <input
                        type="text"
                        value={verificationCode}
                        onChange={handleCodeChange}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Verificando...' : 'Verificar'}
                </button>
            </form>

            <button
                onClick={handleResendCode}
                disabled={loading}
                style={{ marginTop: '10px' }}
            >
                Reenviar código
            </button>

            <button
                onClick={handleBackToHome}
                style={{ marginTop: '10px' }}
            >
                Regresar al inicio
            </button>
        </div>
    );
};

export default EmailVerification;