import { deleteIcon } from "./icons";

export const buildControls = (fabric: any) => {
    fabric.Object.prototype.set({
        transparentCorners: false,
        cornerColor: 'blue',
        cornerStrokeColor: 'red',
        borderColor: 'red',
        cornerSize: 12,
        cornerStyle: 'circle',
        borderDashArray: [3, 3],
        strokeDashArray: [5, 5],
    });

    const img = new Image();
    img.src = deleteIcon;

    function deleteObject(eventData: fabric.IEvent, transform: { target: fabric.Object }): boolean {
        const target = transform.target;
        const canvas = target.canvas;
        if (canvas) {
            canvas.remove(target);
            canvas.requestRenderAll();
        }
        return false;
    }

    function renderIcon(
        ctx: CanvasRenderingContext2D,
        left: number,
        top: number,
        styleOverride: Partial<fabric.Control>,
        fabricObject: fabric.Object,
        cornerSize: number
    ): void {
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle || 0));
        ctx.drawImage(img, -cornerSize / 2, -cornerSize / 2, cornerSize, cornerSize);
        ctx.restore();
    }

    const createDeleteControl = (cornerSize: number) => {
        return new fabric.Control({
            x: 0.5,
            y: -0.5,
            offsetY: 16,
            cursorStyle: 'pointer',
            mouseUpHandler: deleteObject,
            render(ctx: CanvasRenderingContext2D, left: number, top: number, styleOverride: Partial<fabric.Control>, fabricObject: fabric.Object) {
                renderIcon(ctx, left, top, styleOverride, fabricObject, cornerSize);
            },
            cornerSize: cornerSize,
        });
    };

    // Define the deleteControl
    fabric.Object.prototype.controls.deleteControl = createDeleteControl(24);
};
