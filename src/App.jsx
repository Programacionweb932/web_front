import React, { useState } from 'react';
import Formulario from '../componente/Formulario'; 
import Registro from '../componente/Registro'; 
import Home from '../componente/Home'; 
import mantenimientos from '../componente/mante-pre-corre';
import './App.css';

function App() {
  const [view, setView] = useState('login'); // Estado para cambiar entre login y registro
  const [user, setUser] = useState(null); // Estado para el usuario logueado
  const [registeredUsers, setRegisteredUsers] = useState([
    { username: 'admin', password: 'admin123' } // Usuario registrado por defecto
  ]); 

  // Función de manejo de inicio de sesión
  const handleLogin = (username, password) => {
    const foundUser = registeredUsers.find(
      user => user.username === username && user.password === password
    );

    if (foundUser) {
      setUser(username);
      setView('home'); // Si las credenciales son correctas, ir a home
    } else {
      alert('Credenciales incorrectas');
    }
  };

  // Renderizado de los componentes según la vista seleccionada
  return (
    <div className="App">
      <h1>Bienvenido</h1>

      {/* Botones para alternar entre login y registro */}
      {user === null && (
        <div className="button-group">
          <button onClick={() => setView('login')}>Login</button>
          <button onClick={() => setView('registro')}>Registro</button>
        </div>
      )}

      {/* Mostrar la vista actual según el valor de 'view' */}
      {user !== null ? (
        <Home user={user} setUser={setUser} /> // Si el usuario está logueado, ir al home
      ) : view === 'login' ? (
        <Formulario setUser={handleLogin} /> // Mostrar formulario de login
      ) : (
        <Registro setRegisteredUsers={setRegisteredUsers} /> // Mostrar formulario de registro
      )}
    </div>
  );
}

export default App;