import React,{useRef, useEffect, useState, useCallback} from 'react';
import '../App.css';
import './Practica.css';
import Webcam from "react-webcam";
import { propsVentanaPractica } from '../code/interfaces';
import { Opciones } from '../componentes/headerventanas';
import { ventana } from '../code/types';
import { formatColor } from '../code/helpers';
import { datos } from './dataset';
const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

let videoConstraints = {
  width: 720,
  height: 360,
  facingMode: FACING_MODE_ENVIRONMENT
};



export function Practica(props: propsVentanaPractica) {
  
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(true);
  const webcamRef = useRef<Webcam>(null);

  const [url, setUrl] = useState<string | null>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
    }
  }, [webcamRef]);
  const [facingMode, setFacingMode] = React.useState(FACING_MODE_ENVIRONMENT)
  const handleClick = React.useCallback(() => {
    setFacingMode(
      prevState =>
        prevState === FACING_MODE_USER
          ? FACING_MODE_ENVIRONMENT
          : FACING_MODE_USER
    );
  }, []);
  function creartexto(){
    // Step 1: Define the text content
    const textContent = JSON.stringify(datos);

    // Step 2: Create a Blob object
    const blob = new Blob([textContent], { type: 'text/plain' });

    // Step 3: Create an object URL
    const url = URL.createObjectURL(blob);

    // Step 4: Create an anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample.txt';  // Specify the file name

    // Step 5: Programmatically click the anchor element
    a.click();

    // Cleanup: Revoke the object URL after the download is triggered
    URL.revokeObjectURL(url);
  }
  
  return (
    <div className='Practica'>

      <Opciones setVentana={props.setVentana}/>
      
      {isCaptureEnable || (
        <button onClick={() => setCaptureEnable(true)}>start</button>
      )}
      {isCaptureEnable && (
        <>
         {/*
          <div>
            <button onClick={() => setCaptureEnable(false)}>end </button>
            
          </div>
         */}
          <div className='camaras' 
          style={{border:'10px solid '+formatColor("azul"),
                  width: '480px',
                  height: '360px'
                  }}>
            <Webcam
              audio={false}
              width={480}
              height={360}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                
                facingMode
              }}
            />
          </div>
          <div
          style={{width:'500px',
                  backgroundColor:formatColor("azul"),
                  marginLeft:'auto',
                  marginRight:'auto',
                  textAlign:'center',
                  paddingBottom:'1vh',
                  color:formatColor("blanco")
          }}><strong>Webcam</strong></div>
          <div className='botones'>
            <div
            style={{color:formatColor("blanco"),
                    backgroundColor:formatColor("azul"),
                    marginLeft:'1vw'
            }}><strong>Start record</strong></div>
            <div
            style={{color:formatColor("blanco"),
                    backgroundColor:formatColor("azul"),
                    marginLeft:'1vw'
            }}><strong>Stop record</strong></div>
            <div
            style={{color:formatColor("blanco"),
                    backgroundColor:formatColor("azul"),
                    marginLeft:'5vw'
            }}><strong>Start tracking</strong></div>
            <div
            style={{color:formatColor("blanco"),
                    backgroundColor:formatColor("azul"),
                    marginLeft:'1vw'
            }} onClick={()=>{creartexto()}}><strong>Stop tracking</strong></div>
            <div
            style={{color:formatColor("blanco"),
                    backgroundColor:formatColor("azul"),
                    marginLeft:'auto',
                    marginRight:'1vw'
            }} onClick={()=>props.setVentana("Inicio")}><strong>Volver al inicio</strong></div>
          </div>
        </>
      )}
      
    </div>
  );
}