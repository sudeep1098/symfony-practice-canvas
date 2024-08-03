import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Slider } from 'antd';
import { fabric } from 'fabric';
import CanvasContext from '@react/canvas/helper/context';
import { IEvent } from 'fabric/fabric-impl';

const CanvasControls: React.FC = () => {
    const canvas = useContext(CanvasContext);
    const [activeObject, setActiveObject] = useState<fabric.Object | null>(null);
    const [controls, setControls] = useState({
        angle: 0,
        scale: 1,
        top: 0,
        left: 0,
        skewX: 0,
        skewY: 0,
    });

    const updateControls = useCallback(() => {
        if (canvas instanceof fabric.Canvas) {
            const activeObj = canvas.getActiveObject();

            if (activeObj) {
                setActiveObject(activeObj);
                setControls({
                    angle: activeObj.angle || 0,
                    scale: activeObj.scaleX || 1,
                    top: activeObj.top || 0,
                    left: activeObj.left || 0,
                    skewX: activeObj.skewX || 0,
                    skewY: activeObj.skewY || 0,
                });
            }
        }
    }, [canvas]);

    const handleControlChange = (property: any, value: number) => {
        if (activeObject && canvas) {
            if (property === 'scale') {
                activeObject.set({
                    scaleX: value,
                    scaleY: value,
                }).setCoords();
            } else {
                activeObject.set(property, value).setCoords();
            }
            setControls(prevState => ({ ...prevState, [property]: value }));
            canvas.renderAll();
        }
    };

    useEffect(() => {
        if (canvas instanceof fabric.Canvas) {
            canvas.on('selection:created', updateControls);
            canvas.on('selection:updated', updateControls);
            canvas.on('object:moving', updateControls);
            canvas.on('object:scaling', updateControls);
            canvas.on('object:rotating', updateControls);
            canvas.on('object:skewing', updateControls);
        }

        return () => {
            if (canvas) {
                canvas.off('selection:created', updateControls);
                canvas.off('selection:updated', updateControls);
                canvas.off('object:moving', updateControls);
                canvas.off('object:scaling', updateControls);
                canvas.off('object:rotating', updateControls);
                canvas.off('object:skewing', updateControls);
            }
        };
    }, [canvas, updateControls]);

    return (
        <>
            <div>
                <label>Angle:</label>
                <Slider
                    value={controls.angle}
                    min={0}
                    max={360}
                    onChange={(value) => handleControlChange('angle', value)}
                    disabled={!activeObject}
                />
            </div>
            <div>
                <label>Scale:</label>
                <Slider
                    value={controls.scale}
                    min={0.1}
                    max={3}
                    step={0.1}
                    onChange={(value) => handleControlChange('scale', value)}
                    disabled={!activeObject}
                />
            </div>
            <div>
                <label>Top:</label>
                <Slider
                    value={controls.top}
                    min={0}
                    max={600}
                    onChange={(value) => handleControlChange('top', value)}
                    disabled={!activeObject}
                />
            </div>
            <div>
                <label>Left:</label>
                <Slider
                    value={controls.left}
                    min={0}
                    max={800}
                    onChange={(value) => handleControlChange('left', value)}
                    disabled={!activeObject}
                />
            </div>
            <div>
                <label>SkewX:</label>
                <Slider
                    value={controls.skewX}
                    min={0}
                    max={100}
                    onChange={(value) => handleControlChange('skewX', value)}
                    disabled={!activeObject}
                />
            </div>
            <div>
                <label>SkewY:</label>
                <Slider
                    value={controls.skewY}
                    min={0}
                    max={100}
                    onChange={(value) => handleControlChange('skewY', value)}
                    disabled={!activeObject}
                />
            </div>
        </>
    );
};

export default CanvasControls;
