import React, { Fragment } from 'react';
import GridLines from './GridLines';

const Grid = ({ gridLength = 20 }) => {
  return (
    <Fragment>
      <GridLines gridLength={gridLength} />
    </Fragment>
  );
};
export default Grid;
