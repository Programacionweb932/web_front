import React from 'react';
import '../styles/InstalacionOS.css';

function InstalacionOS({ setView }) {
  return (
    <div className='InstalacionOS'>
      <h1>Instalación de Sistemas Operativos</h1>
      <p>Si su computadora funciona con lentitud, actualizaremos y reinstalaremos el sistema operativo 
        para resolver los problemas de rendimiento. Desde la instalación y configuración hasta la optimización y resolución de problemas.
        </p>
  
        <div className="image-container"> 
        <img
          src="/image/sistemasOperativos.jpg"
          alt="sistemasOperativos"
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

export default InstalacionOS;
