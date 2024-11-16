import React, { useState } from 'react';
import '../styles/RegisterAdmin.css';
import { useNavigate } from 'react-router-dom';

function RegisterAdmin({ setRegisteredUsers }) {
  const [username, setUsername] = useState('');
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
  
    // Verificar que los campos no estén vacíos
    if (!username || !password) {
      alert('El nombre de usuario y la contraseña son obligatorios');
      return;
    }
  
    try {
      const response = await fetch('https://web-back-p.vercel.app/api/Adminregister', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Si el registro fue exitoso, actualizamos los usuarios registrados
        setRegisteredUsers(prevUsers => [...prevUsers, { username, password }]);
        alert('Registro exitoso');
        navigate('/login'); // Redirigir a la página de login
      } else {
        setError(data.message || 'Error al registrar el administrador');
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      setError('Error al registrar el administrador.');
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
          <label>Nombre de usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <button type="submit">Registrar</button>
      </form>
      <button onClick={handleBackToLogin}>Volver a Login</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default RegisterAdmin;