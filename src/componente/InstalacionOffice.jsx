import React from 'react';

function InstalacionOffice({ setView }) {
  return (
    <div>
      <h1>Instalacion de Paquete de Microsoft Office</h1>
      <p>Instalamos  la mejor aplicación de productividad diaria que te ayuda a crear, 
        editar y compartir mientras viajas con Word, Excel y PowerPoint</p>
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
export default InstalacionOffice;
