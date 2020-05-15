import * as React from 'react';
import * as d3 from 'd3';

import { Graph } from '../../../../mods/visualization/graph';

const styles = require('./ScatterPlot.module.less');

const DATA = [
    { time: 0, c: 0 },
    { time: 3, c: 0.02 },
    { time: 10, c: 0.08 },
    { time: 12, c: 0.2 },
    { time: 14, c: 0.1 },
    { time: 15, c: 0.2 },
    { time: 17, c: 1.0 },
    { time: 21, c: 1.2 },
    { time: 23, c: 0.9 },
    { time: 27, c: 0.8 },
    { time: 29, c: 0.5 },
    { time: 31, c: 0.4 },
    { time: 33, c: 0.2 },
    { time: 35, c: 0.1 }
];

interface Dot {
    time: number;
    c: number;
}

export const ScatterPlot: React.FC = () => {
    const svgRef = React.createRef<SVGSVGElement>();

    const render = () => {
        /** ******** Canvas ********* */
        const MARGIN = {
            top: 60,
            right: 40,
            bottom: 90,
            left: 150
        };

        const svg = d3.select(svgRef.current);
        const width = +svg.attr('width');
        const height = +svg.attr('height');

        const xVal = (d: Dot) => d.time;
        const yVal = (d: Dot) => d.c;

        const graph = new Graph(svg, DATA, { width, height, margin: MARGIN }, xVal, yVal);

        const { xScale } = graph.paintXAxis(
            {
                text: 'Time (minutes)',
                className: styles.axisLabel
            },
            {
                ticks: 5,
                size: 4,
                padding: 10
            },
            styles.axisGroup
        );
        const { yScale } = graph.paintYAxis(
            {
                text: 'Concentration (mg/L)',
                className: styles.axisLabel
            },
            {
                ticks: 5,
                size: 4,
                padding: 10
            },
            styles.axisGroup
        );
        const g = graph.getValidArea();

        /** ******** Line ********* */
        const getLine = d3
            .line<Dot>()
            .x((d: Dot) => xScale(xVal(d)))
            .y((d: Dot) => yScale(yVal(d)))
            .curve(d3.curveCardinal);
        g.append('path')
            .datum(DATA)
            .attr('class', styles.curve)
            .attr('d', getLine);
    };

    React.useEffect(render);

    return <svg ref={svgRef} width={800} height={600} />;
};
