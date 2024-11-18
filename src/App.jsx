import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Formulario from './componente/Formulario';
import Registro from './componente/Registro';
import RegisterAdmin from './componente/RegisterAdmin';
import Home from './componente/Home';
import HomeAdmin from './componente/HomeAdmin';
import HomeTicket from './componente/HomeTicket';
import Mantenimiento from './componente/Mantenimiento';
import AgendarCita from './componente/AgendarCita';
import InstalacionOS from './componente/InstalacionOS';
import ReparacionPC from './componente/ReparacionPC';
import AsistenciaTecnica from './componente/AsistenciaTecnica';
import InstalacionOffice from './componente/InstalacionOffice';
import HistorialTicket from './componente/HistorialTicket';
import TicketComponent from './componente/TicketComponent';
import Blog from './componente/Blog';
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
      const response = await fetch('https://web-back-p.vercel.app/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const loggedInUser = data.user;  // Asumiendo que el backend devuelve un objeto de usuario con el rol
        setUser(loggedInUser);

        // Verificar el rol y redirigir al usuario según sea 'admin' o 'user'
        if (loggedInUser.role === 'admin') {
          setView('home-admin');
          navigate('/home-admin');
        } else {
          setView('home');
          navigate('/home');
        }
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
      {
  user !== null ? (
    view === 'home' ? (
      <Home user={user} setUser={setUser} setView={setView} />
    ) : view === 'home-admin' ? (
      <HomeAdmin setView={setView} />
    ) : view === 'home-ticket' ? (
      <HomeTicket setView={setView} />
    ) : view === 'mantenimiento' ? (
      <Mantenimiento setView={setView} />
    ) : null
    ) : view === 'instalacion-os' ? (
      <InstalacionOS setView={setView} />
    ) : view === 'reparacion' ? (
      <ReparacionPC setView={setView} />
    ) : view === 'asistencia-tecnica' ? (
      <AsistenciaTecnica setView={setView} />
    ) : view === 'instalacion-office' ? (
      <InstalacionOffice setView={setView} />
    ) : view === 'blog' ? (
      <Blog setView={setView} />
    ) : view === 'agendar-cita' ? (
      <AgendarCita setView={setView} />
    ) : view === 'ticket' ? (
      <Ticket setView={setView} />
  ) : view === 'login' ? (
    <Formulario setUser={handleLogin} />
  ) : view === 'registro-admin' ? (
    <RegisterAdmin setRegisteredUsers={setRegisteredUsers} />
  ) : (
    <Registro setRegisteredUsers={setRegisteredUsers} />
  )
}

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
        <Route path="/home-admin" element={<HomeAdmin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mantenimiento" element={<Mantenimiento />} />
        <Route path="/home-ticket" element={<HomeTicket />} />
        <Route path="/historial-ticket" element={<HistorialTicket />} />
        <Route path="/agendar-cita" element={<AgendarCita />} />
        <Route path="/ticket" element={<TicketComponent />} />
        <Route path="/instalacion-os" element={<InstalacionOS />} />
        <Route path="/reparacion" element={<ReparacionPC />} />
        <Route path="/asistencia-tecnica" element={<AsistenciaTecnica />} />
        <Route path="/instalacion-office" element={<InstalacionOffice />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>
  );
}
