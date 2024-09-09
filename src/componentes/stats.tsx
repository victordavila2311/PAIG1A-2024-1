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


export function Stats(file: { fileCont: string }) {
    //const fileCont=useContext(fileContext)

    const [varActiva, setVarActiva] = useState<string>('Trayectoria');
    const [ang1, setAng1] = useState<number[]>([])
    const [ang2, setAng2] = useState<number[]>([])
    const [dist, setDist] = useState<number[]>([])
    const [x, setx] = useState<number[]>([])
    const [y, sety] = useState<number[]>([])
    const [z, setz] = useState<number[]>([])
    const [t, sett] = useState<number[]>([])

    //longitud herramienta(mm)
    const L =360
    const [dat, setDat] = useState<datojson[]>([{
        "data": 0,
        "A1": 0,
        "A2": 0,
        "D": 0
    }
    ])
    const [text, setText] = useState<string>("")
    // let variables: string[]=['3D','X','Y','Z','ALPHA','GAMMA','VELOCIDAD ANGULAR 1','VELOCIDAD ANGULAR 2',
    // 'VELOCIDAD ANGULAR TOTAL', 'VELOCIDAD LINEAR (SENSOR LASER)','RESUMEN DATOS'
    // ]
    let variables: string[] = ['Trayectoria', 'X', 'Y', 'Z', 'ALPHA', 'GAMMA', 'S']
    let tempang1: number[] = []
    let tempang2: number[] = []
    let tempdist: number[] = []
    let tempx: number[] = []
    let tempy: number[] = []
    let tempz: number[] = []
    let tempt: number[] = []
    /*
    let ang1:number[]=[]
    let ang2:number[]=[]
    let dist:number[]=[]
    let x:number[]=[]
    let y:number[]=[]
    let t:number[]=[]
    */
    //console.log(file.fileCont)
    useEffect(() => {
        try {
            let tempdat = JSON.parse(file.fileCont) as datojson[]
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
        } catch { }
    }, [file.fileCont])
    useEffect(() => {
        if ("A1" in dat[0]) {
            console.log("entro")
            dat.forEach((data: datojson, idx) => {
                //se adapta data D a la herramienta
                data["D"]=L-data["D"]
                data["D"]=data["D"]<0?0:data["D"]
                //A1 es alfa A2 es gamma
                tempang1.push(data["A1"]/12)
                tempang2.push(data["A2"]/12)
                tempdist.push(data["D"])
                let A1rad = data["A1"] * Math.PI / (180*12)
                let A2rad = data["A2"] * Math.PI / (180*12)
                if (Math.abs(data["A1"]) < 0.1 && Math.abs(data["A2"]) < 0.1) {
                    tempx.push(0)
                    tempy.push(0)
                    tempz.push(data["D"]*-1)
                } else if (Math.abs(data["A1"]) < 0.1) {//este es alfa
                    tempx.push(Math.sin(A2rad) * data["D"])
                    tempy.push(0)
                    tempz.push(Math.cos(A2rad) * data["D"]*-1)

                } else if (Math.abs(data["A2"]) < 0.1) {
                    tempx.push(0)
                    tempy.push(Math.sin(A1rad) * data["D"])
                    tempz.push(Math.cos(A1rad) * data["D"]*-1)
                } else {
                    // let xt: number = data["D"] / (Math.sqrt(1 + ((Math.tan(Math.PI - A2rad) ** 2) / (Math.tan(Math.PI - A1rad) ** 2)) + Math.tan(Math.PI - A2rad) ** 2))
                    // tempx.push(xt)
                    // tempy.push(xt * Math.tan(Math.PI - A2rad) / Math.tan(Math.PI - A1rad))
                    // tempz.push(xt * Math.tan(Math.PI - A2rad)*-1)
                    let xt: number = data["D"] / (Math.sqrt(1 + ((Math.tan(A1rad) ** 2) / (Math.tan(A2rad) ** 2)) + (1/Math.tan(A2rad)) ** 2))
                    tempx.push(xt)
                    tempy.push(xt * Math.tan(A1rad) / Math.tan(A2rad))
                    tempz.push(xt / Math.tan(A2rad)*-1)
                }


                tempt.push(idx * 1)


            })
            setAng1(tempang1)
            setAng2(tempang2)
            setDist(tempdist)
            setx(tempx)
            sety(tempy)
            setz(tempz)
            sett(tempt)

            setText(file.fileCont.slice(0, 25))
        }
    }, [dat])

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
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                border: '0.2vw solid ' + formatColor("verde"),
                backgroundColor: formatColor("blanco"),
                color: formatColor("verde")
            }}>
                <div className="grafica" style={{
                    height: '100%',
                    border: '0.2vw solid ' + formatColor("verde")
                }}>
                    {varActiva === "Trayectoria" ? <P3d x={x} y={y} z={z} /> :
                        varActiva === "X" ? <P2d x={t} y={x} /> :
                            varActiva === "Z" ? <P2d x={t} y={z} /> :
                                varActiva === "ALPHA" ? <P2d x={t} y={ang1} /> :
                                    varActiva === "GAMMA" ? <P2d x={t} y={ang2} /> :
                                        varActiva === "Y" ? <P2d x={t} y={y} /> : <P2d x={t} y={dist} />}
                </div>
                <div className="variables">
                    {variables.map((v) => {

                        return (
                            <div style={{
                                border: '0.2vw solid ' + formatColor("verde"),
                                backgroundColor: v === varActiva ? formatColor("verdeclaro") : formatColor("blanco"),
                                cursor: 'pointer',
                                height: '100%',
                            }} key={v} onClick={() => {
                                setVarActiva(v)
                            }}>
                                {v}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}