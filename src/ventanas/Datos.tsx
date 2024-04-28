import React, {createContext, PropsWithChildren, useContext, useEffect, useRef, useState} from 'react';
import '../App.css';
import './Datos.css';
import { propsVentanaDatos } from '../code/interfaces';
import { Opciones } from '../componentes/headerventanas';
import { formatColor } from '../code/helpers';
import { Records } from './objgrabaciones';
import { Stats } from '../componentes/stats';

export function Datos(props: propsVentanaDatos) {
  const [valor,setValor]=useState<string>('')
  let cant:number=4
  // function leerPuerto(){
    
  //   navigator.serial
  //   .requestPort({ filters: [{ usbVendorId }] })
  //   .then((port) => {
  //     // Connect to `port` or add it to the list of available ports.
  //   })
  //   .catch((e) => {
  //     // The user didn't select a port.
  //   });
  // }
  async function leerSerial(){
    if("serial" in navigator){
      
    }
    const port = await navigator.serial.requestPort()
    await port.open({ baudRate: 115200, });
    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = port.readable!.pipeTo(textDecoder.writable);
    const reader = textDecoder.readable.getReader();

    // Listen to data coming from the serial device.
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        // Allow the serial port to be closed later.
        reader.releaseLock();
        break;
      }
      // value is a string.
      //console.log(value);
      setValor(value)
    }
  }
  
  
  

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
            <br />
            <div onClick={()=>leerSerial()}
            style={{color:formatColor("blanco"),
                    backgroundColor:formatColor("verde"),
                    marginLeft:'1vw',
            }}><strong>leer Serial {valor}</strong></div>
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