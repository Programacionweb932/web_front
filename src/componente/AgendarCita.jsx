import React, { useState, useEffect } from 'react';
import '../styles/AgendarCita.css';
import { useNavigate } from 'react-router-dom';

const AgendarCita = ({ setView }) => { // Recibe setView como prop
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [hora, setHora] = useState('');
  const [availableHours, setAvailableHours] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Usamos navigate para redirigir

  // Función para obtener las horas disponibles
  const fetchAvailableHours = async (selectedDate) => {
    try {
      const response = await fetch(`https://web-back-p.vercel.app/api/agenda/hours`);
      if (!response.ok) {
        throw new Error('Error al obtener las horas disponibles');
      }
      const data = await response.json();
      setAvailableHours(data.availableHours); // Actualizar las horas disponibles
    } catch (error) {
      console.error(error.message);
      setAvailableHours([]); // Vaciar las horas si ocurre un error
    }
  };

  // Manejar el cambio de fecha y actualizar las horas disponibles
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    setHora(''); // Resetear la hora seleccionada
    fetchAvailableHours(selectedDate); // Obtener las horas disponibles para la fecha
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/agenda', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          hora,
          email,
          name,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al agendar la cita');
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage(error.message || 'Error al agendar la cita');
    }
  };

  return (
    <div className="agendar-cita-container">
      <h2>Agendar Cita</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group-cita">
          <label htmlFor="name">Nombre:</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group-cita">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group-cita">
          <label htmlFor="date">Fecha:</label>
          <input 
            type="date" 
            id="date" 
            value={date} 
            onChange={handleDateChange} 
            required 
          />
        </div>
        <div className="form-group-cita">
          <label htmlFor="hora">Hora:</label>
          <select 
            id="hora" 
            value={hora} 
            onChange={(e) => setHora(e.target.value)} 
            required
            disabled={!date || availableHours.length === 0}
          >
            <option value="">Seleccione una hora</option>
            {availableHours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={!hora}>Generar Cita</button>
      </form>

      {message && <p>{message}</p>}

      {/* Botón para regresar */}
      <button 
        className="go-home-button" 
        onClick={() => navigate('/home')}>
        Volver
      </button>
    </div>
  );
};

export default AgendarCita;
