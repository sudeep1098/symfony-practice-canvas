import { createContext } from 'react';
import { fabric } from './fabric';

const CanvasContext = createContext<fabric.Canvas | null>(null);

export default CanvasContext;
