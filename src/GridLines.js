import React, { Component } from 'react';
import { Line } from 'react-konva';

export default class Grid extends Component {
  makeGrid() {
    const gridLength = this.props.gridLength;

    const gridLines = [];
    const rows = window.innerHeight / gridLength;
    const columns = window.innerWidth / gridLength;
    // horizontal lines
    for (let j = 1; j < rows; j++) {
      gridLines.push({
        key: 'h' + j,
        x: 0,
        y: gridLength * j,
        points: [0, 0, window.innerWidth, 0],
      });
    }
    // vertical lines
    for (let i = 1; i < columns; i++) {
      gridLines.push({
        key: 'v' + i,
        x: gridLength * i,
        y: 0,
        points: [0, 0, 0, window.innerHeight],
      });
    }
    return gridLines;
  }

  render() {
    let gridLines = [];
    if (this.props.isVisible) {
      gridLines = this.makeGrid();
    }
    return gridLines.map(line => (
      <Line
        key={line.key}
        x={line.x}
        y={line.y}
        points={line.points}
        tension={0.5}
        stroke="gray"
      />
    ));
  }
}
