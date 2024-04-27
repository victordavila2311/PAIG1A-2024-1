import React from 'react';
import '../App.css';
import { propsVentanaDatos } from '../code/interfaces';
import { Opciones } from '../componentes/headerventanas';

export function Datos(props: propsVentanaDatos) {
  return (
    <div className='Datos'>
      <Opciones setVentana={props.setVentana}/>
      <p>Datos</p>
    </div>
  );
}