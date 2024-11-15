import React, { useState, useEffect } from 'react';
import '../styles/TicketComponent.css';

const TicketComponent = ({ setView }) => {  // Recibe setView como prop
  const [token, setToken] = useState('');
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState(null);
  const [ticketsHistory, setTicketsHistory] = useState([]);
  const [description, setDescription] = useState(''); 
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleGenerateTicket = async () => {
    try {
      const response = await fetch('https://web-back-p.vercel.app/api/ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, subject, email, name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al generar el ticket');
      }

      const data = await response.json();
      setTicket(data.ticket);
      setError(null);
    } catch (error) {
      setError(error.message);
      setTicket(null);
    }
  };

  const fetchTicketsHistory = async () => {
    try {
      const response = await fetch('https://web-back-p.vercel.app/api/tickets', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al obtener el historial');
      }

      const data = await response.json();
      setTicketsHistory(data.tickets);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTicketsHistory();
    }
  }, [token]);

  return (
    <div className="ticket-container">
      <h2>Crear un ticket de soporte</h2>
      <div className="form-group">
        <label>Nombre</label>
        <input 
          type="text" 
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>E-Mail</label>
        <input 
          type="email" 
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Tema</label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="">Selecciona un tema</option>
          <option value="Consulta sobre el uso">Consulta sobre el uso</option>
          <option value="Problema técnico">Problema técnico</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
      <div className="form-group">
        <label>Asunto</label>
        <input 
          type="text" 
          placeholder="Asunto"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button onClick={handleGenerateTicket} className="ticket-button">
        Enviar Ticket
      </button>

      {ticket && (
        <div className="ticket-generated">
          <h3>Ticket Generado:</h3>
          <pre>{JSON.stringify(ticket, null, 2)}</pre>
        </div>
      )}

      {ticketsHistory.length > 0 && (
        <div className="ticket-history">
          <h3>Historial de Tickets</h3>
          <ul>
            {ticketsHistory.map((ticket) => (
              <li key={ticket._id}>
                <p>Descripción: {ticket.description}</p>
                <p>Estado: {ticket.status}</p>
                <p>Respuesta: {ticket.response}</p>
                <p>Fecha: {new Date(ticket.date).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <p className="error-message">Error: {error}</p>}

      {/* Botón para regresar al home */}
      <button 
  className="ggo-home-ticket-btn" 
  onClick={() => setView('home-ticket')} // Cambiar la vista a 'home' al hacer clic
>
  Volver
</button>
    </div>
  );
};

export default TicketComponent;
