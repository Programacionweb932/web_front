import React from 'react';

function InstalacionOS({ setView }) {
  return (
    <div>
      <h1>Instalación de Sistemas Operativos</h1>
      <p>Si su computadora funciona con lentitud, actualizaremos y reinstalaremos el sistema operativo 
        para resolver los problemas de rendimiento.<br /> Desde la instalación y configuración hasta la optimización y resolución de problemas.
        </p>
  
        <div className="image-container"> 
        <img
          src="/public/image/sistemasOperativos.jpg"
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
</div>
</div>
</div>
  );
}

export default InstalacionOS;
