import React, { useState } from 'react';
import '../App.css';
import { propsVentanaGrabaciones } from '../code/interfaces';
import { Opciones } from '../componentes/headerventanas';
import { ventana } from '../code/types';

export function Grabaciones(props: propsVentanaGrabaciones) {
  
  return (
    <div className='Grabaciones'>
      <Opciones setVentana={props.setVentana}/>
      <p>Grabaciones</p>
    </div>
  );
}