import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import Home from './Pages/Home';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  // Verifica el estado de autenticación en el primer renderizado
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUserData = localStorage.getItem('userData');

    if (storedAuth === 'true' && storedUserData) {
      setIsAuthenticated(true);
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleGoogleLogin = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);

    const user = {
      name: decoded.name,
      picture: decoded.picture,
    };

    setUserData(user);
    setIsAuthenticated(true);

    // Almacenar la autenticación y los datos del usuario
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userData', JSON.stringify(user));
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUserData(null);
  };

  return (
    <GoogleOAuthProvider clientId="1036372558078-36hnkp6gahksj3embq59i5a1k5a9547t.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/home" />
              ) : (
                  <div className="login-container">
                    <img className='logo_login' src={require('./IMG/logo4.jpg')} alt='logo' />
                    
                  <h1>Welcome to TekkenConnect</h1>
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => alert("Login failed")}
                  />
                </div>
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
