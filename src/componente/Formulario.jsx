import React, { useState } from 'react';
import './Formulario.css';

function Formulario({ setUser }) {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (usuario === '' || contraseña === '') {
      setError(true);
      return;
    }

    setError(false);
    setUser(usuario, contraseña); // Llama a la función de login en lugar de setUser([])
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
      </form>

      {error && <p className='error-message'>Todos los campos son obligatorios</p>}
    </section>
  );
}

export default Formulario;