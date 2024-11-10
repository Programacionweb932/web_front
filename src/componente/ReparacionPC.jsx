import React from 'react';
import '../styles/ReparacionPC.css'

function ReparacionPC({ setView }) {
  return (
    <div className='Reparar-pc'>
      <h1>Reparacion de portatiles y PC </h1>
      <p>Realizamos una variedad de tareas y procedimientos, incluida la verificación de anomalías,<br /> 
        la limpieza y el reemplazo de piezas y materiales, que ayudan a evitar el mal funcionamiento de los equipos 
        informáticos y a mantenerlos funcionando según sus capacidades.</p>

        <div className="image-container"> 
        <img
          src="/image adentro/reparacion.png"
          alt="Reparacion PC"
        />

        <div className="button-container-reparacion">
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
export default ReparacionPC;
