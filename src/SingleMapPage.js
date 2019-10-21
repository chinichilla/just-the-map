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
import Rectangle from './MaskLayer';

const uuidv1 = require('uuid/v1');

export default function SingleMapPage() {
  const [maskVisible, toggleMask] = useState(false);
  const [rectangles, setRectangles] = useState([]);

  const [images, setImages] = useState([]);
  const [imageWidth] = useState(window.innerWidth * 0.99);
  const [imageHeight] = useState(window.innerHeight * 0.97);

  const [selectedId, selectShape] = useState(null);
  const [gridVisible, toggleGrid] = useState(false);

  const [shapes, setShapes] = useState([]);
  const [, updateState] = React.useState();

  const stageEl = React.createRef();
  const layerEl = React.createRef();
  const layerMap = React.createRef();
  const fileUploadEl = React.createRef();

  const getRandomInt = max => {
    // return Math.floor(Math.random() * Math.floor(max));
    return max;
  };

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
  // const undo = () => {
  //   const lastId = shapes[shapes.length - 1];
  //   let index = rectangles.findIndex(r => r.id == lastId);
  //   if (index != -1) {
  //     rectangles.splice(index, 1);
  //     setRectangles(rectangles);
  //   }
  //   index = images.findIndex(r => r.id == lastId);
  //   if (index != -1) {
  //     images.splice(index, 1);
  //     setImages(images);
  //   }
  //   shapes.pop();
  //   setShapes(shapes);
  //   forceUpdate();
  // };

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
          Add New Player
        </Button>
        <Button variant="secondary" onClick={drawImage}>
          Image
        </Button>
        {/* <Button variant="secondary" onClick={undo}>
          Undo
        </Button> */}
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
            imageUrl={'https://i.redd.it/ib2csyjz4r4z.jpg'}
            width={imageWidth}
            height={imageHeight}
          />
        </Layer>
        <Layer ref={layerEl}>
          {maskVisible && <Rectangle width={imageWidth} height={imageHeight} />}
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
