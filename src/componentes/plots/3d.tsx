import React, { useEffect, useState } from "react";
import '../../App.css';
import '../stats.css';
import Plot from 'react-plotly.js';
import { formatColor } from "../../code/helpers";
import { format } from "path";
import { propsGraph } from "../../code/interfaces";
export function P3d(props: propsGraph) {
    const [data, setData] = useState<{ x: number[]; y: number[]; z: number[] }>({
        x: [],
        y: [],
        z: [],
    });
    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
          if (index < props.x.length) {
            setData(prevData => ({
              x: [...prevData.x, props.x[index]],
              y: [...prevData.y, props.y[index]],
              z: [...prevData.z, props.z![index]],
            }));
            index++;
          } else {
            clearInterval(interval);
          }
        }, 100);
    
        return () => clearInterval(interval);
      }, [props]);
    return (
        <Plot
            data={[
                {
                    x: data.x,
                    y: data.y,
                    z: data.z,
                    type: 'scatter3d',
                    mode: 'lines',
                    marker: { color: 'red' },
                },
            ]}

            layout={{
                width: 500, height: 240, autosize: true,
                margin: {
                    l: 0,
                    r: 0,
                    b: 0,
                    t: 30,
                    pad: 0
                },
            }}
        />
    )
}