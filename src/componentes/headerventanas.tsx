import React from 'react';
import '../App.css';
import { propsVentanaInicio } from '../code/interfaces';
import { formatColor } from '../code/helpers';
import './headerventana.css';
export function opciones(){
    return(
        <div className='opciones'>
            <div>Practica</div>
            <div>Grabaciones</div>
            <div>Datos</div>
        </div>
    )
}