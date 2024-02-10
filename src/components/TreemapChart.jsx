import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const TreemapChart = ({ data }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (data && d3Container.current) {
      const svg = d3.select(d3Container.current);
      // Adjust these dimensions as needed
      const width = 960; // Increased width
      const height = 600; // Increased height to maintain aspect ratio
      svg.attr('width', width).attr('height', height);

      // Create the treemap hierarchy
      const root = d3.hierarchy(data).sum((d) => d.value).sort((a, b) => b.height - a.height || b.value - a.value);

      // Initialize the treemap with padding
      d3.treemap()
        .size([width, height])
        .paddingTop(15) // Space for the top text label
        .paddingRight(15) // Space on the right side of each cell
        .paddingInner(4) // Space between cells
        (root);

      // Render the treemap rectangles
      svg.selectAll('rect')
        .data(root.leaves())
        .enter()
        .append('rect')
        .attr('x', (d) => d.x0)
        .attr('y', (d) => d.y0)
        .attr('width', (d) => d.x1 - d.x0)
        .attr('rx', 7) // Set the x-axis border radius
        .attr('ry', 7) // Set the y-axis border radius
        .attr('height', (d) => d.y1 - d.y0)
        .style('stroke', 'white') // Changed to white to make the spaces visible
        .style('fill', (d) => d.data.color);

      // Add the labels
      svg.selectAll('text')
        .data(root.leaves())
        .enter()
        .append('text')
        .attr('x', (d) => d.x0 + (d.x1 - d.x0) / 2) // Center the text
        .attr('y', (d) => d.y0 + (d.y1 - d.y0) / 2) // Center the text
        .attr('text-anchor', 'middle') // Center the text anchor
        .attr('alignment-baseline', 'middle') // Center the alignment baseline
        .text((d) => d.data.name)
        .attr('font-size', '15px')
        .attr('fill', 'white');
    }
  }, [data]);

  return (
    <svg className="d3-component" ref={d3Container} />
  );
};

export default TreemapChart;


