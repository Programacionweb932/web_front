import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './login.css'; 

function Login() {
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
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setError('');
        navigate('/home'); // Redirige al usuario a la página de inicio
      } else {
        setError('Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      setError('Error al iniciar sesión.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Usuario:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Contraseña:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}

export default Login;