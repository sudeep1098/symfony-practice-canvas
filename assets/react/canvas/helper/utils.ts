import { fabric } from "@react/canvas/helper/fabric";

export function renderIcon(
    ctx: CanvasRenderingContext2D,
    left: number,
    top: number,
    styleOverride: Partial<fabric.Control>,
    fabricObject: fabric.Object,
    cornerSize: number,
    img: HTMLImageElement
): void {
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle || 0));
    ctx.drawImage(img, -cornerSize / 2, -cornerSize / 2, cornerSize, cornerSize);
    ctx.restore();
}

export const createControl = (
    cornerSize: number,
    img: HTMLImageElement,
    handler: (eventData: MouseEvent, transformData: fabric.Transform, x: number, y: number) => boolean,
    x: number,
    y: number,
    offsetY: number
): fabric.Control => {
    return new fabric.Control({
        x: x,
        y: y,
        offsetY: offsetY,
        cursorStyle: 'pointer',
        mouseUpHandler: handler,
        render(ctx: CanvasRenderingContext2D, left: number, top: number, styleOverride: Partial<fabric.Control>, fabricObject: fabric.Object) {
            renderIcon(ctx, left, top, styleOverride, fabricObject, cornerSize, img);
        },
    });
};

export function deleteObject(eventData: MouseEvent, transformData: fabric.Transform, x: number, y: number): boolean {
    const target = transformData.target;
    const canvas = target.canvas;
    if (canvas) {
        canvas.remove(target);
        canvas.requestRenderAll();
    }
    return false;
}

export function copyPaste(eventData: MouseEvent, transformData: fabric.Transform, x: number, y: number): boolean {
    const target = transformData.target;
    const canvas = target.canvas;
    if (canvas) {
        target.clone((cloned: fabric.Object) => {
            cloned.set({
                left: (target.left || 0) + 10,
                top: (target.top || 0) + 10,
                evented: true,
            });
            canvas.add(cloned);
            canvas.setActiveObject(cloned);
            canvas.requestRenderAll();
        });
    }
    return false;
}

export const handleBrushChange = (canvas: fabric.Canvas, value: string) => {
    if (canvas) {
        let brush: any;

        if (value === 'circle') {
            brush = new fabric.PatternBrush(canvas);

            brush.getPatternSrc = function () {
                const patternCanvas = document.createElement('canvas');
                patternCanvas.width = patternCanvas.height = 20;
                const ctx = patternCanvas.getContext('2d');

                if (ctx) {
                    ctx.clearRect(0, 0, patternCanvas.width, patternCanvas.height);
                    ctx.fillStyle = brush.color;
                    ctx.beginPath();
                    ctx.arc(10, 10, 8, 0, Math.PI * 2, false);
                    ctx.closePath();
                    ctx.fill();
                }
                return patternCanvas;
            };
            brush.source = brush.getPatternSrc();
        } else if (value === 'hline') {
            brush = new fabric.PatternBrush(canvas);

            brush.getPatternSrc = function () {
                const patternCanvas = document.createElement('canvas');
                patternCanvas.width = patternCanvas.height = 20;
                const ctx = patternCanvas.getContext('2d');

                if (ctx) {
                    ctx.clearRect(0, 0, patternCanvas.width, patternCanvas.height);
                    ctx.strokeStyle = brush.color;
                    ctx.lineWidth = 5;
                    ctx.beginPath();
                    ctx.moveTo(0, 10);
                    ctx.lineTo(20, 10);
                    ctx.stroke();
                }
                return patternCanvas;
            };
            brush.source = brush.getPatternSrc();
        } else if (value === 'vline') {
            brush = new fabric.PatternBrush(canvas);

            brush.getPatternSrc = function () {
                const patternCanvas = document.createElement('canvas');
                patternCanvas.width = patternCanvas.height = 20;
                const ctx = patternCanvas.getContext('2d');

                if (ctx) {
                    ctx.clearRect(0, 0, patternCanvas.width, patternCanvas.height);
                    ctx.strokeStyle = brush.color;
                    ctx.lineWidth = 5;
                    ctx.beginPath();
                    ctx.moveTo(10, 0);
                    ctx.lineTo(10, 20);
                    ctx.stroke();
                }
                return patternCanvas;
            };
            brush.source = brush.getPatternSrc();
        } else if (value === 'square') {
            brush = new fabric.PatternBrush(canvas);

            brush.getPatternSrc = function () {

                const patternCanvas = document.createElement('canvas');
                patternCanvas.width = patternCanvas.height = 20;
                const ctx = patternCanvas.getContext('2d');

                if (ctx) {
                    ctx.clearRect(0, 0, patternCanvas.width, patternCanvas.height);
                    ctx.fillStyle = brush.color;
                    ctx.fillRect(5, 5, 10, 10);
                }
                return patternCanvas;
            };
            brush.source = brush.getPatternSrc();
        } else if (value === 'diamond') {
            brush = new fabric.PatternBrush(canvas);

            brush.getPatternSrc = function () {
                const patternCanvas = document.createElement('canvas');
                patternCanvas.width = patternCanvas.height = 20;
                const ctx = patternCanvas.getContext('2d');

                if (ctx) {
                    ctx.clearRect(0, 0, patternCanvas.width, patternCanvas.height);
                    ctx.fillStyle = brush.color;
                    ctx.beginPath();
                    ctx.moveTo(10, 0);
                    ctx.lineTo(20, 10);
                    ctx.lineTo(10, 20);
                    ctx.lineTo(0, 10);
                    ctx.closePath();
                    ctx.fill();
                }
                return patternCanvas;
            };
            brush.source = brush.getPatternSrc();
        } else {
            brush = new fabric.PencilBrush(canvas);
        }

        canvas.freeDrawingBrush = brush;
        canvas.requestRenderAll();
    }
};

