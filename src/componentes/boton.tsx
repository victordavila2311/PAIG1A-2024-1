import React from 'react';
import '../App.css';
import './boton.css';
import { propsBoton } from '../code/interfaces';
import { formatColor } from '../code/helpers';


export function Boton(props: propsBoton) {
  return (
    <button
      onClick={props.onClick}
      className='Boton'
      style={{ backgroundColor: formatColor(props.color), height: props.size.h, width: props.size.w}}>
      <p>{props.texto}</p>
    </button>
  );
}