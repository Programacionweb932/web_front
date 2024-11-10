import React, { useState } from 'react';
import Formulario from './componente/Formulario'; 
import Registro from './componente/Registro'; 
import Home from './componente/Home'; 
import Mantenimiento from './componente/Mantenimiento';
import AgendarCita from './componente/AgendarCita';
import InstalacionOS from './componente/InstalacionOS';
import ReparacionPC from './componente/ReparacionPC';
import AsistenciaTecnica from './componente/AsistenciaTecnica';
import InstalacionOffice from './componente/InstalacionOffice';
import './App.css';

function App() {
  const [view, setView] = useState('login'); 
  const [user, setUser] = useState(null); 
  const [registeredUsers, setRegisteredUsers] = useState([
  ]); 

  
  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('https://web-back-blond.vercel.app/api/login', { 
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

  
  return (
    <div className="App">
     
      {/* Botones para alternar entre login y registro */}
      {user === null && (
        <div className="button-group">
          <h1>EL MUNDO DE LA TECNOLOGIA</h1>
          <button onClick={() => setView('login')}>Login</button>
          <button onClick={() => setView('registro')}>Registro</button>
        </div>
      )}

     {/* Mostrar la vista correspondiente dependiendo del estado */}
     {user !== null ? (
     
        view === 'home' ? (
          <Home user={user} setUser={setUser} setView={setView} /> 
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
        ) : null
      ) : view === 'login' ? (
        <Formulario setUser={handleLogin} /> 
      ) : (
        <Registro setRegisteredUsers={setRegisteredUsers} /> 
      )}
    </div>
  );
}

export default App;