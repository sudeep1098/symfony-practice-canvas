import { deleteIcon, copyIcon } from "./icons";
import { createControl, deleteObject, copyPaste } from "./utils";

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

    const deleteImg = new Image();
    deleteImg.src = deleteIcon;

    const copyImg = new Image();
    copyImg.src = copyIcon;

    const deleteControl = createControl(fabric, 24, deleteImg, deleteObject, 0.5, -0.5, 16);
    const copyPasteControl = createControl(fabric, 24, copyImg, copyPaste, 0, -0.7, 10);

    fabric.Object.prototype.controls.deleteControl = deleteControl;
    fabric.Object.prototype.controls.copyPasteControl = copyPasteControl;
};
