import React, { Fragment } from 'react';
import GridLines from './GridLines';

const Grid = ({ gridLength = 50, isVisible = true }) => {
  return (
    <Fragment>
      <GridLines gridLength={gridLength} isVisible={isVisible} />
    </Fragment>
  );
};
export default Grid;
