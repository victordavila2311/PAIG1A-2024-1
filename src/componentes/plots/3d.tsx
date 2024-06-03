import React from "react";
import '../../App.css';
import '../stats.css';
import Plot from 'react-plotly.js';
import { formatColor } from "../../code/helpers";
import { format } from "path";
import { propsGraph } from "../../code/interfaces";
export function P3d(props: propsGraph) {
    return (
        <Plot
            data={[
                {
                    x: props.x,
                    y: props.y,
                    z: props.z,
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