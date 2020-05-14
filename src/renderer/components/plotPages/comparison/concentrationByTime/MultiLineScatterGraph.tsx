import * as React from 'react';
import * as d3 from 'd3';

export const MultiLineScatterGraph: React.FC = () => {
    const ref = React.createRef<SVGSVGElement>();

    const paint = () => {
        const svg = d3.select(ref.current);
        const circle = svg
            .append('circle')
            .attr('cx', 500)
            .attr('cy', 400)
            .attr('r', 50)
            .attr('fill', 'lightgrey');
    };

    React.useEffect(paint);

    return <svg ref={ref} width={1000} height={800} />;
};
