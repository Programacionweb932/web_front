import React, { useState } from 'react';
import Formulario from './componente/Formulario'; 
import Registro from './componente/Registro'; 
import Home from './componente/Home'; 
import Mantenimiento from './componente/Mantenimiento';
import InstalacionOS from './componente/InstalacionOS';
import ReparacionPC from './componente/ReparacionPC';
import AsistenciaTecnica from './componente/AsistenciaTecnica';
import InstalacionOffice from './componente/InstalacionOffice';
import './App.css';

function App() {
  const [view, setView] = useState('login'); 
  const [user, setUser] = useState(null); 
  const [registeredUsers, setRegisteredUsers] = useState([
    { username: 'admin', password: 'admin123' } 
  ]); 

  // Función de manejo de inicio de sesión
  const handleLogin = (username, password) => {
    const foundUser = registeredUsers.find(
      user => user.username === username && user.password === password
    );

    if (foundUser) {
      setUser(username);
      setView('home');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  // Renderizado de la vista según el estado de `view`
  return (
    <div className="App">
      <h1>Bienvenido</h1>

      {/* Mostrar botones para alternar entre login y registro si no hay usuario logueado */}
      {user === null && (
        <div className="button-group">
          <button onClick={() => setView('login')}>Login</button>
          <button onClick={() => setView('registro')}>Registro</button>
        </div>
      )}

      {/* Mostrar la vista correspondiente dependiendo del estado */}
      {user !== null ? (
        // Si el usuario está logueado
        view === 'home' ? (
          <Home user={user} setUser={setUser} setView={setView} /> // Pasamos setView al Home para cambiar a las vistas de los servicios
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
        ) : null
      ) : view === 'login' ? (
        <Formulario setUser={handleLogin} /> // Mostrar formulario de login
      ) : (
        <Registro setRegisteredUsers={setRegisteredUsers} /> // Mostrar formulario de registro
      )}
    </div>
  );
}

export default App;
