import React, {ChangeEvent, createContext, PropsWithChildren, useContext, useEffect, useRef, useState} from 'react';
import '../App.css';
import './Datos.css';
import Plot from 'react-plotly.js';
import { propsVentanaDatos } from '../code/interfaces';
import { Opciones } from '../componentes/headerventanas';
import { formatColor } from '../code/helpers';
import { Records } from './objgrabaciones';
import { Stats } from '../componentes/stats';
import { datos } from './dataset';



//export const fileContext=createContext<string>('[{"name":"hola"}]')
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
  /*
  async function leerSerial(){
    if("serial" in navigator){
      
    }
    const port = await navigator.serial.requestPort()
    await port.open({ baudRate: 115200, });
    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = port.readable!.pipeTo(textDecoder.writable);
    const reader = textDecoder.readable.getReader();
    let msg: string=""
    let start:boolean=false
    let end:boolean=false
    // Listen to data coming from the serial device.
    while (true) {
      const { value, done } = await reader.read();
      console.log(value)
      if (done) {
        // Allow the serial port to be closed later.
        reader.releaseLock();
        break;
      }

      //se define el inicio del mensaje
      if(value.includes("*")){
        start=true
      }

      //se va agregando al mensaje que se encuentre entre los simbolos de inicio y fin
      if(start){
        msg+=value
      }

      //se define el final del mensaje
      if(value.includes("#")){
        end=true
      }
      // value is a string.
      //console.log(value);
      if(end){
        //se reemplaza el los caracteres que definen el inicio y fin del mensaje con
        //strings vacias para no mostrarlo en pantalla

        msg=msg.replace("/n","").replace(/[*#]/gi,"")

        //se pone el valor en pantalla
        setValor(msg)
        //se reinician todos los valores para esperar el siguiente mensaje
        msg=""
        start=false
        end=false
      }
      
    }
  }
    */
  const [fileContent, setFileContent] = useState<string>('[{"name":"hola"}]');
  const [dragOver, setDragOver] = useState<boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setFileContent(content);
      };

      reader.readAsText(file);
    }
  };
  function handleButtonClick(){
    document.getElementById('fileInput')?.click();
  }
  
  function actualizar(){
    let fc=fileContent
    //console.log(fc)
    fc=fc.replace("a","o")
    //console.log(fc)
    setFileContent(fc)
  }

  return (
    <div className='Datos'>
      <Opciones setVentana={props.setVentana}/>
      <div className='contenido'>
        <div style={{display:'flex',
                     flexDirection:'column',
                     width:'20vw',
                     marginLeft: '5vw'
          }}>
          
          <div className='botones2'>
            <input type="file" id="fileInput" onChange={handleFileChange} 
                      style={{
                        display:'none'}}>
                          
              </input>
              <div onClick={handleButtonClick} style={{color:formatColor("blanco"),
                                                    backgroundColor:formatColor("verde"),
                                                    marginLeft:'1vw',
                                                    }}>
                  <strong>Escoga el archivo a analizar</strong>
                </div>
              <pre id="fileContent">{fileContent}</pre>
              <div
              style={{color:formatColor("blanco"),
                      backgroundColor:formatColor("verde"),
                      marginLeft:'1vw',
                      marginRight:'1vw'
              }} onClick={()=>{actualizar()}}><strong>Actualizar</strong></div>
              <br />
              
              <div
              style={{color:formatColor("blanco"),
                      backgroundColor:formatColor("verde"),
                      marginLeft:'1vw',
                      marginRight:'1vw'
              }} onClick={()=>props.setVentana("Inicio")}><strong>Volver al inicio</strong></div>
              <br />
              {/*<div onClick={()=>leerSerial()}
              style={{color:formatColor("blanco"),
                      backgroundColor:formatColor("verde"),
                      marginLeft:'1vw',
              }}><strong>leer Serial {valor}</strong></div>*/}
          </div>
        </div>
        <div className='estadisticas'>
          {/*<fileContext.Provider value={fileContent}>*/}
          {(()=>{
              const stats:JSX.Element[]=[]
              for(let i=0;i<cant;i++){
                stats.push( <Stats key={`Stats${i}`} fileCont={fileContent}  />)
              }
              return stats
            })()
          }
          <Stats key={`StatsAlone${cant}`} fileCont={fileContent}/>
          {/*</fileContext.Provider>*/}
        </div>
      </div>
      
    </div>
  );
}