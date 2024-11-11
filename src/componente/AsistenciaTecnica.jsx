import React from 'react';
import '../styles/AsistenciaTecnica.css'

function AsistenciaTecnica({ setView }) {
  return (
    <div className='asistencia-container'>
      <h1>Asistencia Tecnica y Remota</h1>
      <p>Es un servicio que brindamos al usuario con el fin de dar soporte o asesorar mediante vía telefónica o software 
        sin importar la distancia que se encuentre.</p>

        
        <div className="image-container-asist"> 
        <img
          src="/image adentro/asistencia.png"
          alt="Reparacion PC"
        />

        <div className="button-container">
  <button onClick={() => setView('home')} className="volver-servicio-btn">
    Volver a Servicios
  </button>
  <button 
    className="solicitar-servicio-btn"
    onClick={() => setView('agendar-cita')}
  >
    Agendar Cita
  </button>
          <button 
            className="generar-home-ticket-btn" // Nueva clase CSS para el botón de generar ticket
            onClick={() => setView('home-ticket')} // Lógica para cambiar la vista a 'ticket'
          >
            Gestionar Ticket
          </button>
</div>
</div>
</div>
  );
}

export default AsistenciaTecnica;
