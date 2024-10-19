import React, { useState } from 'react';
import './Formulario.css';

function Formulario({ setUser }) {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usuario === '' || contraseña === '') {
      setError(true);
      return;
    }

    try {
      // Enviar credenciales al backend
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: usuario, password: contraseña }),
      });

      const data = await response.json();

      if (response.ok) {
        // Si la respuesta es exitosa (login correcto)
        setUser(data.token);  // Guardar el token (puedes almacenarlo en el localStorage si lo necesitas)
        setError(false);
      } else {
        // Si las credenciales son incorrectas o hay un error
        setError(true);
      }
    } catch (error) {
      console.error('Error al conectarse al backend', error);
      setError(true);
    }
  };

  return (
    <section className="formulario-container">
      <h1>Login</h1>
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

        {/* Mensaje de error debajo del botón */}
        {error && <p className='error-message'>Credenciales incorrectas o campos vacíos</p>}
      </form>
    </section>
  );
}

export default Formulario;
