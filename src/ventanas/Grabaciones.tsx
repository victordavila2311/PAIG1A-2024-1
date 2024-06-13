import React, { ChangeEvent, useState } from 'react';
import '../App.css';
import './Grabaciones.css';
import { Records } from './objgrabaciones';
import { propsVentanaGrabaciones } from '../code/interfaces';
import { Opciones } from '../componentes/headerventanas';
import { ventana } from '../code/types';
import { formatColor } from '../code/helpers';

export function Grabaciones(props: propsVentanaGrabaciones) {

  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  const handleVideoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "video/webm") {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
    } else {
      alert("Please upload a WebM video file.");
    }
  };
  function handleButtonClick(){
    document.getElementById('videoInput')?.click();
  }
  function borrarGrabacion(){
    setVideoSrc(null)
  }

  
  return (
    <div className='Grabaciones'>
      <Opciones setVentana={props.setVentana}/>
      <div className='contenido'>
        <div style={{display:'flex',
                     flexDirection:'column',
                     width:'20vw',
                     marginLeft: '5vw',
                     height:'89.5vh'
              }}>
          
          <div className='botones2'>

            <input type="file" id="videoInput" accept="video/webm" onChange={handleVideoUpload} 
              style={{display:'none'}}/>
            <div
            style={{color:formatColor("blanco"),
                    backgroundColor:formatColor("cafe"),
                    marginLeft:'1vw'
            }} onClick={handleButtonClick}><strong>Cargar grabacion</strong></div>
            
            <div
            style={{color:formatColor("blanco"),
                    backgroundColor:formatColor("cafe"),
                    marginLeft:'1vw'
            }} onClick={borrarGrabacion}><strong>Eliminar grabacion</strong></div>
            
            <div
            style={{color:formatColor("blanco"),
                    backgroundColor:formatColor("cafe"),
                    marginLeft:'1vw',
            }} onClick={()=>props.setVentana("Inicio")}><strong>Volver al inicio</strong></div>
          </div>
        </div>
        
        <div className='ver' 
        style={{backgroundColor: formatColor("blanco"),
                border:'0.5vw solid'+ formatColor("cafe"),
                color: formatColor("cafe")
        }}>
          
          

          {videoSrc ? (
              <video controls>
                <source src={videoSrc} type="video/webm" style={{width: '100%', height:'100%'}}/>
                Your browser does not support the video tag.
              </video>
              ):<>
              Espacio para <br />
              visualizar la <br />
              grabacion <br />
              seleccionada <br /></>}
        </div>


      </div>
    </div>
  );
}