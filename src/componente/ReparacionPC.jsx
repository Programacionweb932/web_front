import React from 'react';

function ReparacionPC({ setView }) {
  return (
    <div>
      <h1>Mantenimiento Preventivo y Correctivo</h1>
      <p>Esta es la página del servicio de mantenimiento.</p>
      <button onClick={() => setView('home')}>Volver a Servicios</button>
    </div>
  );
}

export default ReparacionPC;
