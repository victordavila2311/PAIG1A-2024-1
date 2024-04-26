import React from 'react';
import '../App.css';
import { propsVentanaInicio } from '../code/interfaces';
import { formatColor } from '../code/helpers';
import './headerventanas.css';
export function Opciones(){
    let w:string='33.33333vw';
    return(
        <div className='opciones'>
            <div style={{backgroundColor:formatColor("azul"), 
            width:w, 
            textAlign:'center', height:'5vh',
            color:formatColor("blanco")}}>Practica</div>
            <div style={{backgroundColor:formatColor("cafe"), 
            width:w, 
            textAlign:'center', 
            color:formatColor("blanco")}}>Grabaciones</div>
            <div style={{backgroundColor:formatColor("verde"), 
            width:w, 
            textAlign:'center', 
            color:formatColor("blanco")}}>Datos</div>
        </div>
    )
}