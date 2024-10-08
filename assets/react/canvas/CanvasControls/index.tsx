import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Button, Col, Row } from 'antd';
import { fabric } from '@react/canvas/helper/fabric';
import CanvasContext from '@react/canvas/helper/context';
import DrawingMode from './DrawingMode';
import Shapes from './Shapes';
import ImageAdder from './ImageAdder';
import TextAdder from './TextAdder';
import ControlSliders from './ControlSliders';
import { useCopyPasteHandler } from './CopyPasteHandler';

const CanvasControls: React.FC = () => {
    const canvas = useContext(CanvasContext);
    const [isDrawingMode, setIsDrawingMode] = useState<boolean>(false);
    const [activeObject, setActiveObject] = useState<fabric.Object | null>(null);
    const defaultControls = {
        angle: 0,
        scale: 1,
        top: 0,
        left: 0,
        skewX: 0,
        skewY: 0,
    };
    const [controls, setControls] = useState(defaultControls);

    useCopyPasteHandler(canvas);

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
            } else {
                setControls(defaultControls);
            }
        }
    }, [canvas]);

    const handleControlChange = (property: keyof fabric.Object, value: number) => {
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

    const canvasClear = () => {
        if (canvas) {
            canvas.clear();
            setControls(defaultControls);
        }
    };

    const drawingMode = () => {
        if (canvas) {
            canvas.isDrawingMode = !isDrawingMode;
        }
        setIsDrawingMode(!isDrawingMode);
    }

    const resetControls = () => {
        setActiveObject(null);
        setControls(defaultControls);
    }

    useEffect(() => {
        if (canvas instanceof fabric.Canvas) {
            canvas.on('selection:created', updateControls);
            canvas.on('selection:updated', updateControls);
            canvas.on('object:moving', updateControls);
            canvas.on('object:scaling', updateControls);
            canvas.on('object:rotating', updateControls);
            canvas.on('object:skewing', updateControls);
            canvas.on('selection:cleared', resetControls);
        }

        return () => {
            if (canvas) {
                canvas.off('selection:created', updateControls);
                canvas.off('selection:updated', updateControls);
                canvas.off('object:moving', updateControls);
                canvas.off('object:scaling', updateControls);
                canvas.off('object:rotating', updateControls);
                canvas.off('object:skewing', updateControls);
                canvas.off('selection:cleared', resetControls);
            }
        };
    }, [canvas, updateControls]);

    return (
        <>
            <Row justify={'center'} gutter={[8,8]}>
                <ControlSliders controls={controls} onControlChange={handleControlChange} disabled={!activeObject} />
                <Col>
                    <Button onClick={canvasClear}>Clear</Button>
                </Col>
                <Col>
                    <Shapes />
                </Col>
                <ImageAdder />
                <Col className='mt-3' span={12}>
                    <TextAdder />
                </Col>
                <Col className='mt-3' span={6}>
                    <Button type="primary" onClick={drawingMode}>
                        {!isDrawingMode ? "Enter Drawing Mode" : "Cancel Drawing Mode"}
                    </Button>
                </Col>
                {isDrawingMode && (
                    <DrawingMode />
                )}
            </Row>
        </>
    );
};

export default CanvasControls;
