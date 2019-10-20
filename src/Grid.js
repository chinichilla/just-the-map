import React from 'react';
import { Rect, Transformer } from 'react-konva';
import GridClass from './GridClass';

const Grid = ({ gridLength = 10, isSelected }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.setNode(shapeRef.current);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <GridClass gridLength={gridLength} />
    </React.Fragment>
  );
};
export default Grid;
