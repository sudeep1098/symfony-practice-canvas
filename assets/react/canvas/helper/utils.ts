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

