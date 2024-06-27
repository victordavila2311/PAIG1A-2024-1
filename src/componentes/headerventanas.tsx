import React from 'react';
import '../App.css';
import { propsVentanaInicio } from '../code/interfaces';
import { formatColor } from '../code/helpers';
import './headerventanas.css';
export function Opciones(props: propsVentanaInicio){
    let w:string='33.33333vw';
    return(
        <div className='opciones'>
            <div style={{backgroundColor:formatColor("azul"), 
            width:w, 
            textAlign:'center', height:'5vh',
            color:formatColor("blanco")}} 
            onClick={() => props.setVentana('Practica')}><strong>Práctica</strong></div>
            <div style={{backgroundColor:formatColor("cafe"), 
            width:w, 
            textAlign:'center', 
            color:formatColor("blanco")}}
            onClick={() => props.setVentana('Grabaciones')}><strong>Grabaciones</strong></div>
            <div style={{backgroundColor:formatColor("verde"), 
            width:w, 
            textAlign:'center', 
            color:formatColor("blanco")}}
            onClick={() => props.setVentana('Datos')}><strong>Datos</strong></div>
        </div>
    )
}