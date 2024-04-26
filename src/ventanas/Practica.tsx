import React,{useRef, useEffect, useState, useCallback} from 'react';
import '../App.css';
import './Practica.css';
import Webcam from "react-webcam";
import { propsVentanaPractica } from '../code/interfaces';
import { Opciones } from '../componentes/headerventanas';
const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

let videoConstraints = {
  width: 720,
  height: 360,
  facingMode: FACING_MODE_ENVIRONMENT
};







export function Practica(props: propsVentanaPractica) {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
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
  
  return (
    <div className='Practica'>

      <Opciones />
      
      {isCaptureEnable || (
        <button onClick={() => setCaptureEnable(true)}>start</button>
      )}
      {isCaptureEnable && (
        <>
          <div>
            <button onClick={() => setCaptureEnable(false)}>end </button>
            
          </div>
          <div style={{alignContent:'center'}}>
            <Webcam
              audio={false}
              width={540}
              height={360}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                facingMode
              }}
            />
          </div>
          
        </>
      )}
      
    </div>
  );
}