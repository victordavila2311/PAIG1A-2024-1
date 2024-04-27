import React from 'react';
import '../App.css';
import './Datos.css';
import { propsVentanaDatos } from '../code/interfaces';
import { Opciones } from '../componentes/headerventanas';
import { formatColor } from '../code/helpers';
import { Records } from './objgrabaciones';
import { Stats } from '../componentes/stats';

export function Datos(props: propsVentanaDatos) {
  
  let cant:number=4
  return (
    <div className='Datos'>
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
            style={{border:'0.2vw solid '+formatColor("verde"),
                    backgroundColor: formatColor("blanco"),
                    color: formatColor("verde")
            }}>
              <tr style={{backgroundColor: formatColor("verde"),
                          color: formatColor("blanco"),
                          border:'0',
                          margin:'0'
              }}>
                <th colSpan={2}>Grabaciones Disponibles</th>
              </tr>
              <tr>
                <th>Nombre</th><th>Fecha</th>
              </tr>
              {Records.map((rec)=>{
                return (<tr>
                  <td>{rec.nombre}</td><td>{rec.fecha}</td>
                </tr>)
              })}
            </table>
          </div>
          <div className='botones'>
            <div
            style={{color:formatColor("blanco"),
                    backgroundColor:formatColor("verde"),
                    marginLeft:'1vw'
            }}><strong>Eliminar datos</strong></div>
            
            <div
            style={{color:formatColor("blanco"),
                    backgroundColor:formatColor("verde"),
                    marginLeft:'auto',
                    marginRight:'1vw'
            }} onClick={()=>props.setVentana("Inicio")}><strong>Volver al inicio</strong></div>
          </div>
        </div>
        <div className='estadisticas'>
          {(()=>{
              const stats:JSX.Element[]=[]
              for(let i=0;i<cant;i++){
                stats.push( <Stats/>)
              }
              return stats
            })()
          }
          <Stats/>
        </div>
      </div>
    </div>
  );
}