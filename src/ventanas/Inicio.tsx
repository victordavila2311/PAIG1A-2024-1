import React from 'react';
import '../App.css';
import { propsVentanaInicio } from '../code/interfaces';
import { Boton } from '../componentes/boton';
import { formatColor } from '../code/helpers';


export function Inicio(props: propsVentanaInicio) {
  let btnheight:string='20vh'
  return (
    <div className='Inicio'>
      <header style={{color:formatColor("main"), fontSize:'2rem', height:'20vh'}}><strong>SIMULADOR DE<br/> LAPAROSCOPIA</strong></header>
      
      <img src={require('../Img/foto_prototipo.jpg')} alt="imagen simulador" style={{height:'56vh', borderRadius:'1vh'}} />
      <Boton
        color={'main'}
        texto={'Iniciar simulador'}
        size={{ h: btnheight, w: '25%' }}
        onClick={() => props.setVentana('Practica')}
      />
      
    </div>
  );
}