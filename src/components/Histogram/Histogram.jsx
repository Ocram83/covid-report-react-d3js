import React from "react";

import * as d3 from "d3";

import Axis from "../Axis/Axis";

import "./Histogram.css";

/**
 * Hook that alerts clicks outside of the passed ref
 */

const Histogram = props => {
  let { height, width, title, data } = props;

  if (!data || window.innerWidth <1024) {
    return <div/>;
  }

  let margin = (width + height / 2) / 8;

  let graphWidth = width - margin;
  let graphHeight = height - margin;

  let maxY = d3.max(data, function(v) {
    return +v.y;
  });

  const xScale = d3
    .scaleBand()
    .range([0, graphWidth]) //the size of the y axis, coordinate system start from top left corner
    .domain(data.map((s,i) => s.x))
    .padding(0.2);

  const yScale = d3
    .scaleLinear() // define y axis, divide using equally spacied intervals
    .range([graphHeight, 0]) //the size of the y axis, coordinate system start from top left corner
    .domain([0, maxY]); // domain

  let translateGraph = `translate(${margin / 2},${(margin * 2) / 5})`;
  let translateTitle = `translate(${width / 2},${margin / 5})`;

  d3.selectAll("rect").on("mouseover", function(){
    d3.select(this).attr("opacity", .5)
  }).on("mouseout", function(){
    d3.select(this).attr("opacity", 1)
  });
  
  return (
    <svg className="histogram" width={width} height={height}>
      <text
        className="histogramTitle"
        textAnchor="middle"
        transform={translateTitle}
      >
        {title}
      </text>
      <g width={graphWidth} height={graphHeight} transform={translateGraph}>
        {data.map(v => {
          return (
            <Bar
              key={v.x}
              x={xScale(v.x)}
              y={yScale(v.y)}
              width={xScale.bandwidth()}
              height={graphHeight - yScale(v.y)}
              value={v.y}
            ></Bar>
          );
        })}
        <Axis xScale={xScale} yScale={yScale} height={height - margin} />
      </g>
    </svg>
  );
};

const Bar = props => {
  let { width, height, x, y, value } = props;

  return (
    <>
      <rect className="rect" width={width} height={height} x={x} y={y} />
    </>
  );
};

export default Histogram;
