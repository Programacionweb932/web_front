import React from 'react';

function HomeTicket({ setView }) {
  const handleCreateTicket = () => {
    setView('ticket'); // Ir a la vista de creación de ticket
  };

  const handleViewTicketsHistory = () => {
    setView('history'); // Ir a la vista de historial de tickets
  };

  const handleBackToHome = () => {
    setView('home'); // Volver a la vista principal de inicio
  };

  return (
    <div className="home-ticket-container">
      <h1>Gestión de Tickets</h1>
      
      <div className="home-ticket-buttons">
        <button onClick={handleCreateTicket}>Crear Ticket</button>
        <button onClick={handleViewTicketsHistory}>Ver Historial de Tickets</button>
        <button onClick={handleBackToHome}>Volver al Inicio</button>
      </div>
    </div>
  );
}

export default HomeTicket;