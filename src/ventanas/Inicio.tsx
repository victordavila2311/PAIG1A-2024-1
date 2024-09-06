import React, { useState } from 'react';
import '../App.css';
import './Inicio.css';
import { propsVentanaInicio } from '../code/interfaces';
import { Boton } from '../componentes/boton';
import { formatColor } from '../code/helpers';


export function Inicio(props: propsVentanaInicio) {
  let btnheight:string='20vh'
  const [tutorial, setTutorial] = useState<boolean>(false);
  return (
    <div className='Inicio'>
      <header style={{color:formatColor("main"), fontSize:'2rem', height:'20vh'}}><strong>SIMULADOR DE<br/> LAPAROSCOPIA</strong></header>
      <div className='info'onClick={()=>{
        setTutorial(prevState=>!prevState)
      }}>🛈</div>
      {tutorial?<div className='instrucciones' style={{backgroundColor:formatColor("blanco"), borderColor: formatColor('main')}}>
      <iframe style={{marginTop:'1vh', marginBottom:'1vh'}} width="560" height="315" src="https://www.youtube.com/embed/V5h6MUZEW6o?si=1pK4y3VSejGBkZAo" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      
      <a href={require('../pdf/PAI241G1A-Simulador Laparoscopia - Funciones.pdf')} download>
      <div className='descarga'
      style={{
        color: formatColor("blanco"),
        backgroundColor: formatColor("main"),
      }}><strong>Descargar Instructivo</strong></div></a>
      </div>:<></>}
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