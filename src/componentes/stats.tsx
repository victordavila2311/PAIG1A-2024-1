import React from "react";
import '../App.css';
import './stats.css';
import { formatColor } from "../code/helpers";
import { format } from "path";

export function Stats(){
    let variables: string[]=['X','Y','Z','ALPHA','GAMMA','VELOCIDAD ANGULAR 1','VELOCIDAD ANGULAR 2',
    'VELOCIDAD ANGULAR TOTAL', 'VELOCIDAD LINEAR (SENSOR LASER)','RESUMEN DATOS'
    ]
    return (
        <div className="estadistica" style={{
            display:'flex',
            flexDirection: 'column'}}>
            <div style={{
                display:'flex',
                flexDirection:'row',
                border:'0.2vw solid '+formatColor("verde"),
                backgroundColor: formatColor("blanco"),
                color: formatColor("verde")
            }}>
                <div className="grafica" style={{
                                        border:'0.2vw solid '+formatColor("verde")
                }}>

                </div>
                <div className="variables">
                    {variables.map((v)=>{
                        return (
                            <div style={{
                                border:'0.2vw solid '+formatColor("verde")
                            }} key={v}>
                                {v}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div style={{
                backgroundColor:formatColor("verde"),
                color:formatColor("blanco"),
                textAlign: 'center'
            }}>
                Grafica o Estadistica mostrada
            </div>
        </div>
    )
}