import React from 'react';
import GridLines from './GridLines';

const Grid = ({ gridLength = 50, isVisible = true }) => {
  return (
    <React.Fragment>
      <GridLines gridLength={gridLength} isVisible={isVisible} />
    </React.Fragment>
  );
};
export default Grid;
