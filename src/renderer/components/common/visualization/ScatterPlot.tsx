import * as React from 'react';
import * as d3 from 'd3';

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
        const innerWidth = width - MARGIN.left - MARGIN.right;
        const innerHeight = height - MARGIN.top - MARGIN.bottom;

        const xVal = (d: Dot) => d.time;
        const yVal = (d: Dot) => d.c;

        const g = svg.append('g').attr('transform', `translate(${MARGIN.left},${MARGIN.top})`);

        /** ******** Title ********* */
        const TITLE = 'Concentration to Time';
        g.append('text')
            .attr('class', styles.title)
            .attr('text-anchor', 'middle')
            .attr('x', innerWidth / 2)
            .attr('y', -10)
            .text(TITLE);

        /** ******** Axis ********* */
        const X_AXIS_LABEL = 'Time (minutes)';
        const Y_AXIS_LABEL = 'Concentration (mg/L)';
        const X_TICKS_PADDING = 15;
        const TICK_SIZE = 4;
        const Y_TICKS_PADDING = 10;
        // Scales
        const X_TICKS = 10;
        const xmax = (Math.floor(d3.max(DATA.map(xVal))! / X_TICKS) + 1) * 10;
        const xScale = d3
            .scaleLinear()
            .domain([0, xmax])
            .range([0, innerWidth])
            .nice();

        const yScale = d3
            .scaleLinear()
            .domain(d3.extent(DATA, yVal) as [number, number])
            .range([innerHeight, 0])
            .nice();
        // Axis
        const xAxis = d3
            .axisBottom(xScale)
            .ticks(X_TICKS)
            .tickSize(TICK_SIZE)
            .tickPadding(X_TICKS_PADDING);
        const yAxis = d3
            .axisLeft(yScale)
            .tickSize(TICK_SIZE)
            .tickPadding(Y_TICKS_PADDING);
        // DOM
        const xAxisDom = g
            .append('g')
            .call(xAxis)
            .attr('transform', `translate(0,${innerHeight})`);
        const yAxisDom = g.append('g').call(yAxis);

        // Labels & Ticks
        xAxisDom
            .append('text')
            .attr('class', styles.axisLabel)
            .attr('text-anchor', 'middle')
            .attr('x', innerWidth / 2)
            .attr('y', 50)
            .text(X_AXIS_LABEL);
        yAxisDom
            .append('text')
            .attr('class', styles.axisLabel)
            .attr('text-anchor', 'middle')
            .attr('x', innerHeight / 2)
            .attr('y', 60)
            .attr('transform', 'rotate(90)')
            .text(Y_AXIS_LABEL);

        /** ******** Plot ********* */
        const RADIUS = 5;
        g.selectAll('circle')
            .data(DATA)
            .enter()
            .append('circle')
            .attr('cx', (d: Dot) => xScale(xVal(d)))
            .attr('cy', (d: Dot) => yScale(yVal(d)))
            .attr('fill', 'steelblue')
            .attr('r', RADIUS);

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
