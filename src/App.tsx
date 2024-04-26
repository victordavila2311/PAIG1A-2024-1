import React, { useState } from 'react';
import './App.css';
import { ventana } from './code/types';
import { Inicio } from './ventanas/Inicio';
import { Practica } from './ventanas/Practica';
import { Grabaciones } from './ventanas/Grabaciones';
import { Datos } from './ventanas/Datos';

function App() {
  const [ventanaActiva, setVentanaActiva] = useState<ventana>('Inicio');

  return ventanaActiva === 'Inicio' ?
    <Inicio setVentana={setVentanaActiva} /> :
    ventanaActiva === 'Practica' ?
      <Practica setVentana={setVentanaActiva} /> :
      ventanaActiva === 'Grabaciones' ?
        <Grabaciones setVentana={setVentanaActiva} /> :
        ventanaActiva === 'Datos' ?
          <Datos setVentana={setVentanaActiva} /> :
          <></>;
}

export default App;
