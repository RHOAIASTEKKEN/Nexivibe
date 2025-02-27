import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Home from './Pages/Home';
import BirthdateInput from './Components/BirthdateInput';
import EmailVerification from './Components/EmailVerification';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [usernameError, setUsernameError] = useState('');

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUserData = localStorage.getItem('userData');

    if (storedAuth === 'true' && storedUserData) {
      setIsAuthenticated(true);
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleUsernameChange = async (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    setUsernameError('');

    if (newUsername.length < 3) return;

    try {
      const response = await axios.post('http://localhost:3001/api/check-username', {
        username: newUsername
      });

      if (response.data.exists) {
        setUsernameError('Este nombre de usuario ya está en uso');
      }
    } catch (error) {
      console.error('Error al verificar el username:', error);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);

    const user = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
      emailVerified: false, // Valor inicial
    };

    try {
      const checkResponse = await axios.post('http://localhost:3001/api/check-user', {
        email: user.email
      });

      if (checkResponse.data.exists) {
        setUserData(checkResponse.data.user);
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userData', JSON.stringify(checkResponse.data.user));
      } else {
        setUserData(user);
        setShowForm(true);
      }
    } catch (error) {
      console.error('Error al verificar el usuario:', error);
      alert('Hubo un error al verificar los datos.');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!username || !birthdate) {
      alert('Por favor completa todos los campos.');
      return;
    }

    if (usernameError) {
      alert('Por favor corrige los errores en el formulario.');
      return;
    }

    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('username', username);
    formData.append('birthdate', birthdate);

    const profilePhoto = document.querySelector('input[name="profile_photo"]').files[0];
    const coverPhoto = document.querySelector('input[name="cover_photo"]').files[0];

    if (profilePhoto) formData.append('profile_photo', profilePhoto);
    if (coverPhoto) formData.append('cover_photo', coverPhoto);

    try {
      const response = await axios.post('http://localhost:3001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert(response.data.message);
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userData', JSON.stringify({ ...userData, emailVerified: false }));

      setShowForm(false);
    } catch (error) {
      console.error('Error al subir las fotos:', error);
      alert('Hubo un error al subir las fotos.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUserData(null);
    setShowForm(false);
  };

  return (
    <GoogleOAuthProvider clientId="client-id">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                userData?.emailVerified ? (
                  <Navigate to="/home" />
                ) : (
                  <Navigate to="/verify-email" />
                )
              ) : showForm ? (
                <div className="form-container">
                  <h1>Completa tu registro</h1>
                  <form className='formLogin' onSubmit={handleFormSubmit}>
                    <img className='logo_login' src={require('./IMG/logo4.jpg')} alt='logo' />
                    <div className='flex-center'>
                      <label>Nombre de Usuario:</label>
                      <input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                      />
                      {usernameError && <p style={{ color: 'red', fontSize: '0.8em' }}>{usernameError}</p>}
                    </div>
                    <div className='flex-center'>
                      <label>Fecha de Nacimiento:</label>
                      <BirthdateInput
                        onBirthdateChange={(date) => setBirthdate(date)}
                      />
                    </div>
                    <div className='foto'>
                      <label>Foto:</label>
                      <input type='file' name="profile_photo" />
                    </div>
                    <div className='foto'>
                      <label>Portada:</label>
                      <input type='file' name="cover_photo" />
                    </div>

                    <button className='formRegister' type="submit">Registrar</button>
                  </form>
                </div>
              ) : (
                <div className="login-container">
                  <img className='logo_login' src={require('./IMG/logo4.jpg')} alt='logo' />
                  <h1>Registrarse con Google</h1>
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => alert('Error en el login')}
                  />
                </div>
              )
            }
          />
          <Route
            path="/verify-email"
            element={
              isAuthenticated && !userData?.emailVerified ? (
                <EmailVerification
                  user={userData}
                  onVerificationSuccess={() => {
                    setUserData({ ...userData, emailVerified: true });
                    localStorage.setItem(
                      'userData',
                      JSON.stringify({ ...userData, emailVerified: true })
                    );
                  }}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/home"
            element={
              isAuthenticated ? (
                <Home user={userData} handleLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
