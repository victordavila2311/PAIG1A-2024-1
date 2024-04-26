import { color, ventana } from "./types";

export interface propsVentanaInicio{
    setVentana: React.Dispatch<React.SetStateAction<ventana>>
}

export interface propsVentanaPractica {
    setVentana: React.Dispatch<React.SetStateAction<ventana>>
}

export interface propsVentanaGrabaciones {
    setVentana: React.Dispatch<React.SetStateAction<ventana>>
}

export interface propsVentanaDatos {
    setVentana: React.Dispatch<React.SetStateAction<ventana>>
}

export interface propsBoton {
    color: color
    texto: string
    size: {h: string, w: string}
    onClick: () => void
}

export interface objPractica { 
    
}

export interface objGrabacion { 
    nombre: string
    fecha: number
    duracion: number
}

export interface objDatos { 
    
}