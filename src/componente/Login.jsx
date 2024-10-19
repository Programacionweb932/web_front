import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './login.css'; 

function Login({ setUser }) { // Recibe setUser como prop
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Crea una instancia de useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    try {
      const response = await fetch('https://web-back-nu.vercel.app/api/login', { // Asegúrate de que la URL sea correcta
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setError(''); // Limpia el mensaje de error
        const data = await response.json(); // Obtiene los datos de la respuesta
        setUser(data.username); // Usa setUser para guardar el usuario logueado
        navigate('/home'); // Redirige al usuario a la página de inicio
      } else {
        const errorData = await response.json(); // Obtiene el mensaje de error del backend
        setError(errorData.message || 'Usuario o contraseña incorrectos.'); // Muestra el mensaje de error
      }
    } catch (error) {
      setError('Error al iniciar sesión.'); // Maneja errores de la red
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