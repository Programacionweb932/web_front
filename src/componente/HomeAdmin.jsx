import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomeAdmin.css';

function HomeAdmin() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [updateState, setUpdateState] = useState({ ticketId: '', status: '', adminDescription: '' });
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
      setMessage(data.tickets?.length ? '' : 'No se encontraron tickets.');
    } catch (error) {
      setMessage(error.message);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  const updateTicket = async (ticketId, status, adminDescription) => {
    try {
      const response = await fetch('https://web-back-p.vercel.app/api/tickets/actualizar-estado', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ ticketId, status, adminDescription }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el ticket.');
      }

      const data = await response.json();
      setMessage(data.message);
      fetchTickets(); // Recargar la lista de tickets
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const handleUpdateClick = () => {
    const { ticketId, status, adminDescription } = updateState;
    if (ticketId && status) {
      updateTicket(ticketId, status, adminDescription);
      setUpdateState({ ticketId: '', status: '', adminDescription: '' });
    } else {
      setMessage('Por favor selecciona un ticket y un estado.');
    }
  };

  return (
    <div className="home-admin">
      <h1>Administración de Tickets</h1>

      {loading && <p>Cargando tickets...</p>}
      {message && <p>{message}</p>}

      <h2>Lista de Tickets</h2>
      <table className="ticket-table">
        <thead>
          <tr>
            <th>Ticket</th>
            <th>Tema</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Técnico</th>
            <th>Descripción (Cliente)</th>
            <th>Actualizar</th>
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
              <td>{ticket.adminDescription || 'Sin descripción'}</td>
              <td>
                <button
                  onClick={() =>
                    setUpdateState({ ticketId: ticket._id, status: ticket.status, adminDescription: '' })
                  }
                >
                  Seleccionar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {updateState.ticketId && (
        <div className="update-ticket-form">
          <h3>Actualizar Ticket</h3>
          <label>
            Estado:
            <select
              value={updateState.status}
              onChange={(e) => setUpdateState((prev) => ({ ...prev, status: e.target.value }))}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="En Progreso">En Progreso</option>
              <option value="Cerrado">Cerrado</option>
            </select>
          </label>
          <label>
            Descripción para el Cliente:
            <textarea
              value={updateState.adminDescription}
              onChange={(e) => setUpdateState((prev) => ({ ...prev, adminDescription: e.target.value }))}
            ></textarea>
          </label>
          <button onClick={handleUpdateClick}>Actualizar</button>
        </div>
      )}

      <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
}

export default HomeAdmin;
