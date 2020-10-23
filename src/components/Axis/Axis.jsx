import React, { Component } from "react";

import ReactDOM from "react-dom";

import * as d3 from "d3";

import "./Axis.css";

class Axis extends Component {
  constructor(props) {
    super();
  }

  componentDidUpdate() {
    this.renderAxis();
  }
  componentDidMount() {
    this.renderAxis();
  }

  renderAxis() {
    let { xScale, yScale, height } = this.props;

    let node = ReactDOM.findDOMNode(this);

    d3.select(node)
      .selectAll("*")
      .remove();

      var ticks = xScale.domain().filter(function(d,i){ return !(i%4); } );

    d3.select(node)
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).tickValues( ticks ))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    d3.select(node)
      .append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(yScale));
  }

  render() {
    return <g></g>;
  }
}

export default Axis;
