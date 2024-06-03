import React, { useState } from "react";
import '../App.css';
import './stats.css';
import Plot from 'react-plotly.js';
import { formatColor } from "../code/helpers";
import { format } from "path";
import { datos } from "../ventanas/dataset";
import { P3d } from "./plots/3d";
import { P2d } from "./plots/2d";

export function Stats(){
    const [varActiva, setVarActiva] = useState<string>('3D');


    let variables: string[]=['3D','X','Y','Z','ALPHA','GAMMA','VELOCIDAD ANGULAR 1','VELOCIDAD ANGULAR 2',
    'VELOCIDAD ANGULAR TOTAL', 'VELOCIDAD LINEAR (SENSOR LASER)','RESUMEN DATOS'
    ]
    let ang1:number[]=[]
    let ang2:number[]=[]
    let dist:number[]=[]
    let x:number[]=[]
    let y:number[]=[]
    let t:number[]=[]
    datos.forEach((data)=>{
        ang1.push(data["Angulo1"])
        ang2.push(data["Angulo1"])
        dist.push(data["Distancia"])
        x.push(Math.cos(data["Angulo1"]))
        y.push(Math.sin(data["Angulo2"]))
        t.push(data["data"]*0.1)

    })
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
                    {varActiva==="3d"?<P3d x={x} y={y} z={dist} />:
                    varActiva==="X"?<P2d x={t} y={x} />:
                    varActiva==="Z"?<P2d x={t} y={dist} />:
                    varActiva==="ALPHA"?<P2d x={t} y={ang1} />:
                    varActiva==="GAMMA"?<P2d x={t} y={ang2} />:
                    varActiva==="Y"?<P2d x={t} y={y} />:<P3d x={x} y={y} z={dist} />}
                </div>
                <div className="variables">
                    {variables.map((v)=>{

                        return (
                            <div style={{
                                border:'0.2vw solid '+formatColor("verde"),
                                backgroundColor: v===varActiva?formatColor("azul"):formatColor("blanco"),
                                cursor:'pointer'
                            }} key={v} onClick={()=>{
                                setVarActiva(v)
                            }}>
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