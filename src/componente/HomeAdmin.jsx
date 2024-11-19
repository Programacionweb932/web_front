import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomeAdmin.css';

function HomeAdmin() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      navigate('/login');
    } else {
      fetchTickets();
    }
  }, [navigate]);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://web-back-p.vercel.app/api/tickets/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener los tickets.');
      }

      const data = await response.json();
      setTickets(data.tickets || []);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateTicketStatus = async (ticketId, newStatus) => {
    try {
      const response = await fetch('https://web-back-p.vercel.app/api/tickets/actualizar-estado', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ ticketId, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el estado del ticket.');
      }

      const data = await response.json();
      // Actualiza el ticket en el estado local
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === ticketId ? { ...ticket, status: data.ticket.status } : ticket
        )
      );
      alert(data.message);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="home-admin">
      <h1>Tickets Administración</h1>
      {loading && <p>Cargando tickets...</p>}
      {message && <p>{message}</p>}
      <table className="ticket-table">
        <thead>
          <tr>
            <th>Ticket</th>
            <th>Tema</th>
            <th>Estado Ticket</th>
            <th>Fecha Creación</th>
            <th>Técnico Asignado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td>{ticket.ticketNumber}</td>
              <td>{ticket.subject}</td>
              <td>{ticket.status}</td>
              <td>{new Date(ticket.date).toLocaleString()}</td>
              <td>{ticket.assignedTechnician || 'No asignado'}</td>
              <td>
                <select
                  value={ticket.status}
                  onChange={(e) => updateTicketStatus(ticket._id, e.target.value)}
                >
                  <option value="Abierto">Abierto</option>
                  <option value="En Proceso">En Proceso</option>
                  <option value="Cerrado">Cerrado</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
}

export default HomeAdmin;