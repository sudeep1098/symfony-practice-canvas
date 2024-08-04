import { createContext } from 'react';
import { fabric } from './fabric';

const canvasElement = document.createElement('canvas');
const defaultCanvas = new fabric.Canvas(canvasElement);

const CanvasContext = createContext<fabric.Canvas>(defaultCanvas);

export default CanvasContext;
