import React, { useState } from 'react';
import '../App.css';
import './Grabaciones.css';
import { Records } from './objgrabaciones';
import { propsVentanaGrabaciones } from '../code/interfaces';
import { Opciones } from '../componentes/headerventanas';
import { ventana } from '../code/types';
import { formatColor } from '../code/helpers';

export function Grabaciones(props: propsVentanaGrabaciones) {
  
  return (
    <div className='Grabaciones'>
      <Opciones setVentana={props.setVentana}/>
      <div className='contenido'>
        <div style={{display:'flex',
                     flexDirection:'column',
                     width:'40vw',
                     marginLeft: '5vw'
              }}>
          <div style={{height:'67.3vh',
                       overflowY:'scroll' 
                      }}>
            <table className='tabla' 
            style={{border:'0.2vw solid '+formatColor("cafe"),
                    backgroundColor: formatColor("blanco"),
                    color: formatColor("cafe")
            }}>
              <tr style={{backgroundColor: formatColor("cafe"),
                          color: formatColor("blanco"),
                          border:'0',
                          margin:'0'
              }}>
                <th colSpan={3}>Grabaciones Disponibles</th>
              </tr>
              <tr>
                <th>Nombre</th><th>Fecha</th><th>Duración</th>
              </tr>
              {Records.map((rec)=>{
                return <tr>
                  <td>{rec.nombre}</td><td>{rec.fecha}</td><td>{rec.duracion}</td>
                </tr>
              })}
            </table>
          </div>
          <div className='botones'>
            <div
            style={{color:formatColor("blanco"),
                    backgroundColor:formatColor("cafe"),
                    marginLeft:'1vw'
            }}><strong>Eliminar grabacion</strong></div>
            
            <div
            style={{color:formatColor("blanco"),
                    backgroundColor:formatColor("cafe"),
                    marginLeft:'auto',
                    marginRight:'1vw'
            }} onClick={()=>props.setVentana("Inicio")}><strong>Volver al inicio</strong></div>
          </div>
        </div>
        <div className='ver' 
        style={{backgroundColor: formatColor("blanco"),
                border:'0.5vw solid'+ formatColor("cafe"),
                color: formatColor("cafe")
        }}>
          Espacio para <br />
          visualizar la <br />
          grabacion <br />
          seleccionada <br />
        </div>


      </div>
    </div>
  );
}