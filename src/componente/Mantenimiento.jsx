import React from 'react';
import '../styles/Mantenimiento.css'

function Mantenimiento({ setView }) {
  return (
    <div className="mantenimiento-container"> 
      <h1>Mantenimiento Preventivo y Correctivo</h1>
      <p>El mantenimiento preventivo se realiza a equipos en funcionamiento con el fin de prevenir posibles daños
        causados por uso o desgaste,< br/> a diferencia del mantenimiento correctivo que repara aquellos que dejan de 
        funcionar o están dañados.
      </p>

      <div className="image-container"> 
        <img
          src="/image/img1.png"
          alt="Mantenimientos"
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

export default Mantenimiento;
