import { fabric } from '@react/canvas/helper/fabric';
import { useState, useCallback, useEffect } from 'react';

export function useCopyPasteHandler(canvas: fabric.Canvas | null) {
    const [copiedObject, setCopiedObject] = useState<fabric.Object | null>(null);

    const copyObject = useCallback(() => {
        if (canvas) {
            const activeObject = canvas.getActiveObject();
            if (activeObject) {
                activeObject.clone((cloned: fabric.Object) => {
                    setCopiedObject(cloned);
                });
            }
        }
    }, [canvas]);

    const pasteObject = useCallback(() => {
        if (canvas && copiedObject) {
            copiedObject.clone((cloned: fabric.Object) => {
                const activeObject = canvas.getActiveObject();
                cloned.set({
                    left: (activeObject?.left || 0) + 10,
                    top: (activeObject?.top || 0) + 10,
                    evented: true,
                });
                canvas.add(cloned);
                canvas.setActiveObject(cloned);
                canvas.requestRenderAll();
            });
        }
    }, [canvas, copiedObject]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === 'c') {
                event.preventDefault();
                copyObject();
            }
            if (event.ctrlKey && event.key === 'v') {
                event.preventDefault();
                pasteObject();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [copyObject, pasteObject]);

    return {};
}
