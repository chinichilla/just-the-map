import React, { Fragment } from 'react';
import { Rect } from 'react-konva';

const MaskLayer = ({ width, height }) => {
  return (
    <Fragment>
      <Rect width={width} height={height} fill="rgb(100,149,237)" />
    </Fragment>
  );
};
export default MaskLayer;
