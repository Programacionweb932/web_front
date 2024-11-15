import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Formulario from './componente/Formulario';
import Registro from './componente/Registro';
import RegisterAdmin from './componente/RegisterAdmin';
import Home from './componente/Home';
import HomeTicket from './componente/HomeTicket';
import Mantenimiento from './componente/Mantenimiento';
import AgendarCita from './componente/AgendarCita';
import InstalacionOS from './componente/InstalacionOS';
import ReparacionPC from './componente/ReparacionPC';
import AsistenciaTecnica from './componente/AsistenciaTecnica';
import InstalacionOffice from './componente/InstalacionOffice';
import Ticket from './componente/TicketComponent';
import './App.css';

function App() {
  const [view, setView] = useState('login'); 
  const [user, setUser] = useState(null); 
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === '/admin') {
      setView('registro-admin');
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('https://web-back-eight.vercel.app/api/admin', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json(); 
        setUser(data.username); 
        setView('home'); 
      } else {
        const errorData = await response.json(); 
        alert(errorData.message || 'Credenciales incorrectas'); 
      }
    } catch (error) {
      alert('Error al iniciar sesión.'); 
    }
  };

  const handleNavigateToLogin = () => {
    setView('login');
    navigate('/login'); 
  };

  return (
    <div className="App">
      {user === null && (
        <div className="button-group">
          <h1>EL MUNDO DE LA TECNOLOGIA</h1>
          <button onClick={handleNavigateToLogin}>Login</button>
          <button onClick={() => setView('registro')}>Registro</button>
        </div>
      )}

  {/* Mostrar la vista correspondiente dependiendo del estado */}
  {user !== null ? (
     
     view === 'home' ? (
       <Home user={user} setUser={setUser} setView={setView} /> 
     ) : view === 'home-ticket' ? (  // Vista para los tickets
       <HomeTicket 
         setView={setView} 
       />
     ) : view === 'mantenimiento' ? (
       <Mantenimiento setView={setView} /> 
       
     ) : view === 'instalacion-os' ? (
       <InstalacionOS setView={setView} />
     ) : view === 'reparacion' ? (
       <ReparacionPC  setView={setView} />
     ) : view === 'asistencia-tecnica' ? (
       <AsistenciaTecnica setView={setView} />
     ) : view === 'instalacion-office' ? (
       <InstalacionOffice setView={setView} />
     ) : view === 'agendar-cita' ? (
       <AgendarCita setView={setView} /> 
     ) :  view === 'ticket' ? (
       <Ticket setView={setView} />
     ) : null
      ) : view === 'login' ? (
        <Formulario setUser={handleLogin} />
      ) : view === 'registro-admin' ? (
        <RegisterAdmin setRegisteredUsers={setRegisteredUsers} />  
      ) : (
        <Registro setRegisteredUsers={setRegisteredUsers} /> 
      )}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<App />} />
        <Route path="/registro" element={<App />} />
        <Route path="/admin" element={<RegisterAdmin />} /> 
      </Routes>
    </Router>
  );
}
