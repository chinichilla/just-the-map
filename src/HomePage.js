import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
// import "./HomePage.css";
import { Stage, Layer } from 'react-konva';
import Rectangle from './Grid';
import { addLine } from './Line';
import { addTextNode } from './textNode';
import Image from './Image';
const uuidv1 = require('uuid/v1');

export default function HomePage() {
  const [rectangles, setRectangles] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const [shapes, setShapes] = useState([]);
  const [, updateState] = React.useState();
  const stageEl = React.createRef();
  const layerEl = React.createRef();
  const fileUploadEl = React.createRef();
  const getRandomInt = max => {
    // return Math.floor(Math.random() * Math.floor(max));
    return max;
  };

  const addGrid = () => {
    const rect = {
      width: window.innerWidth,
      height: window.innerHeight,
      fill: 'red',
      id: `rect${rectangles.length + 1}`,
    };
    const rects = rectangles.concat([rect]);
    setRectangles(rects);
    const shs = shapes.concat([`rect${rectangles.length + 1}`]);
    setShapes(shs);
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
  const undo = () => {
    const lastId = shapes[shapes.length - 1];
    let index = rectangles.findIndex(r => r.id == lastId);
    if (index != -1) {
      rectangles.splice(index, 1);
      setRectangles(rectangles);
    }
    index = images.findIndex(r => r.id == lastId);
    if (index != -1) {
      images.splice(index, 1);
      setImages(images);
    }
    shapes.pop();
    setShapes(shapes);
    forceUpdate();
  };
  document.addEventListener('keydown', ev => {
    if (ev.code == 'Delete') {
      let index = rectangles.findIndex(r => r.id == selectedId);
      if (index != -1) {
        rectangles.splice(index, 1);
        setRectangles(rectangles);
      }
      index = images.findIndex(r => r.id == selectedId);
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
        <Button variant="secondary" onClick={addGrid}>
          Add Grid
        </Button>
        <Button variant="secondary" onClick={drawLine}>
          Line
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
        <Button variant="secondary" onClick={undo}>
          Undo
        </Button>
      </ButtonGroup>
      <input
        style={{ display: 'none' }}
        type="file"
        ref={fileUploadEl}
        onChange={fileChange}
      />
      <Stage
        width={window.innerWidth * 0.9}
        height={window.innerHeight - 150}
        ref={stageEl}
        onMouseDown={e => {
          // deselect when clicked on empty area
          const clickedOnEmpty = e.target === e.target.getStage();
          if (clickedOnEmpty) {
            selectShape(null);
          }
        }}
      >
        <Layer ref={layerEl}>
          {rectangles.map((rect, i) => {
            return (
              <Rectangle
                key={i}
                shapeProps={rect}
                isSelected={rect.id === selectedId}
                onSelect={() => {
                  selectShape(rect.id);
                }}
                onChange={newAttrs => {
                  const rects = rectangles.slice();
                  rects[i] = newAttrs;
                  setRectangles(rects);
                }}
              />
            );
          })}
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
      </Stage>
    </div>
  );
}
