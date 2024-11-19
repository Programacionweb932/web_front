import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomeAdmin.css';

function HomeAdmin() {
  const [tickets, setTickets] = useState([]); // Cambié winners por tickets para más claridad
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      navigate('/login'); // Si no es admin o no está logueado, redirigir al login
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
      if (data.tickets && data.tickets.length > 0) {
        setTickets(data.tickets);
        setMessage('');
      } else {
        setTickets([]);
        setMessage('No se encontraron tickets.');
      }
    } catch (error) {
      setMessage(error.message);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken'); // Asegúrate de limpiar el token también
    navigate('/login');
  };

  return (
    <div className="home-admin">
      <h1>Tickets Administración</h1>

      {loading && <p>Cargando tickets...</p>}

      {message && <p>{message}</p>}

      <h2>Lista de Tickets</h2>
      <table className="ticket-table">
        <thead>
          <tr>
            <th>Ticket</th>
            <th>Tema</th>
            <th>Estado Ticket</th>
            <th>Fecha Creación</th>
            <th>Técnico Asignado</th>
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
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <br />
      <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
}

export default HomeAdmin;
