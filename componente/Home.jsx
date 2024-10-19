import React from 'react';
import './Home.css';

function Home({ user, setUser, setView }) {
  const handleLogout = () => {
    setUser(null);
    setView('login');
  };

  const services = [
    { name: 'Mantenimiento Preventivo y Correctivo', view: 'mantenimiento', img: '/image/mantenimiento.jpg' },
    { name: 'Instalación de Sistemas Operativos', view: 'instalacion-os', img: '/image/asistencia.png' },
    { name: 'Reparación de Portátiles y PC', view: 'reparacion', img: '/image/reparacion.png' },
    { name: 'Asistencia Técnica y Remota', view: 'asistencia-tecnica', img: '/image/asistencia.png' },
    { name: 'Instalación de Paquetes Microsoft Office', view: 'instalacion-office', img: '/image/office.webp' }
  ];

  const handleServiceClick = (serviceView) => {
    setView(serviceView);
  };

  return (
    <div className="home-container">
      <div className="welcome-message">
        <h1>Bienvenido al Mundo de la Tecnología</h1>
        <h2>Hola, {user}!</h2>
        <h3>¿Qué servicio desea?</h3>
      </div>

      <div className="services-container">
        {services.map((service, index) => (
          <div key={index} className="service-item">
            {service.img && (
              <img
                src={service.img}
                alt={service.name}
                className="service-image"
              />
            )}
            <button
              className="service-button"
              onClick={() => handleServiceClick(service.view)}
            >
              {service.name}
            </button>
          </div>
        ))}
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
}

export default Home;
