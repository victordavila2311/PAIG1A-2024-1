import React,{useRef, useEffect, useState, useCallback} from 'react';
import '../App.css';
import './Practica.css';
import Webcam from "react-webcam";
import { propsVentanaPractica } from '../code/interfaces';
import { Opciones } from '../componentes/headerventanas';
import { ventana } from '../code/types';
import { formatColor } from '../code/helpers';
import { datos } from './dataset';
import { readBuilderProgram } from 'typescript';
const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

let videoConstraints = {
  width: 720,
  height: 360,
  facingMode: FACING_MODE_ENVIRONMENT
};



export function Practica(props: propsVentanaPractica) {
  
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(true);
  const [valor,setValor]=useState<string>("");
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef:React.MutableRefObject<MediaRecorder|null> = useRef<MediaRecorder>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);


  const [url, setUrl] = useState<string | null>(null);

  let reader:ReadableStreamDefaultReader<string>|null
  let port:SerialPort|null
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
  //aca se crean las funciones para manejar la descarga de los videos tomados
  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current?.stream!, {
      mimeType: "video/webm"
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    ({ data }:{data: any}) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current!.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleDownload = React.useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm"
      });
      const url = URL.createObjectURL(blob);
      const a:HTMLAnchorElement = document.createElement("a");
      document.body.appendChild(a);
      a.setAttribute('style','display: none')
      a.href = url;
      let fecha=new Date()
      a.download = "grabacion_"+fecha.toString().substring(0,21).replace(" ","_")+".webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);


  async function creartexto(){
    // Step 1: Define the text content
    
    await reader?.cancel();
    console.log("cerrar")
    reader = null;
    port?.close()
    port=null
    

    //const textContent = JSON.stringify(datos);
    console.log(valor)
    console.log(7,valor.replaceAll("\r","").replaceAll("\n","").split("}").slice(0,-1))
    const textContent = `[${valor.replaceAll("\r","").replaceAll("\n","").split("}").slice(0,-1).join("},")}}]`
    console.log(5,textContent)
    // Step 2: Create a Blob object
    const blob = new Blob([textContent], { type: 'text/plain' });

    // Step 3: Create an object URL
    const url = URL.createObjectURL(blob);

    // Step 4: Create an anchor element
    const a = document.createElement('a');
    a.href = url;
    let fecha=new Date()
    a.download = fecha.toString().substring(0,21).replace(" ","_")+'.txt';  // Specify the file name

    // Step 5: Programmatically click the anchor element
    a.click();

    // Cleanup: Revoke the object URL after the download is triggered
    URL.revokeObjectURL(url);
  }

  async function leerSerial(){
    if("serial" in navigator){
      
    }
    port = await navigator.serial.requestPort()
    await port.open({ baudRate: 115200, });
    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = port.readable!.pipeTo(textDecoder.writable);
    reader = textDecoder.readable.getReader();
    let msg: string=""
    let start:boolean=false
    let end:boolean=false
    // Listen to data coming from the serial device.
    while (true) {
      console.log("F")
      const { value, done } = await reader.read();
      //console.log(value)
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
        console.log("mensaje previo")
        console.log(1,msg)
        msg=msg.replaceAll("/n","").replaceAll(/[*#]/gi,"")

        //se pone el valor en pantalla
        console.log("mensaje despues")
        console.log(2,msg)
        setValor(prev=>prev+msg)
        //se reinician todos los valores para esperar el siguiente mensaje
        msg=""
        start=false
        end=false
      }
      
    }
  }
  useEffect(()=>{
    console.log(valor)
  },[JSON.stringify(valor)])
  
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
            }} onClick={handleStartCaptureClick}><strong>Start record {capturing?'🔴':'⚪'}</strong></div>
            <div
            style={{color:formatColor("blanco"),
                    backgroundColor:formatColor("azul"),
                    marginLeft:'1vw'
            }} onClick={handleStopCaptureClick}><strong>Stop record</strong></div>
            {recordedChunks.length > 0 && (
              <div onClick={handleDownload}
              style={{color:formatColor("blanco"),
                      backgroundColor:formatColor("azul"),
                      marginLeft:'1vw'
                      }}><strong>DESCARGAR</strong></div>
            )}
            <div
            style={{color:formatColor("blanco"),
                    backgroundColor:formatColor("azul"),
                    marginLeft: recordedChunks.length > 0?'2vw':'5vw'
            }} onClick={()=>leerSerial()}><strong>Start tracking {valor}</strong></div>
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