import React, { useState } from 'react';
import './Home.css';

function Home({ user, setUser, setView }) {
  const [showServices, setShowServices] = useState(false);

  const handleLogout = () => {
    setUser(null); 
    setView('login');
  };

  const toggleServices = () => {
    setShowServices(!showServices);
  };

  const services = [
    { name: 'Mantenimiento Preventivo y Correctivo', view: 'mantenimiento' },
    { name: 'Instalación de Sistemas Operativos', view: 'instalacion-os' },
    { name: 'Reparación de Portátiles y PC', view: 'reparacion' },
    { name: 'Asistencia Técnica y Remota', view: 'asistencia-tecnica' },
    { name: 'Instalación de Paquetes Microsoft Office', view: 'instalacion-office' }
  ];

  const handleServiceClick = (serviceView) => {
    setView(serviceView); // Cambiar la vista al servicio seleccionado
  };

  return (
    <div className="home-container">
      <div className="welcome-message">
        <h1>Bienvenido al Mundo de la Tecnología</h1>
        <h2>Hola, {user}!</h2>
        <h3>¿Qué servicio desea?</h3>
      </div>
      <button className="services-button" onClick={toggleServices}>
        {showServices ? 'Ocultar Servicios' : 'Mostrar Servicios'}
      </button>
      {showServices && (
        <div className="services-container">
          {services.map((service, index) => (
            <button
              key={index}
              className="service-button"
              onClick={() => handleServiceClick(service.view)}
            >
              {service.name}
            </button>
          ))}
        </div>
      )}
      <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
}

export default Home;
