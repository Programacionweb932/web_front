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

    console.log('handleSubmit llamado');
  
   
  if (usuario === '' || contraseña === '') {
    setError('Todos los campos son obligatorios');
    return;
  }

  try {
    const response = await fetch('https://web-back-p.vercel.app/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: usuario, password: contraseña }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.msg || 'Error en el inicio de sesión');
      return;
    }

    const data = await response.json();
    const { token, user } = data;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);

    navigate(user.role === 'admin' ? '/home-admin' : '/home');
  } catch (err) {
    console.error('Error:', err);
    setError('Error al conectar con el servidor');
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
