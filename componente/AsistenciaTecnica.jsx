import React from 'react';

function AsistenciaTecnica({ setView }) {
  return (
    <div>
      <h1>Asistencia Tecnica y Remota</h1>
      <p>Es un servicio que brindamos al usuario con el fin de dar soporte o asesorar mediante vía telefónica o software 
        sin importar la distancia que se encuentre.</p>
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
  );
}

export default AsistenciaTecnica;
