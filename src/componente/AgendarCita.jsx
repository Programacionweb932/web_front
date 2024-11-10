import React, { useState } from 'react';
import '../styles/AgendarCita.css'

function AgendarCita({ setView }) {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  const handleAgendar = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para agendar la cita, por ejemplo, enviando los datos a un backend
    console.log('Cita agendada:', { nombre, fecha, hora });
    alert('Cita agendada con éxito');
    setView('home'); // Volver a la página principal después de agendar
  };

  return (
    <div className="agendar-cita-container">
      <h1>Agendar Cita</h1>
      <form className="agendar-cita-form" onSubmit={handleAgendar}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input 
            type="text" 
            id="nombre" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="fecha">Fecha:</label>
          <input 
            type="date" 
            id="fecha" 
            value={fecha} 
            onChange={(e) => setFecha(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="hora">Hora:</label>
          <input 
            type="time" 
            id="hora" 
            value={hora} 
            onChange={(e) => setHora(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="confirmar-btn">Confirmar Cita</button>
        <button type="button" className="volver-btn" onClick={() => setView('home')}>Volver</button>
      </form>
    </div>
  );
}

export default AgendarCita;
