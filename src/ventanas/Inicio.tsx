import React from 'react';
import '../App.css';
import { propsVentanaInicio } from '../code/interfaces';
import { Boton } from '../componentes/boton';

export function Inicio(props: propsVentanaInicio) {
  return (
    <div className='Inicio'>
      <Boton
        color={'main'}
        texto={'Práctica'}
        size={{ h: '100px', w: '25%' }}
        onClick={() => props.setVentana('Practica')}
      />
      <Boton
        color={'main'}
        texto={'Grabaciones'}
        size={{ h: '100px', w: '25%' }}
        onClick={() => props.setVentana('Grabaciones')}
      />
      <Boton
        color={'main'}
        texto={'Datos'}
        size={{ h: '100px', w: '25%' }}
        onClick={() => props.setVentana('Datos')}
      />
    </div>
  );
}