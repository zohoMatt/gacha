import * as React from 'react';
import * as d3 from 'd3';
import axios from 'axios';

import { Graph } from '../../../../mods/visualization/graph';

const styles = require('./ScatterPlot.module.less');

interface Dot {
    time: number;
    c: number;
}

export const ScatterPlot: React.FC = () => {
    const svgRef = React.createRef<SVGSVGElement>();
    const [points, setPts] = React.useState([]);

    React.useEffect(() => {
        axios.get('http://localhost:5000/kfit').then(({ data }: any) => {
            setPts(data.x.map((p: number, i: number) => ({ time: p, c: data.y[i] })));
        });
    }, [0]);

    const render = () => {
        console.log(points);
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

        const graph = new Graph(svg, points, { width, height, margin: MARGIN }, xVal, yVal);

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
            .datum(points)
            .attr('class', styles.curve)
            .attr('d', getLine);
    };

    React.useEffect(render);

    return <svg ref={svgRef} width={800} height={600} />;
};