export const addRectangle = (canvas: fabric.Canvas) => {
    const shiftAmount = 10;

    const numRectangles = canvas.getObjects('rect').length;

    const left = 100 + numRectangles * shiftAmount;
    const top = 50 + numRectangles * shiftAmount;

    const rect = new fabric.Rect({
        left: left,
        top: top,
        fill: 'red',
        width: 200,
        height: 100,
    });

    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.requestRenderAll();
};

export const addCircle = (canvas: fabric.Canvas) => {
    const shiftAmount = 10;

    const numCircles = canvas.getObjects('circle').length;

    const left = 100 + numCircles * shiftAmount;
    const top = 50 + numCircles * shiftAmount;

    const circle = new fabric.Circle({
        left: left,
        top: top,
        radius: 50,
        fill: 'blue',
    });

    canvas.add(circle);
    canvas.setActiveObject(circle);
    canvas.requestRenderAll();
};

export const addTriangle = (canvas: fabric.Canvas) => {
    const shiftAmount = 10;

    const numTriangles = canvas.getObjects('triangle').length;

    const left = 100 + numTriangles * shiftAmount;
    const top = 50 + numTriangles * shiftAmount;

    const triangle = new fabric.Triangle({
        left: left,
        top: top,
        width: 100,
        height: 100,
        fill: 'green',
    });

    canvas.add(triangle);
    canvas.setActiveObject(triangle);
    canvas.requestRenderAll();
};

export const addEllipse = (canvas: fabric.Canvas) => {
    const shiftAmount = 10;

    const numEllipses = canvas.getObjects('ellipse').length;

    const left = 100 + numEllipses * shiftAmount;
    const top = 50 + numEllipses * shiftAmount;

    const ellipse = new fabric.Ellipse({
        left: left,
        top: top,
        rx: 100,
        ry: 50,
        fill: 'purple',
    });

    canvas.add(ellipse);
    canvas.setActiveObject(ellipse);
    canvas.requestRenderAll();
};

export const addImageToCanvas = (
    canvas: fabric.Canvas,
    url: string,
    options: {
        scaleX?: number;
        scaleY?: number;
        flipX?: boolean;
        flipY?: boolean;
        left?: number;
        top?: number;
        angle?: number;
        opacity?: number;
        [key: string]: any;
    } = {}
) => {
    const shiftAmount = 10;
    const numImages = canvas.getObjects('image').length;
    const left = 100 + numImages * shiftAmount;
    const top = 50 + numImages * shiftAmount;

    fabric.Image.fromURL(url, (img) => {
        img.set({
            scaleX: options.scaleX || 1,
            scaleY: options.scaleY || 1,
            flipX: options.flipX || false,
            flipY: options.flipY || false,
            left: options.left || left,
            top: options.top || top,
            angle: options.angle || 0,
            opacity: options.opacity || 1,
            ...options
        });

        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.requestRenderAll();
    });
};