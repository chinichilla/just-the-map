import React, { Fragment } from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

const MapBackground = ({ imageUrl, width, height }) => {
  const [image] = useImage(imageUrl);

  return (
    <Fragment>
      <Image image={image} width={width} height={height} />
    </Fragment>
  );
};

export default MapBackground;
