import React from "react";
import '../../App.css';
import '../stats.css';
import Plot from 'react-plotly.js';
import { formatColor } from "../../code/helpers";
import { format } from "path";
import { propsGraph } from "../../code/interfaces";
export function P2d(props: propsGraph) {
    return (
        <Plot
            data={[
                {
                    x: props.x,
                    y: props.y,
                    type: 'scatter',
                    mode: 'lines',
                    marker: { color: 'red' },
                },
            ]}

            layout={{
                width: 700, height: 500, autosize: true,
                margin: {
                    l: 30,
                    r: 10,
                    b: 30,
                    t: 20,
                    pad: 0
                }, xaxis: { title: "tiempo (s)" }
            }}
        />
    )
}