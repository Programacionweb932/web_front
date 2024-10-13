import React, { useState } from 'react';
import './Home.css';

function Home({ user, setUser }) {
    const [showServices, setShowServices] = useState(false);

    const handleLogout = () => {
        setUser(null);
    };

    const toggleServices = () => {
        setShowServices(!showServices);
    };

    const services = [
        'Mantenimiento Preventivo y Correctivo', 
        'Instalación de Sistemas Operativos', 
        'Reparación de Portátiles y PC', 
        'Asistencia Técnica y Remota', 
        'Instalación de Paquetes Microsoft Office'
    ]; 

    return (
        <div className="home-container">
            <div className="welcome-message">
                <h1>Bienvenido al Mundo de la Tecnología</h1>
                <h2>Hola, {user ? user.name : 'Usuario'}!</h2>
                <h3>¿Qué servicio desea?</h3>
            </div>
            <button 
                className="services-button" 
                onClick={toggleServices}
                aria-expanded={showServices}
                aria-controls="services-list"
            >
                {showServices ? 'Ocultar Servicios' : 'Mostrar Servicios'}
            </button>
            {showServices && (
                <div className="services-container" id="services-list">
                    {services.map((service, index) => (
                        <button key={index} className="service-button">
                            {service}
                        </button>
                    ))}
                </div>
            )}
            <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
}

export default Home;