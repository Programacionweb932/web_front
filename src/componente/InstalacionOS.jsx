import React from 'react';

function InstalacionOS({ setView }) {
  return (
    <div>
      <h1>Instalación de Sistemas Operativos</h1>
      <p>Esta es la página del servicio de instalación de sistemas operativos.</p>
      <button onClick={() => setView('home')}>Volver a Servicios</button>
    </div>
  );
}

export default InstalacionOS;
