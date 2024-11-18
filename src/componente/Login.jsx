import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Asegúrate de usar useNavigate
import '../styles/Formulario.css'

function Formulario({ setUser }) {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState(false);
  const [view, setView] = useState(null); // Nueva variable de estado para manejar la vista
  const navigate = useNavigate(); // Usamos navigate para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usuario === '' || contraseña === '') {
      setError(true);
      return;
    }

    setError(false);

    try {
      // Realizamos la solicitud al backend
      const response = await fetch('https://web-back-p.vercel.app/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usuario, password: contraseña }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token, user } = data; // Obtén el token y los datos del usuario

        // Guarda el token y la información del usuario en localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        // Redirige inicialmente a la página de inicio (para usuarios comunes)
        setView('home'); // Cambiar la vista con setView
        // Si es admin, redirigir a home-admin
        if (user.role === 'admin') {
          setView('home-admin'); // Cambiar la vista con setView
          navigate('/home-admin'); // Redirige a home-admin si es admin
        }
      } else {
        const errorData = await response.json();
        setError(errorData.msg || 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      setError('Error al iniciar sesión.'); // Manejamos cualquier error en la red
    }
  };

  return (
    <section className="formulario-container">
      <h1>INICIO DE SESION</h1>
      <form className='formulario' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='usuario'>Usuario</label>
          <input 
            id='usuario'
            type="text" 
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
            placeholder='Ingrese su usuario'
          />
        </div>
        
        <div className='form-group'>
          <label htmlFor='contraseña'>Contraseña</label>
          <input 
            id='contraseña'
            type="password"
            value={contraseña}
            onChange={e => setContraseña(e.target.value)}
            placeholder='Ingrese su contraseña'
          />
        </div>
        
        <button type="submit">Iniciar Sesión</button>
      </form>

      {error && <p className='error-message'>{error}</p>} {/* Mostramos el mensaje de error */}
    </section>
  );
}

export default Formulario;
