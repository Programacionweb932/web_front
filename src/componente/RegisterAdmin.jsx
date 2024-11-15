import React, { useState } from 'react';
import '../styles/RegisterAdmin.css';
import { useNavigate } from 'react-router-dom';

function RegistroAdmin({ setRegisteredUsers }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('https://web-back-eight.vercel.app/api/registroAdmin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario: username, correo: email, contraseña: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Error al registrar el administrador.');
        return;
      }

      setRegisteredUsers?.(prevUsers => [...prevUsers, { usuario: username, correo: email, contraseña: password }]);
      alert('Registro exitoso');
    } catch (error) {
      console.error('Error al registrar:', error);
      setError('No se pudo conectar con el servidor.');
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="registro-admin-container">
      <h2>Registro de Administrador</h2>
      <form onSubmit={handleRegister}>
      <div>
          <label>usuario :</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Correo :</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirmar Contraseña:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Registrar</button>
      </form>
      <button onClick={handleBackToLogin}>Login</button>
    </div>
  );
}

export default RegistroAdmin;
