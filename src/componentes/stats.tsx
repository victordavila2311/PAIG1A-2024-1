import React, { useState, useEffect, useContext } from "react";
import '../App.css';
import './stats.css';
import Plot from 'react-plotly.js';
import { formatColor } from "../code/helpers";
import { datojson } from "../code/types";
import { format } from "path";
import { datos } from "../ventanas/dataset";
import { P3d } from "./plots/3d";
import { P2d } from "./plots/2d";
//import { fileContext } from "../ventanas/Datos";


export function Stats(file:{fileCont: string}){
    //const fileCont=useContext(fileContext)
    const [varActiva, setVarActiva] = useState<string>('3D');
    const [ang1,setAng1]=useState<number[]>([])
    const [ang2,setAng2]=useState<number[]>([])
    const [dist,setDist]=useState<number[]>([])
    const [x,setx]=useState<number[]>([])
    const [y,sety]=useState<number[]>([])
    const [t,sett]=useState<number[]>([])
    const [dat,setDat] = useState<datojson[]>([{
        "data": 0,
        "Angulo1": 0,
        "Angulo2": 0,
        "Distancia": 0
    }
    ])
    const [text, setText] = useState<string>("")
    let variables: string[]=['3D','X','Y','Z','ALPHA','GAMMA','VELOCIDAD ANGULAR 1','VELOCIDAD ANGULAR 2',
    'VELOCIDAD ANGULAR TOTAL', 'VELOCIDAD LINEAR (SENSOR LASER)','RESUMEN DATOS'
    ]
    let tempang1:number[]=[]
    let tempang2:number[]=[]
    let tempdist:number[]=[]
    let tempx:number[]=[]
    let tempy:number[]=[]
    let tempt:number[]=[]
    /*
    let ang1:number[]=[]
    let ang2:number[]=[]
    let dist:number[]=[]
    let x:number[]=[]
    let y:number[]=[]
    let t:number[]=[]
    */
    //console.log(file.fileCont)
    useEffect(()=>{
        let tempdat=JSON.parse(file.fileCont) as datojson[]
        // console.log(tempdat)
        // console.log("tempdat")
        setDat(tempdat)
        // console.log("dat")
        // console.log(dat)
        // console.log("JSON")
        // console.log(JSON.parse(fileCont) as datojson[])
        
        
        // setAng1([])
        // setAng2([])
        // setDist([])
        // setx([])
        // sety([])
        // sett([])
        if("Angulo1" in dat[0]){
            //console.log("entro")
            dat.forEach((data:datojson)=>{
                tempang1.push(data["Angulo1"])
                tempang2.push(data["Angulo2"])
                tempdist.push(data["Distancia"])
                tempx.push(Math.cos(data["Angulo1"]))
                tempy.push(Math.sin(data["Angulo2"]))
                tempt.push(data["data"]*0.1)
        
            })
            setAng1(tempang1)
            setAng2(tempang2)
            setDist(tempdist)
            setx(tempx)
            sety(tempy)
            sett(tempt)
            
            setText(file.fileCont.slice(0,20))
        }
        
    },[file.fileCont])
    
    
    /*
    dat.forEach((data)=>{
        ang1.push(data["Angulo1"])
        ang2.push(data["Angulo1"])
        dist.push(data["Distancia"])
        x.push(Math.cos(data["Angulo1"]))
        y.push(Math.sin(data["Angulo2"]))
        t.push(data["data"]*0.1)

    })*/
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
                                backgroundColor: v===varActiva?formatColor("verdeclaro"):formatColor("blanco"),
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
                Grafica o Estadistica mostrada {text}
            </div>
        </div>
    )
}