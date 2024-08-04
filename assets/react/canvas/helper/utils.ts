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
    fabric: any,
    cornerSize: number,
    img: HTMLImageElement,
    handler: (eventData: fabric.IEvent, transform: { target: fabric.Object }) => boolean,
    x: number,
    y: number,
    offsetY: number
) => {
    return new fabric.Control({
        x: x,
        y: y,
        offsetY: offsetY,
        cursorStyle: 'pointer',
        mouseUpHandler: handler,
        render(ctx: CanvasRenderingContext2D, left: number, top: number, styleOverride: Partial<fabric.Control>, fabricObject: fabric.Object) {
            renderIcon(ctx, left, top, styleOverride, fabricObject, cornerSize, img);
        },
        cornerSize: cornerSize,
    });
};

export function deleteObject(eventData: fabric.IEvent, transform: { target: fabric.Object }): boolean {
    const target = transform.target;
    const canvas = target.canvas;
    if (canvas) {
        canvas.remove(target);
        canvas.requestRenderAll();
    }
    return false;
}

export function copyPaste(eventData: fabric.IEvent, transform: { target: fabric.Object }): boolean {
    const target = transform.target;
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
