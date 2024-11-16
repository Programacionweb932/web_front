import React from 'react';
import "../styles/InstalacionOffice.css";


function InstalacionOffice({ setView }) {
  return (
    <div className='container-office'>
      <h1>Instalacion de Paquete de Microsoft Office</h1>
      <p>Instalamos  la mejor aplicación de productividad diaria que te ayuda a crear, 
        editar y compartir mientras viajas con Word, Excel y PowerPoint</p>

        <div className="image-container"> 
        <img
          src="/image adentro/office.png"
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
export default InstalacionOffice;
