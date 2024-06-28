import React from "react";
import '../../App.css';
import '../stats.css';
import Plot from 'react-plotly.js';
import { formatColor } from "../../code/helpers";
import { format } from "path";
import { propsGraph } from "../../code/interfaces";
export function P2d(props: propsGraph) {
    const oneVh = window.innerHeight / 100;
    const oneVw = window.innerWidth / 100;

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
                width: oneVw*56, height: oneVh*75, autosize: true,
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