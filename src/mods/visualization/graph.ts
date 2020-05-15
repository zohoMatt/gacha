import * as d3 from 'd3';

type AnySelection = d3.Selection<any, any, any, any>;

export interface Margin {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export interface Layout {
    width: number;
    height: number;
    margin: Margin;
}

export interface TitleAndLabels {
    title: string;
    xLabel: string;
    yLabel: string;
}

export type Data = { [key: string]: number }[];

export interface LabelOptions {
    text: string;
    className: string;
}

export interface TickOptions {
    ticks: number;
    size: number;
    padding: number;
}

export class Graph {
    protected svg: AnySelection;

    protected data: Data;

    protected margin: Margin;

    protected validArea: AnySelection;

    protected innerWidth: number;

    protected innerHeight: number;

    protected xGetter: (datum: any) => number;

    protected yGetter: (datum: any) => number;

    constructor(
        selection: AnySelection,
        data: Data,
        layout: Layout,
        getX: (datum: any) => number,
        getY: (datum: any) => number
    ) {
        this.svg = selection;
        this.data = data;
        this.xGetter = getX;
        this.yGetter = getY;

        const { width, height, margin } = layout;
        const { top, right, bottom, left } = margin;
        this.margin = margin;
        this.innerWidth = width - left - right;
        this.innerHeight = height - top - bottom;
        this.validArea = this.svg.append('g').attr('transform', `translate(${left}, ${top})`);
    }

    public getValidArea() {
        return this.validArea;
    }

    public paintTitle(title: string, className?: string) {
        this.validArea
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('class', className || '')
            .attr('x', this.innerWidth / 2)
            .attr('y', -10)
            .text(title);
    }

    public paintXAxis(labelOpt: LabelOptions, tickOpt: TickOptions, axisClass?: string) {
        const { text, className } = labelOpt;
        const { ticks, padding, size } = tickOpt;
        const xScale = d3
            .scaleLinear()
            .domain([0, d3.max(this.data.map(this.xGetter))!])
            .range([0, this.innerWidth])
            .nice();
        const xAxis = d3
            .axisBottom(xScale)
            .ticks(ticks)
            .tickSize(size)
            .tickPadding(padding);
        const xAxisDom = this.validArea
            .append('g')
            .attr('class', axisClass || '')
            .call(xAxis)
            .attr('transform', `translate(0,${this.innerHeight})`);
        xAxisDom
            .append('text')
            .attr('class', className)
            .attr('text-anchor', 'middle')
            .attr('x', this.innerWidth / 2)
            .attr('y', 70)
            .text(text);

        return { xScale, xAxis, xAxisDom };
    }

    public paintYAxis(labelOpt: LabelOptions, tickOpt: TickOptions, axisClass?: string) {
        const { text, className } = labelOpt;
        const { ticks, padding, size } = tickOpt;
        // Scales
        const yScale = d3
            .scaleLinear()
            .domain(d3.extent(this.data, this.yGetter) as [number, number])
            .range([this.innerHeight, 0])
            .nice();
        // Axis
        const yAxis = d3
            .axisLeft(yScale)
            .ticks(ticks)
            .tickSize(size)
            .tickPadding(padding);
        // DOM
        const yAxisDom = this.validArea
            .append('g')
            .attr('class', axisClass || '')
            .call(yAxis);
        yAxisDom
            .append('text')
            .attr('class', className)
            .attr('text-anchor', 'middle')
            .attr('x', -this.innerHeight / 2)
            .attr('y', -60)
            .attr('transform', 'rotate(-90)')
            .text(text);

        return { yScale, yAxis, yAxisDom };
    }
}
