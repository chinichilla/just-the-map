import React, { Fragment } from 'react';
import GridLines from './GridLines';

const Grid = ({ gridLength = 50 }) => {
  return (
    <Fragment>
      <GridLines gridLength={gridLength} />
    </Fragment>
  );
};
export default Grid;
