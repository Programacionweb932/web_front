import React from 'react';

function ReparacionPC({ setView }) {
  return (
    <div>
      <h1>Reparacion de portatiles y PC </h1>
      <p>Realizamos una variedad de tareas y procedimientos, incluida la verificación de anomalías,<br /> 
        la limpieza y el reemplazo de piezas y materiales,<br /> que ayudan a evitar el mal funcionamiento de los equipos 
        informáticos y a mantenerlos funcionando según sus capacidades.</p>
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
export default ReparacionPC;
