import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
// import "./SingleMapPage.css";
import { Stage, Layer } from 'react-konva';
import { addLine } from './Line';
import { addTextNode } from './textNode';
import Image from './Image';
import MapBackground from './MapBackground';
import Grid from './Grid';
import MaskLayer from './MaskLayer';

const uuidv1 = require('uuid/v1');

export default function SingleMapPage() {
  const [maskVisible, toggleMask] = useState(false);

  const [images, setImages] = useState([]);
  const [imageWidth] = useState(window.innerWidth * 0.99);
  const [imageHeight] = useState(window.innerHeight * 0.97);

  const [mapBackground] = useState(
    'https://i.pinimg.com/originals/82/be/43/82be43d9868aa144ec6de0b7d5268aef.jpg'
  );

  const [selectedId, selectShape] = useState(null);
  const [gridVisible, toggleGrid] = useState(false);

  const [shapes, setShapes] = useState([]);
  const [, updateState] = React.useState();

  const stageEl = React.createRef();
  const layerEl = React.createRef();
  const layerMap = React.createRef();
  const fileUploadEl = React.createRef();

  const drawLine = () => {
    addLine(stageEl.current.getStage(), layerEl.current);
  };

  const eraseLine = () => {
    addLine(stageEl.current.getStage(), layerEl.current, 'erase');
  };

  const drawText = () => {
    const id = addTextNode(stageEl.current.getStage(), layerEl.current);
    const shs = shapes.concat([id]);
    setShapes(shs);
  };

  const drawImage = () => {
    fileUploadEl.current.click();
  };

  const forceUpdate = React.useCallback(() => updateState({}), []);
  const fileChange = ev => {
    let file = ev.target.files[0];
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        const id = uuidv1();
        images.push({
          content: reader.result,
          id,
        });
        setImages(images);
        fileUploadEl.current.value = null;
        shapes.push(id);
        setShapes(shapes);
        forceUpdate();
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  document.addEventListener('keydown', ev => {
    if (ev.code == 'Delete') {
      let index = images.findIndex(r => r.id == selectedId);
      if (index != -1) {
        images.splice(index, 1);
        setImages(images);
      }
      forceUpdate();
    }
  });

  return (
    <div className="home-page">
      <ButtonGroup>
        <Button variant="secondary" onClick={() => toggleGrid(!gridVisible)}>
          Grid
        </Button>
        <Button variant="secondary" onClick={() => toggleMask(!maskVisible)}>
          Mask
        </Button>
        <Button variant="secondary" onClick={drawLine}>
          Draw
        </Button>
        <Button variant="secondary" onClick={eraseLine}>
          Erase
        </Button>
        <Button variant="secondary" onClick={drawText}>
          Player Text{' '}
        </Button>
        <Button variant="secondary" onClick={drawImage}>
          Player Icon
        </Button>
      </ButtonGroup>
      <input
        style={{ display: 'none' }}
        type="file"
        ref={fileUploadEl}
        onChange={fileChange}
      />
      <Stage
        width={imageWidth}
        height={imageHeight}
        ref={stageEl}
        onMouseDown={e => {
          // deselect when clicked on empty area
          const clickedOnEmpty = e.target === e.target.getStage();
          if (clickedOnEmpty) {
            selectShape(null);
          }
        }}
      >
        <Layer ref={layerMap}>
          <MapBackground
            imageUrl={mapBackground}
            width={imageWidth}
            height={imageHeight}
          />
        </Layer>
        <Layer ref={layerEl}>
          {maskVisible && <MaskLayer width={imageWidth} height={imageHeight} />}
          {images.map((image, i) => {
            return (
              <Image
                key={i}
                imageUrl={image.content}
                isSelected={image.id === selectedId}
                onSelect={() => {
                  selectShape(image.id);
                }}
                onChange={newAttrs => {
                  const imgs = images.slice();
                  imgs[i] = newAttrs;
                }}
              />
            );
          })}
        </Layer>
        <Layer>{gridVisible && <Grid />}</Layer>
      </Stage>
    </div>
  );
}
