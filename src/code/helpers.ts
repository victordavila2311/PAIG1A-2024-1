import { color } from "./types"

export const formatTimestamp = (timestamp: number): string =>{
    const date = new Date(timestamp)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year}`
}

export const formatColor = (color: color): string => {
    switch(color){
        case 'main': 
            return '#1D3536'
        case 'azul': 
            return '#4980EE'
        case 'cafe': 
            return '#714620'
        case 'verde': 
            return '#4A7C4C'
        case 'blanco':
            return '#FFFFFF'
        case 'negro': 
            return '#000000'
    }
}