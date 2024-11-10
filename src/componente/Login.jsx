import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './login.css'; 

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Crea una instancia de useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevenimos que la página se recargue
    if (!username || !password) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    try {
      // Realiza la solicitud POST a tu API de backend
      const response = await fetch('https://web-back-blond.vercel.app/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }) // Envía el username y password como JSON
      });

      if (response.ok) {
        const data = await response.json(); // Obtiene la respuesta de la API
        setUser(data.username); // Actualiza el estado del usuario en el frontend
        navigate('/home'); // Redirige a la página de inicio
      } else {
        const errorData = await response.json(); // Obtiene el error de la respuesta
        setError(errorData.message || 'Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      setError('Error al iniciar sesión.'); // Maneja errores de red
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Usuario:
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
      </label>
      <br />
      <label>
        Contraseña:
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </label>
      <br />
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Muestra el mensaje de error */}
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}

export default Login;