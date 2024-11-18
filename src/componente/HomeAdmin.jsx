import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomeAdmin.css';

function HomeAdmin() {
  const [winners, setWinners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario está logueado y es admin
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      navigate('/login'); // Si no es admin o no está logueado, redirigir al login
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Eliminar el usuario del localStorage
    navigate('/login'); // Redirigir al login
  };

  return (
    <div className="home-admin">
      <h1>Tickets Administración</h1>

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
          {winners.map((ticket) => (
            <tr key={ticket.codigo}>
              <td>{ticket.ticket}</td>
              <td>{ticket.tema}</td>
              <td>{ticket.estadoticket}</td>
              <td>{ticket.fechacreacion}</td>
              <td>{ticket.tecnicoasignado}</td>
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
